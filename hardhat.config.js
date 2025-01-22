// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.9",
//   networks: {
//     hardhat: {
//       chainId: 1337,
//     },
//   },
//   paths: {
//     artifacts: "./client/src/artifacts",
//   },
// };

require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const URL = process.env.URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: URL,
      accounts: [PRIVATE_KEY],
    },
  },
};