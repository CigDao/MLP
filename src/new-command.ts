import { Command, program } from "commander";
import MultiSig from "./multi-sig";
import { readFileSync, existsSync } from "fs";
import { Mlpconfig } from "./init";

export const newCommand = new Command("new");
newCommand.description("Creates a new MLP canister")

newCommand.command("multi-sig")
.description("creates a new multi-sig wallet")
.option("-c, --config <configFile>", "Config file to avoid inputs", "mlpconfig.json") // an optional flag where it grabs all inputs from congi file
.action(async (option) => {
    const configExists = existsSync(option.config);
    let configFile: Mlpconfig | undefined = undefined;
    if (configExists) {
        let rawdata = readFileSync(option.config, 'utf8');
        configFile = JSON.parse(rawdata);
    }
    
    const ms = new MultiSig(newCommand, configFile);
    await ms.welcome();
    await ms.askDao();
    await ms.askMember()
    await ms.install_dfx()
    await ms.deploy_multi_sig()
    await ms.finish();
})