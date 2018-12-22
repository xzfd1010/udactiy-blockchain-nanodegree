const SHA256 = require('crypto-js/sha256')
const BlockClass = require('./Block.js')

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app
     */
    constructor (app) {
        this.app = app
        this.blocks = []
        this.initializeMockData()
        this.getBlockByIndex()
        this.postNewBlock()
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex () {
        this.app.get('/block/:index', (req, res) => {
            // Add your code here
            const index = req.params.index
            const block = index < this.blocks.length ? this.blocks[index] : 'Not Found'
            res.send(JSON.stringify(block))
        })
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock () {
        this.app.post('/block', (req, res) => {
            // Add your code here
            if (this.blocks.length === 0) {
                let block = new BlockClass.Block('First block in the chain - Genesis block')
            }
            if (req.body.content) {
                let block = new BlockClass.Block(req.body.content)
                block.height = this.blocks.length
                block.hash = SHA256(JSON.stringify(block)).toString()
                this.blocks.push(block)
                res.json(block)
            } else {
                res.send('please add content in post body')
            }
        })
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData () {
        if (this.blocks.length === 0) {
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`)
                blockAux.height = index
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString()
                this.blocks.push(blockAux)
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => { return new BlockController(app)}