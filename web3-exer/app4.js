var Web3 = require('web3')

var url = 'HTTP://127.0.0.1:7545' // connect to ganache

var web3 = new Web3(url)

var address = '0x31b98d14007bdee637298086988a0bbd31184523'

var balance
// web3.eth.getAccounts().then(accounts => console.log(accounts)) // 读取所有账户
web3.eth.getAccounts().then(accounts => console.log(accounts[0])) // 读取所有账户

