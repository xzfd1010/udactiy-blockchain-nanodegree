// Configuration
var Web3 = require("web3")
var EthereumTransaction = require("ethereumjs-tx")
var web3 = new Web3('HTTP://127.0.0.1:7545')

// Set Addresses
var sendingAddress = '0x43375534639421d8C4ADDed45f5f463aA422d45d'
var receivingAddress = '0x774d3E939ec514f5e5C18164c337e46a7Bfa0eF0'

// Create transaction
var rawTransaction = {
    nonce:1,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 1,
    data: ""
}

// Sign Transaction
var privateKeySender = '1e054d85e898afe0ca7f4ee1e0459647a35bc409f2e26ab5bd3fcff7e0cf28f0'
var privateKeySenderHex = new Buffer(privateKeySender, 'hex')
var transaction = new EthereumTransaction(rawTransaction)
transaction.sign(privateKeySenderHex)
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)