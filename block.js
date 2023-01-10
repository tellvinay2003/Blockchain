const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timeStamp, lastHash, hash, data}){
      this.timeStamp = timeStamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;

     }

     // a factory method creating instance of class without directly using it's CTor
     static genesis() {
       // return new Block(GENESIS_DATA);
       return new this(GENESIS_DATA);
     }

     static mineBlock({lastBlock, data}){
      const timeStamp = Date.now();
      const lastHash = lastBlock.hash;

      return new this({
        timeStamp,
        lastHash,
        data,
        hash: cryptoHash(timeStamp, lastHash, data)
      });
     }
}

// share this class with other modules
module.exports = Block;


// const block1 = new Block({
//     timeStamp: '01/01/0101', 
//     lastHash:'foo-lastHash', 
//     hash:'foo-hash',
//     data: 'foo-data'
// });

// console.log('block1', block1);