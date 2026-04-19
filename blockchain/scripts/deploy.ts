import hre from "hardhat";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

async function main() {
  console.log("Deploying InvoiceChain contract...");

  // Get contract artifact
  const artifact = await hre.artifacts.readArtifact("InvoiceChain");
  
  // Setup wallet
  const privateKey = process.env.SEPOLIA_PRIVATE_KEY || process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Private key not found in environment variables");
  }
  
  const account = privateKeyToAccount(`0x${privateKey}`);
  const rpcUrl = process.env.SEPOLIA_RPC_URL || process.env.RPC_URL;
  
  if (!rpcUrl) {
    throw new Error("RPC URL not found in environment variables");
  }

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(rpcUrl),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });

  console.log("Deploying from account:", account.address);

  // Deploy contract
  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode as `0x${string}`,
    args: [],
  });

  console.log("Transaction hash:", hash);
  console.log("Waiting for confirmation...");

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  
  console.log("✅ InvoiceChain deployed successfully!");
  console.log("📝 Contract address:", receipt.contractAddress);
  console.log("🔗 View on Etherscan:", `https://sepolia.etherscan.io/address/${receipt.contractAddress}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});
