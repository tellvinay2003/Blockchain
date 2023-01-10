const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe('Block', () => {
    const timeStamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    // const Block = new Block({
    //      timeStamp : timeStamp,
    //      lastHash: lastHash,
    //      hash: hash,
    //      data: data
    // });   
    
    const block = new Block({timeStamp, lastHash, hash, data});


    // assert
    it('has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        console.log('genesisBlock', genesisBlock);

        it('returns a block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA); 
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock, data}); 

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        // check minedBlock's lastHash to be = to hash of lastBlock
        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        // check the data
        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        // check for timestamp
        it('sets the `timeStamp`', () => {
            expect(minedBlock.timeStamp).not.toEqual(undefined);    
        });

        it('creates a sha-256 `hash` based on the proper inputs', () =>{
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp, lastBlock.hash, data));    
        });

    });
});