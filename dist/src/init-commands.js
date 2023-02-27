#!/usr/bin/env node
"use strict";
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
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_animation_1 = __importDefault(require("chalk-animation"));
let dao_name;
let member_principal;
let token_name;
let token_symbol;
let token_supply;
let token_decimals;
let token_fee;
let token_2;
let proposal_cost;
let stake_time;
let clif;
let vested;
let interval;
let total_allocation;
let funding_goal;
let swap_fee;
let swap_funders_fee;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
class MultiSig {
    constructor(config) {
        this.config = config;
    }
    welcome() {
        return __awaiter(this, void 0, void 0, function* () {
            const rainbowTitle = chalk_animation_1.default.rainbow('Welcome To My Little Protocol \n');
            yield sleep();
            rainbowTitle.stop();
        });
    }
    askDao() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.dao_name) {
                dao_name = this.config.dao_name;
                console.log(`Dao Name: ${dao_name}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'dao_name',
                    type: 'input',
                    message: "What is your dao's name?",
                    default() {
                        return 'Dao Name';
                    },
                });
                return answers.dao_name;
            }
        });
    }
    askMember() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.member_principal) {
                member_principal = (_b = this.config) === null || _b === void 0 ? void 0 : _b.member_principal;
                console.log(`Dao Member: ${member_principal}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'member_principal',
                    type: 'input',
                    message: "You need to add at least 1 member",
                    default() {
                        return 'principal';
                    },
                });
                return answers.member_principal;
            }
        });
    }
    askTokenDecimals() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.token_decimals) {
                token_decimals = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_decimals;
                console.log(`Token Decimals: ${token_decimals}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'token_decimals',
                    type: 'input',
                    message: "The number of decimals for your governace token",
                    default() {
                        return 'Token Decimals';
                    },
                });
                return answers.token_decimals;
            }
        });
    }
    askTokenSupply() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.token_supply) {
                token_supply = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_supply;
                console.log(`Token Supply: ${token_supply}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'token_supply',
                    type: 'input',
                    message: "The total supply for your governace token",
                    default() {
                        return 'Token Supply';
                    },
                });
                return answers.token_supply;
            }
        });
    }
    askTokenFee() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.token_fee) {
                token_fee = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_fee;
                console.log(`Token Fee: ${token_fee}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'token_fee',
                    type: 'input',
                    message: "The fee for your governace token",
                    default() {
                        return 'Token Fee';
                    },
                });
                return answers.token_fee;
            }
        });
    }
    askTokenName() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.token_name) {
                token_name = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_name;
                console.log(`Token Name: ${token_name}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'token_name',
                    type: 'input',
                    message: "The name of your governace token",
                    default() {
                        return 'Token Name';
                    },
                });
                return answers.token_name;
            }
        });
    }
    askTokenSymbol() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.token_symbol) {
                token_symbol = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_symbol;
                console.log(`Token Symbol: ${token_symbol}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'token_symbol',
                    type: 'input',
                    message: "The symbol of your governace token",
                    default() {
                        return 'Token Symbol';
                    },
                });
                return answers.token_symbol;
            }
        });
    }
    askProposalCost() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.proposal_cost) {
                proposal_cost = (_b = this.config) === null || _b === void 0 ? void 0 : _b.proposal_cost;
                console.log(`Proposal Cost: ${proposal_cost}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'proposal_cost',
                    type: 'number',
                    message: "The cost to create a proposal",
                    default() {
                        return 'Proposal Cost';
                    },
                });
                return answers.proposal_cost;
            }
        });
    }
    askStakeTime() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.stake_time) {
                stake_time = (_b = this.config) === null || _b === void 0 ? void 0 : _b.stake_time;
                console.log(`Unstaking Time: ${stake_time}`);
                return stake_time;
            }
            else {
                const answers = yield inquirer_1.default.prompt({
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
                switch (answers.stake_time) {
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
        });
    }
    askToken2() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.token_2) {
                token_2 = (_b = this.config) === null || _b === void 0 ? void 0 : _b.token_2;
                console.log(`Token 2: ${token_2}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'token_2',
                    type: 'input',
                    message: "Canister id for 2nd token of swap pair",
                    default() {
                        return 'Token 2 of swap pair';
                    },
                });
                return answers.token_2;
            }
        });
    }
    askClif() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.clif) {
                clif = (_b = this.config) === null || _b === void 0 ? void 0 : _b.clif;
                console.log(`Vesting Clif: ${clif}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'clif',
                    type: 'number',
                    message: "The amount of time before your allocation release (nanoseconds)",
                    default() {
                        return 'Clif';
                    },
                });
                return answers.clif;
            }
        });
    }
    askMaxClaims() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.max_claims) {
                max_claims = (_b = this.config) === null || _b === void 0 ? void 0 : _b.max_claims;
                console.log(`Max Claim: ${max_claims}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'max_claims',
                    type: 'number',
                    message: "The amount of claims in a vesting period (nanoseconds)",
                    default() {
                        return 'Max Claim';
                    },
                });
                return answers.max_claims;
            }
        });
    }
    askVested() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.vested) {
                vested = (_b = this.config) === null || _b === void 0 ? void 0 : _b.vested;
                console.log(`vested: ${vested}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'vested',
                    type: 'number',
                    message: "The total amount of time your allocation is vested",
                    default() {
                        return 'vested';
                    },
                });
                return answers.vested;
            }
        });
    }
    askInterval() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.interval) {
                interval = (_b = this.config) === null || _b === void 0 ? void 0 : _b.interval;
                console.log(`vested: ${interval}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'interval',
                    type: 'number',
                    message: "interval in when funds are released",
                    default() {
                        return 'interval';
                    },
                });
                return answers.interval;
            }
        });
    }
    askTotalAllocation() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.total_allocation) {
                total_allocation = (_b = this.config) === null || _b === void 0 ? void 0 : _b.total_allocation;
                console.log(`vested: ${interval}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'total_allocation',
                    type: 'number',
                    message: "total allocation for air drop",
                    default() {
                        return 'total allocation';
                    },
                });
                return answers.total_allocation;
            }
        });
    }
    askFundingGoal() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.funding_goal) {
                funding_goal = (_b = this.config) === null || _b === void 0 ? void 0 : _b.funding_goal;
                console.log(`Funding Goal: ${funding_goal}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'funding_goal',
                    type: 'number',
                    message: "The amount token 2 deposited to the swap before its activiated",
                    default() {
                        return 'Funding Goal';
                    },
                });
                return answers.funding_goal;
            }
        });
    }
    askSwapFee() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.swap_fee) {
                swap_fee = (_b = this.config) === null || _b === void 0 ? void 0 : _b.swap_fee;
                console.log(`Swap Fee: ${swap_fee}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'swap_fee',
                    type: 'number',
                    message: "The fee paid to liquidty providers (float)",
                    default() {
                        return 'Swap Fee';
                    },
                });
                return answers.swap_fee;
            }
        });
    }
    askSwapFundersFee() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.swap_funders_fee) {
                swap_funders_fee = (_b = this.config) === null || _b === void 0 ? void 0 : _b.swap_funders_fee;
                console.log(`Swap Funders Fee: ${swap_funders_fee}`);
            }
            else {
                const answers = yield inquirer_1.default.prompt({
                    name: 'swap_funders_fee',
                    type: 'number',
                    message: "The additional percentage givin to those that funded the swap (float)",
                    default() {
                        return 'Swap Funders_Fee';
                    },
                });
                return answers.swap_funders_fee;
            }
        });
    }
}
exports.default = MultiSig;
