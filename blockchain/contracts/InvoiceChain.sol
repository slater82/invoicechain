// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InvoiceChain {
    uint256 public invoiceCount;

    event InvoiceCreated(
        uint256 indexed invoiceId,
        address indexed creator,
        string buyer,
        uint256 amount
    );

    function createInvoice(string memory buyer, uint256 amount) public {
        invoiceCount++;
        emit InvoiceCreated(invoiceCount, msg.sender, buyer, amount);
    }
}
