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
let token_name:string;
let token_symbol:string;
let token_supply:number;
let token_decimals:number;
let token_fee:number;

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
                    return 'Dao Name';
                },
            });

            return answers.dao_name;
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

            return answers.member_principal;
        }
    }

    async askTokenDecimals() {
        if (this.config?.token_decimals) {
            token_decimals = this.config?.token_decimals;
            console.log(`Token Decimals: ${token_decimals}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_decimals',
                type: 'input',
                message: "The number of decimals for your governace token",
                default() {
                    return 'Token Decimals';
                },
            });

            return answers.token_decimals;
        }
    }

    async askTokenSupply() {
        if (this.config?.token_supply) {
            token_supply = this.config?.token_supply;
            console.log(`Token Supply: ${token_supply}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_supply',
                type: 'input',
                message: "The total supply for your governace token",
                default() {
                    return 'Token Supply';
                },
            });

            return answers.token_supply;
        }
    }

    async askTokenFee() {
        if (this.config?.token_fee) {
            token_fee = this.config?.token_fee;
            console.log(`Token Fee: ${token_fee}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_fee',
                type: 'input',
                message: "The fee for your governace token",
                default() {
                    return 'Token Fee';
                },
            });

            return answers.token_fee;
        }
    }

    async askTokenName() {
        if (this.config?.token_name) {
            token_name = this.config?.token_name;
            console.log(`Token Name: ${token_name}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_name',
                type: 'input',
                message: "The name of your governace token",
                default() {
                    return 'Token Name';
                },
            });

            return answers.token_name;
        }
    }

    async askTokenSymbol() {
        if (this.config?.token_symbol) {
            token_symbol = this.config?.token_symbol;
            console.log(`Token Symbol: ${token_symbol}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_symbol',
                type: 'input',
                message: "The symbol of your governace token",
                default() {
                    return 'Token Symbol';
                },
            });

            return answers.token_symbol;
        }
    }
}