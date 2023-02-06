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

? What is your dao's name? DocumentationDao
? You need to add at least 1 member 
? The name of your governace token Test
? The symbol of your governace token Test
? The total supply for your governace token 1000
? The number of decimals for your governace token 8
? The fee for your governace token 0
? The cost to create a proposal 0
? The time it takes to unstake tokens 1 minute

Deploying To LocalHost... 

✔ dfx already installed
✔ successfuly created Dao
   ____                            _                 _          __  __   _                                                               
  / ___|___  _ __   __ _ _ __ __ _| |_ ___       ___| |_ _   _ / _|/ _| | |                                                              
 | |   / _ \| '_ \ / _` | '__/ _` | __/ __|     / __| __| | | | |_| |_  | |                                                              
 | |__| (_) | | | | (_| | | | (_| | |_\__ \  _  \__ \ |_| |_| |  _|  _| |_|                                                              
  \____\___/|_| |_|\__, |_|  \__,_|\__|___/ ( ) |___/\__|\__,_|_| |_|   (_)         ____                _        _               _       
  | |    ___| |_( )|___/|  \/  | __ _| | ___|/   / ___|_ __ _   _ _ __ | |_ ___    / ___|_ __ ___  __ _| |_     / \   __ _  __ _(_)_ __  
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