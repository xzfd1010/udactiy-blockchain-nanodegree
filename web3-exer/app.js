var Web3 = require('web3')

var url = 'https://mainnet.infura.io/v3/c1784a99c49c4878a74cf1f69c4e4daf'

var web3 = new Web3(url)

var address = '0x31b98d14007bdee637298086988a0bbd31184523'

var balance
web3.eth.getBalance(address, (err, bal) => {
    balance = bal
    console.log(balance)
})

