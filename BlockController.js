const SHA256 = require('crypto-js/sha256');
const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');



/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        // this.blocks = [];
        // this.initializeMockData();
        this.myBlockChain = new BlockChain.Blockchain();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        let self = this;
        this.app.get("/block/:index", (req, res) => {
            let index = req.params.index
            console.log("Getting block for index: " + index)
            /* if(index < 0 || index >= this.blocks.length) {
                res.send("Invalid block height")
            } else {
                // let block = JSON.stringify(this.blocks[index])
                let block = this.blocks[index]
                console.log("Block block: " + block)
                res.send(block)
            } */

            // this serves as an optimization as we dont even
            // query the DB if index of the block to GET is -ve.
            if(index < 0) {
                res.send("Invalid block height. Cannot be negative")
            } else {
                self.myBlockChain.getBlockHeight().then((height) => {
                    console.log("height of the chain: " + height);
                    if(index > height) {
                        res.send("Invalid block height")
                    } else {
                        self.myBlockChain.getBlock(index).then((block) => {
                            let blockJson = JSON.parse(block);
                            res.send(200, blockJson)
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        let self = this
        self.app.post("/block", (req, res) => {
            let block = req.body
            console.log("req.body: " + JSON.stringify(block))

            // if(block.body == "") {
            if (typeof block.body === 'undefined'
                || !block.body) {
                res.send("No data for block. block.body: " + block.body)
            } else {
                let newHeight = self.blocks.length
                block.height = newHeight
                block.time = new Date().getTime()
                block.hash = SHA256(JSON.stringify(block)).toString()
                if(newHeight != 0) {
                    block.previousBlockHash = self.blocks[newHeight-1].hash
                } else {
                    block.previousBlockHash = ""
                }
                
                console.log("Block before adding to chain: block " + JSON.stringify(block))
                self.blocks.push(block)
                res.send(201, block)
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0) {
            for (let index = 0; index < 10; index++) {
                let blockAux = ""

                if(index == 0) {
                    blockAux = new BlockClass.Block(`First block in the chain - Genesis block`)
                } else {
                    blockAux = new BlockClass.Block(`Test Data #${index}`)
                }

                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}