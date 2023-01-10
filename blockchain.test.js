const Blockchain = require('./blockchain');
const Block = require('./block');


describe('Blockchain', () => {
     
     // const blockchain = new Blockchain();
     let  blockchain, newChain;
     beforeEach( () => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
     });


     it('contains a `chain` array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
     });

     it('starts with genesis block', () => {
         expect(blockchain.chain[0]).toEqual(Block.genesis());
     });

     it('adds new block to the chain', () => {
      const newData = 'foo bar';
      blockchain.addBlock({data: newData});

      expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
     });

     describe('isValidChain()', () => {
        // when the chain does not started with genesis block
        describe('when the chain does not started with genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};

                // here we called "Blockchain" class itself instead of instance "blockchain"
                //  because "isValidChain" is static method
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false); 

            });
        });

        // when chain does start with genesis block and has multiple blocks
        describe('when chain does start with genesis block and has multiple blocks', () => {
            beforeEach(()=> {
                blockchain.addBlock({data: 'Bears'});
                blockchain.addBlock({data: 'Beets'});
                blockchain.addBlock({data: 'Battlestar Galactica'});
            });


            describe ('and a LastHash reference has changed', () =>{
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with invalid field', () =>{
                it('returns false', () => {
                    blockchain.chain[2].data = 'some-bad-and-evil-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and chain does not contain any invalid blocks', ()=>{
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });



     });

     describe('replaceChain()', () => {
        describe('when the chain is not longer', () =>{
            it
        });
     });
});