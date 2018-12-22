const SHA256 = require('crypto-js/SHA256')

const data1 = 'Blockchain Rock!'
const dataObject = {
    id: 1,
    body: 'With Object Works too',
    time: new Date().getTime().toString().slice(0, -3)
}

function generateHash (obj) {
    return SHA256(JSON.stringify(obj)).toString()
}

console.log('data1', generateHash(data1))
console.log('dataObject', generateHash(dataObject))