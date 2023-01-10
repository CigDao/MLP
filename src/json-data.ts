export let dfx = {
    "canisters": {
        "multi_sig": {
            "type": "custom",
            "build": "npx azle multi_sig",
            "root": "src",
            "ts": "node_modules/@cigdao/multi-sig/src/index.ts",
            "candid": "node_modules/@cigdao/multi-sig/src/index.did",
            "wasm": "target/wasm32-unknown-unknown/release/multi_sig.wasm.gz"
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
            "candid": "canisters/token/token.did",
            "wasm": "canisters/token/token.wasm"
        }
    }
}

export let config = {
    "dao_name": "",
    "member_principal": "",
    "token_supply":0,
    "token_decimals":0,
    "token_fee":0,
    "token_name":"",
    "token_symbol":""
}

export let names = {
    "multi_sig": "multi_sig",
    "database": "database",
    "topup": "topup",
    "token": "token",
    "swap": "swap"
}