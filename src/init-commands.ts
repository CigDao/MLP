#!/usr/bin/env node
// @ts-nocheck
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { Command } from 'commander';
import { Mlpconfig } from './init';

let dao_name: string;
let member_principal: string;
let token_name:string;
let token_symbol:string;
let token_supply:number;
let token_decimals:number;
let token_fee:number;
let proposal_cost:number;
let stake_time:number;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export default class MultiSig {
    constructor(private config?: Mlpconfig) { }

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

    async askProposalCost() {
        if (this.config?.proposal_cost) {
            proposal_cost = this.config?.proposal_cost;
            console.log(`Proposal Cost: ${proposal_cost}`)
        } else {
            const answers = await inquirer.prompt({
                name: 'proposal_cost',
                type: 'number',
                message: "The cost to create a proposal",
                default() {
                    return 'Proposal Cost';
                },
            });

            return answers.proposal_cost;
        }
    }

    async askStakeTime() {
        if (this.config?.stake_time) {
            stake_time = this.config?.stake_time;
            console.log(`Unstaking Time: ${stake_time}`)
            return stake_time;
        } else {
            const answers = await inquirer.prompt({
                name: 'stake_time',
                type: 'list',
                message: "The time it takes to unstake tokens",
                choices: [
                    '1 minute',
                    '1 Day',
                    '3 Day',
                    '1 Week',
                    '1 Month',
                  ],
                default() {
                    return 'Stake Time';
                },
            });
            answers.stake_time === '3 Day';
            
            switch(answers.stake_time) { 
                case '1 Minute': { 
                    return 60000000000;
                } 
                case '1 Day': { 
                   return 86400000000000;
                } 
                case '3 Day': { 
                    return 86400000000000 * 3;
                }
                case '1 Week': { 
                    return 86400000000000 * 7;
                }
                case '1 Month': { 
                    return 86400000000000 * 30;
                } 
                default: { 
                    return 86400000000000 * 3;
                } 
             }
        }
    }
}