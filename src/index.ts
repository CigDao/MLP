#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands";
import { deployCommand } from "./commands";

const program = new Command();
program.name("MLP")
program.description('My Little Protocol - Launching dao tools');
program.version('0.0.1');
program.addCommand(initCommand);
program.addCommand(deployCommand);

async function main() {
    await program.parseAsync();

}
console.log() // log a new line so there is a nice space
main(); 

process.on('unhandledRejection', function (err: Error) {
    console.error(err.stack);
})