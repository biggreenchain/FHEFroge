require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    fhevm: {
      url: process.env.FHEVM_RPC_URL || "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
