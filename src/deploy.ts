#!/usr/bin/env node
// @ts-nocheck
import chalk from 'chalk';
import * as gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { Command } from 'commander';
import { execa } from 'execa';
import { createSpinner } from 'nanospinner';
import { Mlpconfig } from './init';
import standard from 'figlet/importable-fonts/Standard.js'
import { names } from "./json-data";
import { readFileSync } from "fs";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export default class MultiSig {
    constructor(private program: Command, private config?: Mlpconfig) { }

    async title() {
        const rainbowTitle = chalkAnimation.rainbow(
            'Deploying... \n'
        );

        await sleep();
        rainbowTitle.stop();
    }

    async title_local() {
        const rainbowTitle = chalkAnimation.rainbow(
            'Deploying To LocalHost... \n'
        );

        await sleep();
        rainbowTitle.stop();
    }

    async install_dfx() {
        const spinner = createSpinner('Installing dfx...').start();
        const whichDfx = await execa("which", ["dfx"]);
        if (!whichDfx.stdout) {
            // Run external tool synchronously
            const installDfx = await execa("sh", ["-", "ci", `"$(curl -fsSL https://internetcomputer.org/install.sh)"`]);
            if (installDfx.exitCode !== 0) {
                this.program.error("unable to install dfx, maybe install it manually?", { code: "1" })
            };
            spinner.success({ text: `successfuly installed dfx` });
        }
        spinner.success({ text: `dfx already installed` });
    }

    async create_dao() {
        const composer_canister = "xpfnk-5yaaa-aaaan-qc3ga-cai";
        const registry_canister = "xuarp-haaaa-aaaan-qc3eq-cai";
        // Run external tool synchronously
        const spinner = createSpinner('registering dao').start();
        let icon = readFileSync("icon.png", "base64");
        let args = `(
            record  {
                        daoName = "${this.config?.dao_name}";
                        logo = "${icon}";
                        name = "${this.config?.token_name}";
                        symbol = "${this.config?.token_symbol}";
                        decimals = ${this.config?.token_decimals}:nat8;
                        totalSupply = ${this.config?.token_supply}:nat;
                        fee = ${this.config?.token_fee}:nat;
                        token2 = "${this.config?.token_2}";
                        proposalCost = ${this.config?.proposal_cost}:nat;
                        stakedTime = ${this.config?.stake_time}:nat;
                        clif = variant {"Day":${this.config?.clif}:nat};
                        vested = variant {"Day":${this.config?.vested}:nat};
                        interval = variant {"Day":${this.config?.interval}:nat};
                        totalAllocation = ${this.config?.total_allocation}:nat;
                        fundingGoal = ${this.config?.funding_goal}:nat;
                        swapFee = ${this.config?.swap_fee}:float64;
                        swapFundersfee = ${this.config?.swap_funders_fee}:float64;
                    },
            )`
        try {

            const set_name = await execa("dfx", ["canister", "--network", "ic", "call", registry_canister, "setName", `("${this.config?.dao_name}")`]);

            if (set_name.exitCode === 0) {
                spinner.update({ text: `successfuly registered dao` });
                await sleep();
                spinner.update({ text: `creating dao, this will take a few mins...` });
                const create = await execa("dfx", ["canister", "--network", "ic", "call", composer_canister, "create", args]);

                if (create.exitCode === 0) {
                    spinner.success({ text: `successfuly created Dao` });
                }
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to created Dao", { code: "1" })
        }

    }

    async create_dao_local() {
        const composer_canister = "rrkah-fqaaa-aaaaa-aaaaq-cai";
        const registry_canister = "rno2w-sqaaa-aaaaa-aaacq-cai";
        // Run external tool synchronously
        const spinner = createSpinner('registering dao').start();
        let icon = readFileSync("icon.png", "base64");
        let args = `(
            record  {
                        daoName = "Test Dao";
                        logo = "${icon}";
                        name = "Test Token";
                        symbol = "TT";
                        decimals = 8:nat8;
                        totalSupply = 100000000000000:nat;
                        fee = 0:nat;
                        token2 = "5gxp5-jyaaa-aaaag-qarma-cai";
                        proposalCost = 100000000:nat;
                        stakedTime = 300000000000:nat;
                        clif = 10:nat;
                        maxClaims = 100:nat;
                        vestingThreshold = 1:nat;
                        fundingGoal = 1:nat;
                        swapFee = 0.5:float64;
                        swapFundersfee = 0.5:float64;
                    },
            )`
        try {

            const set_name = await execa("dfx", ["canister", "call", registry_canister, "setName", `("Test Dao")`]);

            if (set_name.exitCode === 0) {
                spinner.update({ text: `successfuly registered dao` });
                await sleep();
                spinner.update({ text: `creating dao, this will take a few mins...` });
                const create = await execa("dfx", ["canister", "call", composer_canister, "create", args]);

                if (create.exitCode === 0) {
                    spinner.success({ text: `successfuly created Dao` });
                }
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to created Dao", { code: "1" })
        }

    }

    finish() {
        figlet.parseFont('Standard', standard);

        figlet(`Congrats , ${this.config?.dao_name} !\n Let's Make Crypto Great Again`, {
            font: 'Standard',
        }, (err, data) => {
            console.log(gradient.pastel.multiline(data) + '\n');

            console.log(
                chalk.green(
                    `Anyone can identify an opportunity and say "I could do that" or "that would be so easy", but ideas must go through a period of "execution" which kills the original idea and the real idea is born.`
                )
            );
        });
    }
}