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
import {dfx,config, names} from "./json-data";
import { readFileSync, existsSync, writeFileSync } from "fs";

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
    "treasury": {
        "local": "",
        "ic":""
    },
    "dao": {
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
        const clone_canisters = await execa("git", ["clone", "https://github.com/CigDao/canisters"]);
        if (clone_canisters.exitCode !== 0) {
            this.program.error("unable to pull down canisters https://github.com/CigDao/canisters", { code: "1" })
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
            const deploy = await execa("dfx", ["deploy", "--with-cycles", "100000000000000", `${names.database}`, "--argument", args]);
            if (deploy.exitCode === 0) {
                let call_args = text.concat(`"ledger"`,")");
                const call = await execa("dfx", ["canister", "call", `${names.database}`,"createCollectionServiceCanisterByGroup", call_args]);
                if (call.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed database canister: ${canister_ids.database.local}`});
                }
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
        let fee = this.config?.token_fee;
        let database = canister_ids.database.local;
        let topupCanister = canister_ids.topup.local;

        let text = "("
        let args = text.concat(`"${icon}",`, `"${token_name}",`, `"${symbol}",`, `${decimal},`, `${token_supply},`, `${fee},`, `"${database}",`,`"${topupCanister}"`,")");
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
        let YC_Canister = "5gxp5-jyaaa-aaaag-qarma-cai";
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying swap canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.local}",`, `"${YC_Canister}",`, `"${canister_ids.database.local}"`, ")");
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

    async deploy_treasury_local() {
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying treasury canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.dao.local}",`, `"${canister_ids.token.local}",`, `"${canister_ids.swap.local}",`,`"${canister_ids.topup.local}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.treasury}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed treasury canister: ${canister_ids.treasury.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy treasury canister", { code: "1" })
        }

    }

    async deploy_dao_local() {
        let rawdata = readFileSync("./.dfx/local/canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying dao canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.local}",`, `"${canister_ids.treasury.local}",`, `"${canister_ids.topup.local}",`,`${this.config?.proposal_cost},`, `${this.config?.stake_time}`,")");
        try {
            const deploy = await execa("dfx", ["deploy", `${names.dao}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed dao canister: ${canister_ids.dao.local}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy dao canister", { code: "1" })
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
            const deploy = await execa("dfx", ["deploy", "--network", "ic", "--with-cycles", "20000000000000", `${names.database}`, "--argument", args]);
            if (deploy.exitCode === 0) {
                let call_args = text.concat(`"ledger"`,")");
                const call = await execa("dfx", ["canister", "--network", "ic", "call", `${names.database}`,"createCollectionServiceCanisterByGroup", call_args]);
                if (call.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed database canister: ${canister_ids.database.ic}`});
                }
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
        let fee = this.config?.token_fee;
        let database = canister_ids.database.ic;
        let topupCanister = canister_ids.topup.ic;
        let YC_Canister = "5gxp5-jyaaa-aaaag-qarma-cai";
        let text = "("
        let args = text.concat(`"${icon}",`, `"${token_name}",`, `"${symbol}",`, `${decimal},`, `${token_supply},`, `${fee},`, `"${database}",`,`"${topupCanister}"`,")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.token}` ,"--argument", args]);
            if (deploy.exitCode === 0) {
                spinner.update({ text: `Distributioning Tokens`});
                let call_args = text.concat(`"${YC_Canister}"`,")");
                const call = await execa("dfx", ["canister", "--network", "ic", "call", `${names.token}`,"distribute", call_args]);
                if (call.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed token canister: ${canister_ids.token.ic}`});
                }
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy token canister", { code: "1" })
        }

    }

    async deploy_swap() {
        let YC_Canister = "5gxp5-jyaaa-aaaag-qarma-cai";
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying swap canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.ic}",`, `"${YC_Canister}",`, `"${canister_ids.database.ic}"`, ")");
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

    async deploy_treasury() {
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying treasury canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.dao.ic}",`, `"${canister_ids.token.ic}",`, `"${canister_ids.swap.ic}",`,`"${canister_ids.topup.ic}"`, ")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.treasury}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed treasury canister: ${canister_ids.treasury.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy treasury canister", { code: "1" })
        }

    }

    async deploy_dao() {
        let rawdata = readFileSync("./canister_ids.json", 'utf8');
        canister_ids = JSON.parse(rawdata);

        // Run external tool synchronously
        const spinner = createSpinner('deploying dao canister, this will take a few mins...').start();
        let text = "("
        let args = text.concat(`"${canister_ids.token.ic}",`, `"${canister_ids.treasury.ic}",`, `"${canister_ids.topup.ic}",`,`${this.config?.proposal_cost},`, `${this.config?.stake_time}`,")");
        try {
            const deploy = await execa("dfx", ["deploy", "--network", "ic", `${names.dao}`, "--argument", args]);
            
            if (deploy.exitCode === 0) {
                spinner.success({ text: `successfuly deployed dao canister: ${canister_ids.dao.ic}`});
            }

        } catch (e) {
            console.error(e);
            this.program.error("failed to deploy dao canister", { code: "1" })
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