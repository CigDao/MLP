import { Command, program } from "commander";
import MultiSig from "./multi-sig";

export const newCommand = new Command("new");
newCommand.description("Creates a new MLP canister")

newCommand.command("multi-sig")
.description("creates a new multi-sig wallet")
.option("-c, --config <configGile>", "Config file to avoid inputs") // an optional flag where it grabs all inputs from congi file
.action(async (id, options) => {
    const ms = new MultiSig(newCommand);
    await ms.welcome();
    await ms.askDao();
    await ms.askMember()
    await ms.install_dfx()
    await ms.deploy_multi_sig()
    await ms.finish();
})