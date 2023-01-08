#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import shell from 'shelljs';

let dao_name;
let member_principal;
let token_principal = "token principal";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome To My Little Protocol \n'
    );

    await sleep();
    rainbowTitle.stop();

    /*console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);*/
}

async function askDao() {
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

async function askMember() {
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

async function install_dfx() {
    const spinner = createSpinner('Installing dfx...').start();
    if (!shell.which('dfx')) {
        // Run external tool synchronously
        if (shell.exec('sh - ci "$(curl -fsSL https://internetcomputer.org/install.sh)"').code !== 0) {
            shell.echo('Error: failed to install dfx');
            shell.exit(1);
        };
        spinner.success({ text: `successfuly installed dfx`, mark: ':)' });
    }
    spinner.success({ text: `dfx already installed` });
}

async function deploy_multi_sig() {
    const spinner = createSpinner('deploying canister...').start();
    // Run external tool synchronously
    if (shell.exec(`dfx deploy --argument '("${member_principal}","${token_principal}")'`).code !== 0) {
        shell.echo('Error: failed to deploy canister');
        shell.exit(1);
    };
    spinner.success({ text: `successfuly deployed canister`, mark: ':)' });
}

function finish() {
    figlet(`Congrats , ${dao_name} !\n Let's Make Crypto Great Again`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.green(
                `Anyone can identify an opportunity and say "I could do that" or "that would be so easy", but ideas must go through a period of "execution" which kills the original idea and the real idea is born.`
            )
        );
        process.exit(0);
    });
}

console.clear();
await welcome();
await askDao();
await askMember()
await install_dfx()
await deploy_multi_sig()
await finish();