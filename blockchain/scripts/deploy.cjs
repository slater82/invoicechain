const hre = require("hardhat");

async function main() {
  const InvoiceChain = await hre.ethers.getContractFactory("InvoiceChain");
  const contract = await InvoiceChain.deploy();

  await contract.deployed();

  console.log("InvoiceChain deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

