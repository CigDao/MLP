#!/usr/bin/env node
import { Command } from "commander";
import { newCommand } from "./new-command";

const program = new Command();
program.name("MLP")
program.description('My Little Protocol - Launching dao tools');
program.version('0.0.1');
program.addCommand(newCommand);

async function main() {
    await program.parseAsync();

}
console.log() // log a new line so there is a nice space
main(); 

process.on('unhandledRejection', function (err: Error) {
    console.error(err.stack);
})