// convert wei to ether
var Web3 = require('web3')

var url = 'https://mainnet.infura.io/v3/c1784a99c49c4878a74cf1f69c4e4daf'

var web3 = new Web3(url)

var address = '0xdc76cd25977e0a5ae17155770273ad58648900d3'

var balance
web3.eth.getBalance(address, (err, bal) => {
    balance = bal
    console.log(balance)
    console.log('ether', web3.utils.fromWei(balance, 'ether'))
})

web3.eth.getTransactionCount(address).then(console.log)

