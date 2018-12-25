var Web3 = require('web3')

var url = 'HTTP://127.0.0.1:7545' // connect to ganache

var web3 = new Web3(url)

var address = '0xE7590cfe02a2Fe2DB4CDeaceF62f1c326d701fd5'

var balance
// web3.eth.getAccounts().then(accounts => console.log(accounts)) // 读取所有账户
web3.eth.getTransactionCount(address).then(console.log) // 读取所有账户

