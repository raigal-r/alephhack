# scaffold-v2

# Meme Arena

##Sign protocol
Schema deployment (Sepolia): 
https://sepolia.etherscan.io/tx/0x1c7d553e9286602a90b228cc0effaa93193c4986c096e668dedb946d68a6ff16
https://testnet-scan.sign.global/schema/onchain_evm_11155111_0x206


## Contracts

### ZKSync

Deployed contract in zksync: 0x5d52621c4DC1e647f2A7cBa827b029ca9d7033b8
https://zksync-sepolia.blockscout.com/address/0x5d52621c4DC1e647f2A7cBa827b029ca9d7033b8

### Solana
 
Deployed Program: https://explorer.solana.com/address/C5XKtCrPq3GmZKjUj4uVcHWAQgUZuQC9Pz3jjxd9Mt53?cluster=devnet

- Rust v1.77.2 or higher
- Anchor CLI 0.30.0 or higher
- Solana CLI 1.18.9 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
yarn install
```

#### Start the web app

```
yarn dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `npm run`, eg: `npm run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
npm run anchor keys sync
```

#### Build the program:

```shell
npm run anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
yarn dev
```

Build the web app

```shell
npm run build
```
