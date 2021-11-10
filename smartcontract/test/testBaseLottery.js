const BaseLottery = artifacts.require("./BaseLottery.sol");

contract("BaseLottery", function(accounts) {
    let baseLotteryInstance;
    let ticketNumber = 123456;
    let ticketPrice;
    //test buy ticket function
    before(async () => {
        baseLotteryInstance = await BaseLottery.deployed();
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = baseLotteryInstance.address;
            console.log("Base Lottery", address);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, 0x0);
            assert.notEqual(address, undefined);
        })
    })
   
});