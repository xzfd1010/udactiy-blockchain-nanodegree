/*##########################
##     CONFIGURATION      ##
##########################*/

//  -- Step 1: Set up the appropriate configuration
var Web3 = require("web3")
var EthereumTransaction = require("ethereumjs-tx")
var web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction.
var sendingAddress = '0xE7590cfe02a2Fe2DB4CDeaceF62f1c326d701fd5'
var receivingAddress = '0x774d3E939ec514f5e5C18164c337e46a7Bfa0eF0'

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
##  CREATE A TRANSACTION  ##
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
var rawTransaction = {
    nonce: 4,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 10000000000000000000,
    data: "" // contract account
}

// -- Step 5: View the raw transaction
// rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
##  Sign the Transaction  ##
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
var privateKeySender = 'cb69ae37942357dca6ea8d505e866154c95c19700bed396a80146541616cd1f6'
var privateKeySenderHex = new Buffer(privateKeySender, 'hex')
var transaction = new EthereumTransaction(rawTransaction)
transaction.sign(privateKeySenderHex)

/*#########################################
##  Send the transaction to the network  ##
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);