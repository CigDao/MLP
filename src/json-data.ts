export let dfx = {
    "canisters": {
        "multi_sig": {
            "type": "custom",
            "build": "npx azle multi_sig",
            "root": "src",
            "ts": "node_modules/@cigdao/multi-sig/src/index.ts",
            "candid": "node_modules/@cigdao/multi-sig/src/index.did",
            "wasm": "target/wasm32-unknown-unknown/release/multi_sig.wasm.gz"
        }
    }
}

export let config = {
    "dao_name": "",
    "token_principal": "",
    "member_principal": "",
    "token_supply":0,
    "token_decimals":0
}