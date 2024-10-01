require('@nomicfoundation/hardhat-toolbox')

module.exports = {
  solidity: "0.8.24",
  networks: {
    base_sepolia: {
      url: "https://base-sepolia.g.alchemy.com/v2/k8dpUeP7Mbr1CFWEkIwjsEbzqlRHdH13", 
      accounts: ["43dfd9255cbaad2e6692320469d62f6c140f40cc58138e977ad769c98f916cba"], 
    },
  },
  mocha: {
    timeout: 40000,
  },
}
module.exports = {
 
};