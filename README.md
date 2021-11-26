# Lottery Basic D-App base on Ethereum smart contract with React, Solidity 

## Main Idea

### Organizer (Owner of contract)
- Create and manage Store Contract & Ticket NFT Contract
- Set result for Lottery per times
- Mint Token for Players
- Receive 1% Ticket Price when a Player buy a ticket
### Players (Who buy Tickets)
- Buy ticket with pre-set Ticket price
- Receive prize equal to Total Prize devide Winner Count
- One player can only buy one Ticket per Ticket times
- Can manage all their Ticket NFT Tokens
- You can find your Tokens on OpenSea
![image](https://user-images.githubusercontent.com/53716352/143198699-834f3988-198b-46d7-93fc-94286c2e5cfb.png)

Read more details in contracts

## How to run
Git clone this repository

### Meta Mask
Web app based on Store contract at address "0xb192E16EE4f6461D216EE6537f5369ab8bcC6F92" on Rinkeby Testnet and "0x05364c26226fe2246aFB5B13e800296bACdaE3e0 " on BSC Testnet
- Install Meta Mask extention
- Create your own account
- Get free Ether on [Rinkeby faucet](https://faucet.rinkeby.io/) or [BSC testnet faucet](https://testnet.binance.org/faucet-smart)

### ReactJS Web app

- Install [NodeJS](https://nodejs.org/en/download/)
- Go to web app folder
- Then run these commands in terminal/shell
```npm
    npm install
    npm start
```
App will run on BSC testnet by default. Change contract address in lottery.js file to match your net.
### Contracts
#### To deploy your own contracts

- Go to smartcontract folder
- Modify file truffle-config.js to match your network
- Then run this command in terminal/shell
```
    truffle migrate --network your-network-name
```
- Modify contract address in lottery.js file in webapp folder to match your contract
- Start Web app

#### To test contracts
- Install and open [Ganache](https://www.trufflesuite.com/ganache) for a local Ethereum network
- Go to smartcontract folder
- Then run this command in terminal/shell
```
    truffle test
```
## Main Features

- Buy ticket
![image](https://user-images.githubusercontent.com/53716352/143091208-d1e420b7-a7a1-495a-8874-69b2c2fd6f0f.png)

- Manage last time winners
![image](https://user-images.githubusercontent.com/53716352/143091564-9f543ecd-60be-446e-956d-5d179f7e9e0c.png)

- Manage all players this time
![image](https://user-images.githubusercontent.com/53716352/143091873-544c3ef6-20e4-446d-91b6-f6df1ff73631.png)

- Manage all your ticket token
![image](https://user-images.githubusercontent.com/53716352/143092037-3dcd3e86-9164-4e21-bae5-002832a59ffb.png)

- Withdraw
![image](https://user-images.githubusercontent.com/53716352/143195241-e00f4dad-e90d-4d6d-bd50-41d08698a4c8.png)
