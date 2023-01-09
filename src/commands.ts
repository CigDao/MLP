import { Command, program } from "commander";
import MultiSig from "./multi-sig";
import InitCommands from "./init-commands";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { Mlpconfig } from "./init";
import {dfx,config} from "./json-data";

export const initCommand = new Command("init");
export const deployCommand = new Command("deploy");

initCommand.description("Creates a new MLP pproject")
.action(async (option) => {
    const init = new InitCommands(initCommand);

    await init.welcome();
    config.dao_name = await init.askDao();
    config.member_principal = await init.askMember();
    config.token_principal = await init.askToken();
    config.token_decimals = await init.askTokenDecimals();
    config.token_supply = await init.askTokenSupply();

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
        writeFileSync('mlpconfig.json', JSON.stringify(config));
        // file written successfully
      } catch (err) {
        console.error(err);
      }
})

deployCommand.command("multi-sig")
.description("creates a new multi-sig wallet")
.option("-c, --config <configFile>", "Config file to avoid inputs", "mlpconfig.json") // an optional flag where it grabs all inputs from congi file
.action(async (option) => {
    const configExists = existsSync(option.config);
    let configFile: Mlpconfig | undefined = undefined;
    if (configExists) {
        let rawdata = readFileSync(option.config, 'utf8');
        configFile = JSON.parse(rawdata);
    }
    
    const ms = new MultiSig(deployCommand, configFile);
    await ms.welcome();
    await ms.askDao();
    await ms.askToken()
    await ms.askMember()
    await ms.install_dfx()
    await ms.deploy_multi_sig()
    await ms.finish();
})