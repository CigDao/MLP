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
}
exports.default = MultiSig;
