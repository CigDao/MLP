#!/usr/bin/env node
import inquirer from 'inquirer';
// @ts-ignore
import chalkAnimation from 'chalk-animation';
import { Command } from 'commander';
import { Mlpconfig } from './init';

let dao_name: string;
let member_principal: string;
let token_principal:string;
let token_supply:number;
let token_decimals:number;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export default class InitCommands {
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

    async askToken() {
        if (this.config?.token_principal) {
            token_principal = this.config?.token_principal;
            console.log(`Token Principal: ${token_principal}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'token_principal',
                type: 'input',
                message: "The principal for your governace token",
                default() {
                    return 'Token Principal';
                },
            });

            return answers.token_principal;
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
}