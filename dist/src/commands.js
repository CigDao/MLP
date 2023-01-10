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
exports.deployCommand = exports.initCommand = void 0;
const commander_1 = require("commander");
const deploy_1 = __importDefault(require("./deploy"));
const init_commands_1 = __importDefault(require("./init-commands"));
const fs_1 = require("fs");
const json_data_1 = require("./json-data");
const https_1 = require("https");
exports.initCommand = new commander_1.Command("init");
exports.deployCommand = new commander_1.Command("deploy");
exports.initCommand.description("Creates a new MLP project")
    .action((option) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = (0, fs_1.existsSync)("mlpconfig.json");
    let defaultmlpConfig = exists ? JSON.parse((0, fs_1.readFileSync)("mlpconfig.json", 'utf8')) : undefined;
    const init = new init_commands_1.default(defaultmlpConfig);
    yield init.welcome();
    json_data_1.config.dao_name = yield init.askDao();
    json_data_1.config.member_principal = yield init.askMember();
    json_data_1.config.token_name = yield init.askTokenName();
    json_data_1.config.token_symbol = yield init.askTokenSymbol();
    json_data_1.config.token_supply = yield init.askTokenSupply();
    json_data_1.config.token_decimals = yield init.askTokenDecimals();
    json_data_1.config.token_fee = yield init.askTokenFee();
    for (let i = 0; i < json_data_1.config.token_decimals; i++) {
        json_data_1.config.token_supply = json_data_1.config.token_supply * 10;
    }
    try {
        (0, fs_1.writeFileSync)('dfx.json', JSON.stringify(json_data_1.dfx));
        // file written successfully
    }
    catch (err) {
        console.error(err);
    }
    try {
        const exists = (0, fs_1.existsSync)("mlpconfig.json");
        if (!exists) {
            (0, fs_1.writeFileSync)('mlpconfig.json', JSON.stringify(json_data_1.config));
        }
        // file written successfully
    }
    catch (err) {
        console.error(err);
    }
    try {
        const exists = (0, fs_1.existsSync)("icon.png");
        if (!exists) {
            (0, https_1.get)("https://cdn.cigdao.org/icon.png", (res) => res.pipe((0, fs_1.createWriteStream)('icon.png')));
        }
    }
    catch (err) {
        console.error(err);
    }
}));
exports.deployCommand.description("creates and deploys a new Dao")
    .option("-c, --config <configFile>", "Config file to avoid inputs", "mlpconfig.json") // an optional flag where it grabs all inputs from congi file
    .option("-l, --local", "deploy to local dfx")
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const configExists = (0, fs_1.existsSync)(options.config);
    let configFile = undefined;
    if (configExists) {
        let rawdata = (0, fs_1.readFileSync)(options.config, 'utf8');
        configFile = JSON.parse(rawdata);
    }
    const dp = new deploy_1.default(exports.deployCommand, configFile);
    if (options.local) {
        yield dp.title_local();
    }
    else {
        yield dp.title();
    }
    yield dp.install_dfx();
    yield dp.clone_canisters();
    if (options.local) {
        yield dp.create_canisters_local(json_data_1.names.multisig);
        yield dp.create_canisters_local(json_data_1.names.database);
        yield dp.create_canisters_local(json_data_1.names.topup);
        yield dp.create_canisters_local(json_data_1.names.token);
        yield dp.create_canisters_local(json_data_1.names.swap);
        yield dp.deploy_database_local();
        yield dp.deploy_topup_local();
        yield dp.deploy_token_local();
        yield dp.deploy_multisig_local();
        yield dp.deploy_swap_local();
    }
    else {
        yield dp.create_canisters(json_data_1.names.multisig);
        yield dp.create_canisters(json_data_1.names.database);
        yield dp.create_canisters(json_data_1.names.topup);
        yield dp.create_canisters(json_data_1.names.token);
        yield dp.create_canisters(json_data_1.names.swap);
        yield dp.deploy_database();
        yield dp.deploy_topup();
        yield dp.deploy_token();
        yield dp.deploy_multisig();
        yield dp.deploy_swap();
    }
    yield dp.finish();
}));
