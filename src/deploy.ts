#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import * as gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { Command } from 'commander';
import {execa} from 'execa';
import { createSpinner } from 'nanospinner';
import { Mlpconfig } from './init';
import standard from 'figlet/importable-fonts/Standard.js'

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
            spinner.success({ text: `successfuly installed dfx`});
        }
        spinner.success({ text: `dfx already installed` });
    }

    async install_azle() {
        const spinner = createSpinner('Installing azle...').start();
        const install_npm = await execa("npm", ["init", "-y"]);
        const install_azle = await execa("npm", ["install", "azle"]);
        if (install_npm.exitCode !== 0 && install_azle.exitCode !== 0) {
            this.program.error("unable to install azle, maybe install it manually?", { code: "1" })
        };
        spinner.success({ text: `successfuly installed azle`});
    }

    async install_multi_sig() {
        const spinner = createSpinner('Installing multisig canister...').start();
        const multi_sig = await execa("npm", ["install", "@cigdao/multi-sig"]);
        if (multi_sig.exitCode !== 0) {
            this.program.error("unable to install multi_sig, maybe install it manually?", { code: "1" })
        };
        spinner.success({ text: `successfuly installed multi_sig`});
    }

    async deploy() {
        // Run external tool synchronously
        const spinner = createSpinner('deploying canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${this.config?.member_principal}",`, `"${this.config?.token_principal}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", "--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed canister`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy canister", { code: "1" })
        }

    }

    async deploy_multi_sig_local() {
        // Run external tool synchronously
        const spinner = createSpinner('deploying multi sig canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${this.config?.member_principal}",`, `"${this.config?.token_principal}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "multi_sig", "--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed multi sig canister`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy multi sig canister", { code: "1" })
        }

    }

    async deploy_database_local() {
        // Run external tool synchronously
        const spinner = createSpinner('deploying database canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"",`, `"",`, `""`,")");
        try {
            const deploy = await execa("dfx", ["deploy", "database", "--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed database canister`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy database canister", { code: "1" })
        }

    }

    async deploy_topup_local() {
        // Run external tool synchronously
        const spinner = createSpinner('deploying topup canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"",`, `vec {}`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "topup" ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed topup canister`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy topup canister", { code: "1" })
        }

    }

    async deploy_token_local() {
        // Run external tool synchronously
        const spinner = createSpinner('deploying token canister, this will take a few mins...').start();
        let icon = "";
        let name = "";
        let symbol = "";
        let decimal:number = 0;
        let supply:number = 100;
        let owner = "j26ec-ix7zw-kiwcx-ixw6w-72irq-zsbyr-4t7fk-alils-u33an-kh6rk-7qe";
        let fee:number = 0;
        let database = "";
        let topupCanister = "";

        let text = "("
        let args = text.concat(`"${icon}",`, `"${name}",`, `"${symbol}",`, `${decimal},`, `${supply},`, `principal "${owner}",`, `${fee},`, `"${database}",`,`"${topupCanister}"`,")");
        try {
            const deploy = await execa("dfx", ["deploy", "token" ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed token canister`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy token canister", { code: "1" })
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