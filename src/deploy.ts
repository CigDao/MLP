#!/usr/bin/env node
// @ts-nocheck
import chalk from 'chalk';
import * as gradient from 'gradient-string';

import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { Command } from 'commander';
import {execa} from 'execa';
import { createSpinner } from 'nanospinner';
import { Mlpconfig } from './init';
import standard from 'figlet/importable-fonts/Standard.js'
import {names} from "./json-data";
import { readFileSync } from "fs";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

var canister_ids = {
    "multisig": {
        "local": "",
        "ic":""
    },
    "database": {
        "local": "",
        "ic":""
    },
    "topup": {
        "local": "",
        "ic":""
    },
    "token": {
        "local": "",
        "ic":""
    },
    "swap": {
        "local": "",
        "ic":""
    },
}

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

    async create_canisters_local(name:string) {
        const spinner = createSpinner(`creating canisters ${name}...`).start();
        const create = await execa("dfx", ["canister", "create", name]);
        if (create.exitCode !== 0) {
            this.program.error(`unable to create canister ${name}`, { code: "1" })
        };
        spinner.success({ text: `successfuly created canister ${name}`});
    }

    async create_canisters(name:string) {
        const spinner = createSpinner('creating canisters...').start();
        const create = await execa("dfx", ["canister", "--network", "ic", "create", name]);
        if (create.exitCode !== 0) {
            this.program.error(`unable to create canister ${name}`, { code: "1" })
        };
        spinner.success({ text: `successfuly created canister ${name}`});
    }

    async clone_canisters() {
        const spinner = createSpinner('pulling down canisters...').start();
        const multisig = await execa("git", ["clone", "https://github.com/CigDao/canisters"]);
        if (multisig.exitCode !== 0) {
            this.program.error("unable to pull down canisters https://github.com/CigDao/canisters?", { code: "1" })
        };
        spinner.success({ text: `successfuly cloned canisters`});
    }

    async deploy_multisig_local() {
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying multisig canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`principal "${this.config?.member_principal}",`, `"${canister_ids.token.local}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.multisig}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed multisig canister: ${canister_ids.multisig.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy multi sig canister", { code: "1" })
        }

    }

    async deploy_database_local() {
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);
        // Run external tool synchronously
        const spinner = createSpinner('deploying database canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.local}",`, `"${canister_ids.swap.local}",`, `"${canister_ids.topup.local}"`,")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.database}`, "--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed database canister: ${canister_ids.database.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy database canister", { code: "1" })
        }

    }

    async deploy_topup_local() {
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);
        // Run external tool synchronously
        const spinner = createSpinner('deploying topup canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.database.local}",`, `vec {"${canister_ids.multisig.local}"; "${canister_ids.swap.local}"; "${canister_ids.token.local}"}`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.topup}` ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed topup canister: ${canister_ids.topup.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy topup canister", { code: "1" })
        }

    }
    async deploy_token_local() {
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);
        // Run external tool synchronously
        const spinner = createSpinner('deploying token canister, this will take a few mins...').start();
        let icon = readFileSync("icon.png","base64");
        let token_name = this.config?.token_name;
        let symbol = this.config?.token_symbol;
        let decimal = this.config?.token_decimals;
        let token_supply = this.config?.token_supply;
        let owner = canister_ids.multisig.local;
        let fee = this.config?.token_fee;
        let database = canister_ids.database.local;
        let topupCanister = canister_ids.topup.local;

        let text = "("
        let args = text.concat(`"${icon}",`, `"${token_name}",`, `"${symbol}",`, `${decimal},`, `${token_supply},`, `principal "${owner}",`, `${fee},`, `"${database}",`,`"${topupCanister}"`,")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.token}` ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed token canister: ${canister_ids.token.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy token canister", { code: "1" })
        }

    }

    async deploy_swap_local() {
        let WICP_Canister = "utozz-siaaa-aaaam-qaaxq-cai";
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying swap canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.local}",`, `"${WICP_Canister}",`, `"${canister_ids.database.local}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.swap}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed swap canister: ${canister_ids.swap.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy multi sig canister", { code: "1" })
        }

    }

    async deploy_multisig() {
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying multisig canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`principal "${this.config?.member_principal}",`, `"${canister_ids.token.ic}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.multisig}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed multisig canister: ${canister_ids.multisig.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy multi sig canister", { code: "1" })
        }

    }

    async deploy_database() {
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);
        // Run external tool synchronously
        const spinner = createSpinner('deploying database canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.ic}",`, `"${canister_ids.swap.ic}",`, `"${canister_ids.topup.ic}"`,")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.database}`, "--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed database canister: ${canister_ids.database.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy database canister", { code: "1" })
        }

    }

    async deploy_topup() {
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);
        // Run external tool synchronously
        const spinner = createSpinner('deploying topup canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.database.ic}",`, `vec {"${canister_ids.multisig.ic}"; "${canister_ids.swap.ic}"; "${canister_ids.token.ic}"}`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.topup}` ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed topup canister: ${canister_ids.topup.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy topup canister", { code: "1" })
        }

    }
    async deploy_token() {
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);
        // Run external tool synchronously
        const spinner = createSpinner('deploying token canister, this will take a few mins...').start();
        let icon = readFileSync("icon.png","base64");
        let token_name = this.config?.token_name;
        let symbol = this.config?.token_symbol;
        let decimal = this.config?.token_decimals;
        let token_supply = this.config?.token_supply;
        let owner = canister_ids.multisig.ic;
        let fee = this.config?.token_fee;
        let database = canister_ids.database.ic;
        let topupCanister = canister_ids.topup.ic;

        let text = "("
        let args = text.concat(`"${icon}",`, `"${token_name}",`, `"${symbol}",`, `${decimal},`, `${token_supply},`, `principal "${owner}",`, `${fee},`, `"${database}",`,`"${topupCanister}"`,")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.token}` ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed token canister: ${canister_ids.token.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy token canister", { code: "1" })
        }

    }

    async deploy_swap() {
        let WICP_Canister = "utozz-siaaa-aaaam-qaaxq-cai";
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying swap canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.ic}",`, `"${WICP_Canister}",`, `"${canister_ids.database.ic}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.swap}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed swap canister: ${canister_ids.swap.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy multi sig canister", { code: "1" })
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