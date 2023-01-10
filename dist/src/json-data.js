"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.names = exports.config = exports.dfx = void 0;
exports.dfx = {
    "canisters": {
        "multisig": {
            "type": "custom",
            "build": "",
            "candid": "canisters/multisig/multisig.did",
            "wasm": "canisters/multisig/multisig.wasm"
        },
        "database": {
            "type": "custom",
            "build": "",
            "candid": "canisters/database/database.did",
            "wasm": "canisters/database/database.wasm"
        },
        "topup": {
            "type": "custom",
            "build": "",
            "candid": "canisters/topup/topup.did",
            "wasm": "canisters/topup/topup.wasm"
        },
        "token": {
            "type": "custom",
            "build": "",
            "candid": "canisters/token/token.did",
            "wasm": "canisters/token/token.wasm"
        },
        "swap": {
            "type": "custom",
            "build": "",
            "candid": "canisters/swap/swap.did",
            "wasm": "canisters/swap/swap.wasm"
        }
    }
};
exports.config = {
    "dao_name": "",
    "member_principal": "",
    "token_supply": 0,
    "token_decimals": 0,
    "token_fee": 0,
    "token_name": "",
    "token_symbol": ""
};
exports.names = {
    "multisig": "multisig",
    "database": "database",
    "topup": "topup",
    "token": "token",
    "swap": "swap"
};
