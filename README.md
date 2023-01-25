# My Little Prottocol

My little prottocol is a cli toolset that will allow you to create a DAO within the YC ecosystem. 

## Install

```
npm install -g @cigdao/mlp

```

One installed you can run `mlp -h in the terminal`

```
Usage: MLP [options] [command]

My Little Protocol - Launching dao tools

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  init              Creates a new MLP project
  deploy [options]  creates and deploys a new Dao
  help [command]    display help for command
  ```


## Building Locally
Do build mlp ecosystem follow directions closely.

1. `mkdir myapp`
2. `mlp init`
3. Follow prompted instructions
4. `dfx start --background`
4. `mlp deploy -l`

If you followed your instructions correctly the prompt should like like so
```

Welcome To My Little Protocol 

? What is your dao's name? documentation
? You need to add at least 1 member 1
? The name of your governace token doc
? The symbol of your governace token doc
? The total supply for your governace token 100
? The number of decimals for your governace token 100
cigdao@cigdao-Mac-Studio myapp % mlp init

Welcome To My Little Protocol 

? What is your dao's name? DocumentationDao
? You need to add at least 1 member 
qn4yi-5bmj3-4xqzh-knt34-wfrhw-srz26-p463o-tn6ih-mm3vv-2smqt-6ae
? The name of your governace token Test
? The symbol of your governace token Test
? The total supply for your governace token 1000
? The number of decimals for your governace token 8
? The fee for your governace token 0
? The cost to create a proposal 0
? The time it takes to unstake tokens 1 minute

cigdao@cigdao-Mac-Studio myapp % dfx start --background
Running dfx start for version 0.12.1
Using the default definition for the 'local' shared network because /Users/cigdao/.config/dfx/networks.json does not exist.
[Canister ryjl3-tyaaa-aaaaa-aaaba-cai] creating new Collection service canister with pk=group#ledger
[Canister ryjl3-tyaaa-aaaaa-aaaba-cai] new Collection service canisterId=qjdve-lqaaa-aaaaa-aaaeq-cai
Dashboard: http://localhost:59751/_/dashboard

cigdao@cigdao-Mac-Studio myapp % mlp deploy -l

Deploying To LocalHost... 

✔ dfx already installed
✔ successfuly cloned canisters
✔ successfuly created canister multisig
✔ successfuly created canister database
✔ successfuly created canister topup
✔ successfuly created canister token
✔ successfuly created canister swap
✔ successfuly created canister treasury
✔ successfuly created canister dao
✔ successfuly created database partition: ryjl3-tyaaa-aaaaa-aaaba-cai
✔ successfuly deployed topup canister: r7inp-6aaaa-aaaaa-aaabq-cai
✔ successfuly deployed token canister: rkp4c-7iaaa-aaaaa-aaaca-cai
✔ successfuly deployed multisig canister: rrkah-fqaaa-aaaaa-aaaaq-cai
✔ successfuly deployed swap canister: rno2w-sqaaa-aaaaa-aaacq-cai
✔ successfuly deployed treasury canister: renrk-eyaaa-aaaaa-aaada-cai
✔ successfuly deployed dao canister: rdmx6-jaaaa-aaaaa-aaadq-cai
   ____                            _             ____                                        _        _   _             ____                _ 
  / ___|___  _ __   __ _ _ __ __ _| |_ ___      |  _ \  ___   ___ _   _ _ __ ___   ___ _ __ | |_ __ _| |_(_) ___  _ __ |  _ \  __ _  ___   | |
 | |   / _ \| '_ \ / _` | '__/ _` | __/ __|     | | | |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __/ _` | __| |/ _ \| '_ \| | | |/ _` |/ _ \  | |
 | |__| (_) | | | | (_| | | | (_| | |_\__ \  _  | |_| | (_) | (__| |_| | | | | | |  __/ | | | || (_| | |_| | (_) | | | | |_| | (_| | (_) | |_|
  \____\___/|_| |_|\__, |_|  \__,_|\__|___/ ( ) |____/ \___/ \___|\__,_|_| |_| |_|\___|_| |_|\__\__,_|\__|_|\___/|_| |_|____/ \__,_|\___/  (_)
   _         _   _ |___/ __  __       _     |/    ____                  _           ____                _        _               _            
  | |    ___| |_( )___  |  \/  | __ _| | _____   / ___|_ __ _   _ _ __ | |_ ___    / ___|_ __ ___  __ _| |_     / \   __ _  __ _(_)_ __       
  | |   / _ \ __|// __| | |\/| |/ _` | |/ / _ \ | |   | '__| | | | '_ \| __/ _ \  | |  _| '__/ _ \/ _` | __|   / _ \ / _` |/ _` | | '_ \      
  | |__|  __/ |_  \__ \ | |  | | (_| |   <  __/ | |___| |  | |_| | |_) | || (_) | | |_| | | |  __/ (_| | |_   / ___ \ (_| | (_| | | | | |     
  |_____\___|\__| |___/ |_|  |_|\__,_|_|\_\___|  \____|_|   \__, | .__/ \__\___/   \____|_|  \___|\__,_|\__| /_/   \_\__, |\__,_|_|_| |_|     
                                                            |___/|_|                                                 |___/                    

Anyone can identify an opportunity and say "I could do that" or "that would be so easy", but ideas must go through a period of "execution" which kills the original idea and the real idea is born.
```

## Building Production

1. `mkdir myapp`
2. `mlp init`
3. Follow prompted instructions
4. `mlp deploy`