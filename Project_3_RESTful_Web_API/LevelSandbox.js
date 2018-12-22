/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level')
const chainDB = './chaindata' // location

class LevelSandbox {

    constructor () {
        this.db = level(chainDB)
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData (key) {
        return new Promise((resolve, reject) => {
            // Add your code here, remember un Promises you need to resolve() or reject()
            this.db.get(key, (err, value) => {
                if (err) {
                    console.log('Not found!', err)
                    reject(err)
                } else {
                    // console.log('Value = ' + value)  // DEBUG
                    resolve(value)
                }
            })
        })
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData (key, value) {
        return new Promise((resolve, reject) => {
            // Add your code here, remember un Promises you need to resolve() or reject()
            this.db.put(key, value, (err) => {
                if (err) {
                    console.log('Block ' + key + ' submission failed', err)
                    reject(err)
                }
                else {
                    console.log('Block #' + key + ' stored')
                    resolve(value)
                }
            })
        })
    }

    // Method that return the height
    getBlocksCount () {
        return new Promise((resolve, reject) => {
            // Add your code here, remember un Promises you need to resolve() or reject()
            let count = 0
            this.db.createReadStream().on('data', (data) => {
                count++
            }).on('error', (err) => {
                console.log('Unable to read data stream!', err)
                reject(err)
            }).on('close', () => {
                resolve(count)
            })
        })
    }

}

module.exports.LevelSandbox = LevelSandbox