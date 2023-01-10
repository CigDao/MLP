#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const chalk_1 = __importDefault(require("chalk"));
const gradient = __importStar(require("gradient-string"));
const chalk_animation_1 = __importDefault(require("chalk-animation"));
const figlet_1 = __importDefault(require("figlet"));
const execa_1 = require("execa");
const nanospinner_1 = require("nanospinner");
const Standard_js_1 = __importDefault(require("figlet/importable-fonts/Standard.js"));
const json_data_1 = require("./json-data");
const fs_1 = require("fs");
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
var canister_ids = {
    "multisig": {
        "local": "",
        "ic": ""
    },
    "database": {
        "local": "",
        "ic": ""
    },
    "topup": {
        "local": "",
        "ic": ""
    },
    "token": {
        "local": "",
        "ic": ""
    },
    "swap": {
        "local": "",
        "ic": ""
    },
};
class MultiSig {
    constructor(program, config) {
        this.program = program;
        this.config = config;
    }
    title() {
        return __awaiter(this, void 0, void 0, function* () {
            const rainbowTitle = chalk_animation_1.default.rainbow('Deploying... \n');
            yield sleep();
            rainbowTitle.stop();
        });
    }
    title_local() {
        return __awaiter(this, void 0, void 0, function* () {
            const rainbowTitle = chalk_animation_1.default.rainbow('Deploying To LocalHost... \n');
            yield sleep();
            rainbowTitle.stop();
        });
    }
    install_dfx() {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, nanospinner_1.createSpinner)('Installing dfx...').start();
            const whichDfx = yield (0, execa_1.execa)("which", ["dfx"]);
            if (!whichDfx.stdout) {
                // Run external tool synchronously
                const installDfx = yield (0, execa_1.execa)("sh", ["-", "ci", `"$(curl -fsSL https://internetcomputer.org/install.sh)"`]);
                if (installDfx.exitCode !== 0) {
                    this.program.error("unable to install dfx, maybe install it manually?", { code: "1" });
                }
                ;
                spinner.success({ text: `successfuly installed dfx` });
            }
            spinner.success({ text: `dfx already installed` });
        });
    }
    create_canisters_local(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, nanospinner_1.createSpinner)(`creating canisters ${name}...`).start();
            const create = yield (0, execa_1.execa)("dfx", ["canister", "create", name]);
            if (create.exitCode !== 0) {
                this.program.error(`unable to create canister ${name}`, { code: "1" });
            }
            ;
            spinner.success({ text: `successfuly created canister ${name}` });
        });
    }
    create_canisters(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, nanospinner_1.createSpinner)('creating canisters...').start();
            const create = yield (0, execa_1.execa)("dfx", ["canister", "--network", "ic", "create", name]);
            if (create.exitCode !== 0) {
                this.program.error(`unable to create canister ${name}`, { code: "1" });
            }
            ;
            spinner.success({ text: `successfuly created canister ${name}` });
        });
    }
    clone_canisters() {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, nanospinner_1.createSpinner)('pulling down canisters...').start();
            const multisig = yield (0, execa_1.execa)("git", ["clone", "https://github.com/CigDao/canisters"]);
            if (multisig.exitCode !== 0) {
                this.program.error("unable to pull down canisters https://github.com/CigDao/canisters?", { code: "1" });
            }
            ;
            spinner.success({ text: `successfuly cloned canisters` });
        });
    }
    deploy_multisig_local() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./.dfx/local/canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying multisig canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`principal "${(_a = this.config) === null || _a === void 0 ? void 0 : _a.member_principal}",`, `"${canister_ids.token.local}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", `${json_data_1.names.multisig}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed multisig canister: ${canister_ids.multisig.local}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy multi sig canister", { code: "1" });
            }
        });
    }
    deploy_database_local() {
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./.dfx/local/canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying database canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`"${canister_ids.token.local}",`, `"${canister_ids.swap.local}",`, `"${canister_ids.topup.local}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", `${json_data_1.names.database}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed database canister: ${canister_ids.database.local}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy database canister", { code: "1" });
            }
        });
    }
    deploy_topup_local() {
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./.dfx/local/canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying topup canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`"${canister_ids.database.local}",`, `vec {"${canister_ids.multisig.local}"; "${canister_ids.swap.local}"; "${canister_ids.token.local}"}`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", `${json_data_1.names.topup}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed topup canister: ${canister_ids.topup.local}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy topup canister", { code: "1" });
            }
        });
    }
    deploy_token_local() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./.dfx/local/canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying token canister, this will take a few mins...').start();
            let icon = (0, fs_1.readFileSync)("icon.png", "base64");
            let token_name = (_a = this.config) === null || _a === void 0 ? void 0 : _a.token_name;
            let symbol = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_symbol;
            let decimal = (_c = this.config) === null || _c === void 0 ? void 0 : _c.token_decimals;
            let token_supply = (_d = this.config) === null || _d === void 0 ? void 0 : _d.token_supply;
            let owner = canister_ids.multisig.local;
            let fee = (_e = this.config) === null || _e === void 0 ? void 0 : _e.token_fee;
            let database = canister_ids.database.local;
            let topupCanister = canister_ids.topup.local;
            let text = "(";
            let args = text.concat(`"${icon}",`, `"${token_name}",`, `"${symbol}",`, `${decimal},`, `${token_supply},`, `principal "${owner}",`, `${fee},`, `"${database}",`, `"${topupCanister}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", `${json_data_1.names.token}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed token canister: ${canister_ids.token.local}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy token canister", { code: "1" });
            }
        });
    }
    deploy_swap_local() {
        return __awaiter(this, void 0, void 0, function* () {
            let WICP_Canister = "utozz-siaaa-aaaam-qaaxq-cai";
            let rawdata = (0, fs_1.readFileSync)("./.dfx/local/canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying swap canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`"${canister_ids.token.local}",`, `"${WICP_Canister}",`, `"${canister_ids.database.local}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", `${json_data_1.names.swap}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed swap canister: ${canister_ids.swap.local}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy multi sig canister", { code: "1" });
            }
        });
    }
    deploy_multisig() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying multisig canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`principal "${(_a = this.config) === null || _a === void 0 ? void 0 : _a.member_principal}",`, `"${canister_ids.token.ic}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", "--network", "ic", `${json_data_1.names.multisig}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed multisig canister: ${canister_ids.multisig.ic}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy multi sig canister", { code: "1" });
            }
        });
    }
    deploy_database() {
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying database canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`"${canister_ids.token.ic}",`, `"${canister_ids.swap.ic}",`, `"${canister_ids.topup.ic}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", "--network", "ic", `${json_data_1.names.database}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed database canister: ${canister_ids.database.ic}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy database canister", { code: "1" });
            }
        });
    }
    deploy_topup() {
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying topup canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`"${canister_ids.database.ic}",`, `vec {"${canister_ids.multisig.ic}"; "${canister_ids.swap.ic}"; "${canister_ids.token.ic}"}`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", "--network", "ic", `${json_data_1.names.topup}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed topup canister: ${canister_ids.topup.ic}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy topup canister", { code: "1" });
            }
        });
    }
    deploy_token() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = (0, fs_1.readFileSync)("./canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying token canister, this will take a few mins...').start();
            let icon = (0, fs_1.readFileSync)("icon.png", "base64");
            let token_name = (_a = this.config) === null || _a === void 0 ? void 0 : _a.token_name;
            let symbol = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_symbol;
            let decimal = (_c = this.config) === null || _c === void 0 ? void 0 : _c.token_decimals;
            let token_supply = (_d = this.config) === null || _d === void 0 ? void 0 : _d.token_supply;
            let owner = canister_ids.multisig.ic;
            let fee = (_e = this.config) === null || _e === void 0 ? void 0 : _e.token_fee;
            let database = canister_ids.database.ic;
            let topupCanister = canister_ids.topup.ic;
            let text = "(";
            let args = text.concat(`"${icon}",`, `"${token_name}",`, `"${symbol}",`, `${decimal},`, `${token_supply},`, `principal "${owner}",`, `${fee},`, `"${database}",`, `"${topupCanister}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", "--network", "ic", `${json_data_1.names.token}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed token canister: ${canister_ids.token.ic}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy token canister", { code: "1" });
            }
        });
    }
    deploy_swap() {
        return __awaiter(this, void 0, void 0, function* () {
            let WICP_Canister = "utozz-siaaa-aaaam-qaaxq-cai";
            let rawdata = (0, fs_1.readFileSync)("./canister_ids.json", 'utf8');
            canister_ids = JSON.parse(rawdata);
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('deploying swap canister, this will take a few mins...').start();
            let text = "(";
            let args = text.concat(`"${canister_ids.token.ic}",`, `"${WICP_Canister}",`, `"${canister_ids.database.ic}"`, ")");
            try {
                const deploy = yield (0, execa_1.execa)("dfx", ["deploy", "--network", "ic", `${json_data_1.names.swap}`, "--argument", args]);
                if (deploy.exitCode === 0) {
                    spinner.success({ text: `successfuly deployed swap canister: ${canister_ids.swap.ic}` });
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to deploy multi sig canister", { code: "1" });
            }
        });
    }
    finish() {
        var _a;
        figlet_1.default.parseFont('Standard', Standard_js_1.default);
        (0, figlet_1.default)(`Congrats , ${(_a = this.config) === null || _a === void 0 ? void 0 : _a.dao_name} !\n Let's Make Crypto Great Again`, {
            font: 'Standard',
        }, (err, data) => {
            console.log(gradient.pastel.multiline(data) + '\n');
            console.log(chalk_1.default.green(`Anyone can identify an opportunity and say "I could do that" or "that would be so easy", but ideas must go through a period of "execution" which kills the original idea and the real idea is born.`));
        });
    }
}
exports.default = MultiSig;
