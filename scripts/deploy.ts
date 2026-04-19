import hre from "hardhat";

async function main() {
  const { viem } = hre;

  const publicClient = await viem.getPublicClient();
  const [walletClient] = await viem.getWalletClients();

  const Test = await viem.deployContract("Test", [], {
    walletClient,
    publicClient,
  });

  console.log("Deployed to:", Test.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
