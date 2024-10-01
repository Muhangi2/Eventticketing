require('@nomicfoundation/hardhat-toolbox')
require("dotenv").config(); 
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    base_sepolia: {
      url: process.env.ALCHEMY_URL, 
      chainId:84532,
      accounts: [process.env.ACCOUNTKEY], 
    },
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}
