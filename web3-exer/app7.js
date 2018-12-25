var Web3 = require('web3')

var url = 'https://mainnet.infura.io/v3/c1784a99c49c4878a74cf1f69c4e4daf'

var web3 = new Web3(url)

var address = '0x67fab7fd3bb1d825422081805ef48f0a89cf32a274ad274024250c4a0ae5f515'

var balance
web3.eth.getGasPrice().then(console.log)
web3.eth.getUncle(500, 0).then(console.log);
web3.eth.getBlockTransactionCount(address).then(console.log);
