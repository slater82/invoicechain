import hardhatToolboxViem from "@nomicfoundation/hardhat-toolbox-viem";
import hardhatIgnition from "@nomicfoundation/hardhat-ignition";
import hardhatIgnitionViem from "@nomicfoundation/hardhat-ignition-viem";
import { configVariable, defineConfig } from "hardhat/config";

const sepoliaUrl = process.env.SEPOLIA_RPC_URL ?? process.env.RPC_URL ?? configVariable("SEPOLIA_RPC_URL");
const sepoliaKey = process.env.SEPOLIA_PRIVATE_KEY ?? process.env.PRIVATE_KEY ?? configVariable("SEPOLIA_PRIVATE_KEY");

export default defineConfig({
  plugins: [hardhatToolboxViem, hardhatIgnition, hardhatIgnitionViem],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: sepoliaUrl,
      accounts: [sepoliaKey],
    },
  },
});
