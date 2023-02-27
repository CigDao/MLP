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
const fs_1 = require("fs");
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
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
    create_dao() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function* () {
            const composer_canister = "xpfnk-5yaaa-aaaan-qc3ga-cai";
            const registry_canister = "xuarp-haaaa-aaaan-qc3eq-cai";
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('registering dao').start();
            let icon = (0, fs_1.readFileSync)("icon.png", "base64");
            let args = `(
            record  {
                        daoName = ${(_a = this.config) === null || _a === void 0 ? void 0 : _a.dao_name};
                        logo = "${icon}";
                        name = ${(_b = this.config) === null || _b === void 0 ? void 0 : _b.token_name};
                        symbol = ${(_c = this.config) === null || _c === void 0 ? void 0 : _c.token_symbol};
                        decimals = ${(_d = this.config) === null || _d === void 0 ? void 0 : _d.token_decimals}:nat8;
                        totalSupply = ${(_e = this.config) === null || _e === void 0 ? void 0 : _e.token_supply}:nat;
                        fee = ${(_f = this.config) === null || _f === void 0 ? void 0 : _f.token_fee}:nat;
                        token2 = ${(_g = this.config) === null || _g === void 0 ? void 0 : _g.token_2};
                        proposalCost = ${(_h = this.config) === null || _h === void 0 ? void 0 : _h.proposal_cost}:nat;
                        stakedTime = ${(_j = this.config) === null || _j === void 0 ? void 0 : _j.stake_time}:nat;
                        clif = ${(_k = this.config) === null || _k === void 0 ? void 0 : _k.clif}:nat;
                        maxClaims = ${(_l = this.config) === null || _l === void 0 ? void 0 : _l.max_claims}:nat;
                        vestingThreshold = ${(_m = this.config) === null || _m === void 0 ? void 0 : _m.vesting_threshold}:nat;
                        fundingGoal = ${(_o = this.config) === null || _o === void 0 ? void 0 : _o.funding_goal}:nat;
                        swapFee = ${(_p = this.config) === null || _p === void 0 ? void 0 : _p.swap_fee}:float64;
                        swapFundersfee = ${(_q = this.config) === null || _q === void 0 ? void 0 : _q.swap_funders_fee}:float64;
                    },
            )`;
            try {
                const set_name = yield (0, execa_1.execa)("dfx", ["canister", "--network", "ic", "call", registry_canister, "setName", `(${(_r = this.config) === null || _r === void 0 ? void 0 : _r.dao_name})`]);
                if (set_name.exitCode === 0) {
                    spinner.update({ text: `successfuly registered dao` });
                    yield sleep();
                    spinner.update({ text: `creating dao, this will take a few mins...` });
                    const create = yield (0, execa_1.execa)("dfx", ["canister", "--network", "ic", "call", composer_canister, "create", args]);
                    if (create.exitCode === 0) {
                        spinner.success({ text: `successfuly created Dao` });
                    }
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to created Dao", { code: "1" });
            }
        });
    }
    create_dao_local() {
        return __awaiter(this, void 0, void 0, function* () {
            const composer_canister = "rrkah-fqaaa-aaaaa-aaaaq-cai";
            const registry_canister = "rno2w-sqaaa-aaaaa-aaacq-cai";
            // Run external tool synchronously
            const spinner = (0, nanospinner_1.createSpinner)('registering dao').start();
            let icon = (0, fs_1.readFileSync)("icon.png", "base64");
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
            )`;
            try {
                const set_name = yield (0, execa_1.execa)("dfx", ["canister", "call", registry_canister, "setName", `("Test Dao")`]);
                if (set_name.exitCode === 0) {
                    spinner.update({ text: `successfuly registered dao` });
                    yield sleep();
                    spinner.update({ text: `creating dao, this will take a few mins...` });
                    const create = yield (0, execa_1.execa)("dfx", ["canister", "call", composer_canister, "create", args]);
                    if (create.exitCode === 0) {
                        spinner.success({ text: `successfuly created Dao` });
                    }
                }
            }
            catch (e) {
                console.error(e);
                this.program.error("failed to created Dao", { code: "1" });
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
