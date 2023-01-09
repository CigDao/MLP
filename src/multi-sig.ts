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

let dao_name: string;
let member_principal: string;
let token_principal = "";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export default class MultiSig {
    constructor(private program: Command, private config?: Mlpconfig) { }

    async welcome() {
        const rainbowTitle = chalkAnimation.rainbow(
            'Welcome To My Little Protocol \n'
        );

        await sleep();
        rainbowTitle.stop();
    }

    async askDao() {
        if (this.config?.dao_name) {
            dao_name = this.config.dao_name;
            console.log(`Dao Name: ${dao_name}`);
        } else {
            const answers = await inquirer.prompt({
                name: 'dao_name',
                type: 'input',
                message: "What is your dao's name?",
                default() {
                    return 'dao name';
                },
            });

            dao_name = answers.dao_name;
        }

    }
    async askMember() {
        if (this.config?.member_principal) {
            member_principal = this.config?.member_principal;
            console.log(`Dao Member: ${member_principal}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'member_principal',
                type: 'input',
                message: "You need to add at least 1 member",
                default() {
                    return 'principal';
                },
            });

            member_principal = answers.member_principal;
        }
    }

    async askToken() {
        if (this.config?.token_principal) {
            token_principal = this.config?.token_principal;
            console.log(`Token Pricipal: ${token_principal}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_principal',
                type: 'input',
                message: "The principal for your governace token",
                default() {
                    return 'principal';
                },
            });

            token_principal = answers.token_principal;
        }
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
            spinner.success({ text: `successfuly installed dfx`, mark: ':)' });
        }
        spinner.success({ text: `dfx already installed` });
    }

    async deploy_multi_sig() {
        // Run external tool synchronously
        const spinner = createSpinner('deploying canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${member_principal}",`, `"${token_principal}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", "--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed canister`, mark: ':)' });
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy canister", { code: "1" })
        }

    }

    finish() {
        figlet.parseFont('Standard', standard);

        figlet(`Congrats , ${dao_name} !\n Let's Make Crypto Great Again`, {
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