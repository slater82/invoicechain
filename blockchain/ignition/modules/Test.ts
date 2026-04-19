import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("InvoiceChainModule", (m) => {
  const invoiceChain = m.contract("InvoiceChain");
  return { invoiceChain };
});
