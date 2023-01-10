import { Command, program } from "commander";
import Deploy from "./deploy";
import InitCommands from "./init-commands";
import { readFileSync, existsSync, writeFileSync, createWriteStream } from "fs";
import { Mlpconfig } from "./init";
import {dfx,config, names} from "./json-data";
import {get} from "https";

export const initCommand = new Command("init");
export const deployCommand = new Command("deploy");

initCommand.description("Creates a new MLP project")
.action(async (option) => {
    const exists = existsSync("mlpconfig.json");
    let defaultmlpConfig = exists ? JSON.parse(readFileSync("mlpconfig.json", 'utf8')) : undefined;
    const init = new InitCommands(defaultmlpConfig);

    await init.welcome();
    config.dao_name = await init.askDao();
    config.member_principal = await init.askMember();
    config.token_name = await init.askTokenName();
    config.token_symbol = await init.askTokenSymbol();
    config.token_supply = await init.askTokenSupply();
    config.token_decimals = await init.askTokenDecimals();
    config.token_fee = await init.askTokenFee();

    for (let i = 0; i < config.token_decimals; i++) {
      config.token_supply = config.token_supply * 10
    }

    try {
        writeFileSync('dfx.json', JSON.stringify(dfx));
        // file written successfully
      } catch (err) {
        console.error(err);
      }
      try {
        const exists = existsSync("mlpconfig.json");
        if (!exists) {
          writeFileSync('mlpconfig.json', JSON.stringify(config));
        }
        // file written successfully
      } catch (err) {
        console.error(err);
      }

      try {
        const exists = existsSync("icon.png");
        if (!exists) {
          get("https://cdn.cigdao.org/icon.png", (res) => res.pipe(createWriteStream('icon.png')));
        }
      }catch (err) {
        console.error(err);
      }

})

deployCommand.description("creates and deploys a new Dao")
.option("-c, --config <configFile>", "Config file to avoid inputs", "mlpconfig.json") // an optional flag where it grabs all inputs from congi file
.option("-l, --local", "deploy to local dfx")
.action(async (options) => {
    const configExists = existsSync(options.config);
    let configFile: Mlpconfig | undefined = undefined;
    if (configExists) {
        let rawdata = readFileSync(options.config, 'utf8');
        configFile = JSON.parse(rawdata);
    }
    
    const dp = new Deploy(deployCommand, configFile);
    if(options.local){
      await dp.title_local()
    }else{
      await dp.title();
    }
    await dp.install_dfx()
    await dp.clone_canisters()
    if(options.local){
      await dp.create_canisters_local(names.multisig)
      await dp.create_canisters_local(names.database)
      await dp.create_canisters_local(names.topup)
      await dp.create_canisters_local(names.token)
      await dp.create_canisters_local(names.swap)
      await dp.deploy_database_local()
      await dp.deploy_topup_local()
      await dp.deploy_token_local()
      await dp.deploy_multisig_local()
      await dp.deploy_swap_local()
    }else{
      await dp.create_canisters(names.multisig)
      await dp.create_canisters(names.database)
      await dp.create_canisters(names.topup)
      await dp.create_canisters(names.token)
      await dp.create_canisters(names.swap)
      await dp.deploy_database()
      await dp.deploy_topup()
      await dp.deploy_token()
      await dp.deploy_multisig()
      await dp.deploy_swap()
    }
    await dp.finish();
})