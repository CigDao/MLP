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
    config.proposal_cost = await init.askProposalCost();
    config.stake_time = await init.askStakeTime();
    config.token_2 = await init.askToken2();
    config.clif = await init.askClif();
    config.vested = await init.askVested();
    config.interval = await init.askInterval();
    config.interval = await init.askTotalAllocation();
    config.funding_goal = await init.askFundingGoal();
    config.swap_fee = await init.askSwapFee();
    config.swap_funders_fee = await init.askSwapFundersFee();

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
    if(options.local){
     await dp.create_dao_local()
    }else{
      await dp.create_dao()
    }
    await dp.finish();
})