/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256')
const LevelSandbox = require('./LevelSandbox.js')
const Block = require('./Block.js').Block

class Blockchain {

    constructor () {
        this.bd = new LevelSandbox.LevelSandbox()
        this.generateGenesisBlock()
    }

    // Auxiliar method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock () {
        // Add your code here
        this.getBlockHeight().then(height => {
            if (height === -1) this.addBlock(new Block('Genesis Block')).then(() => {console.log('Genesis block stored')})
        })
    }

    // Get block height, it is auxiliar method that return the height of the blockchain
    getBlockHeight () {
        // Add your code here
        // height starts from 0，length starts from 1
        return new Promise((resolve, reject) => {
            let height = -1
            this.bd.db.createReadStream().on('data', (data) => {
                height++
            }).on('error', (err) => {
                console.log('Unable to read data stream!', err)
                reject(err)
            }).on('close', () => {
                // console.log('Blockchain height is #' + height) // DEBUG
                resolve(height)
            })
        })
    }

    // Add new block
    async addBlock (newBlock) {
        // Add your code here
        let previousBlockHeight = parseInt(await this.getBlockHeight())
        newBlock.height = previousBlockHeight + 1
        newBlock.time = new Date().getTime().toString().slice(0, -3)
        if (newBlock.height > 0) { // 必达条件
            let previousBlock = await this.getBlock(previousBlockHeight)
            newBlock.previousBlockHash = previousBlock.hash
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()

        // 存的时候，key是height
        await this.bd.addLevelDBData(newBlock.height, JSON.stringify(newBlock))
        return JSON.stringify(newBlock)
    }

    // Get Block By Height
    async getBlock (height) {
        // Add your code here
        return JSON.parse(await this.bd.getLevelDBData(height))
    }

    // Validate if Block is being tampered by Block Height
    async validateBlock (height) {
        // Add your code hereasync validateBlock (blockHeight) {
        // get block object
        let block = await this.getBlock(height)
        // get block hash
        let blockHash = block.hash
        // remove block hash to test block integrity
        block.hash = ''

        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString()

        // Compare
        if (blockHash === validBlockHash) {
            // return true if block is valid
            return true
        } else {
            console.log('Block #' + height + ' invalid hash:\n' + blockHash + '<>' + validBlockHash)
            return false
        }
    }

    // Validate Blockchain
    async validateChain () {
        // Add your code here
        let errorLog = []
        let blockChainHeight = await this.getBlockHeight()

        for (let i = 0; i < blockChainHeight; i++) {
            // validate a single block
            if (!this.validateBlock(i)) errorLog.push(i)

            // compare blocks hash link
            let blockHash = this.getBlock(i).hash
            let previousHash = this.getBlock(i + 1).previousBlockHash
            if (blockHash !== previousHash) {
                errorLog.push(i)
            }

        }

        if (errorLog.length > 0) {
            console.log('Block errors = ' + errorLog.length)
            console.log('Blocks: ' + errorLog)
        } else {
            console.log('No errors detected')
        }
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock (height, block) {
        return new Promise((resolve, reject) => {
            this.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    }

}

module.exports.Blockchain = Blockchain