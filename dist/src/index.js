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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("./commands");
const commands_2 = require("./commands");
const fs_1 = require("fs");
const package_json_1 = require("../package.json");
const program = new commander_1.Command();
program.name("MLP");
program.description(package_json_1.description);
program.version(package_json_1.version);
program.addCommand(commands_1.initCommand);
program.addCommand(commands_2.deployCommand);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield program.parseAsync();
    });
}
console.log(); // log a new line so there is a nice space
main();
process.on('unhandledRejection', function (err) {
    console.error(err);
    if (err.message.includes("git clone https://github.com/CigDao/canisters")) {
        (0, fs_1.rmSync)("canisters", { recursive: true, force: true });
    }
    process.exit(2);
});
