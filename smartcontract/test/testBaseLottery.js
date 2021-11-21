const BaseLottery = artifacts.require("./BaseLottery.sol");

contract("BaseLottery", function(accounts) {
    let baseLotteryInstance;
    let ticketNumber = 12;
    let ticketPrice;
    //test buy ticket function
    before(async() => {
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
        });
    });

    describe('buy tickets', async() => {
        it('Buy ticket successfully', async() => {
                ticketPrice = await baseLotteryInstance.ticketPrice();
                ticketPrice = ticketPrice.toNumber();
                await baseLotteryInstance.buyTicket(ticketNumber, { value: ticketPrice.toString(), from: accounts[0] });
                let playersCount = await baseLotteryInstance.playersCount();
                assert.equal(playersCount.toNumber(), 1, 'correct players count');

                let player = await baseLotteryInstance.playersMap(playersCount.toNumber());
                assert.equal(player[0].toNumber(), ticketNumber, 'correct ticket number');
                assert.equal(player[1], accounts[0], `correct player's address`);
            }),

            it('Update ticket prize successfully', async() => {
                let prize = await baseLotteryInstance.todaysPrize();
                assert.equal(prize.toNumber(), ticketPrice * 99 / 100, 'correct ticket prize');

                await baseLotteryInstance.buyTicket(ticketNumber, { value: ticketPrice.toString(), from: accounts[1] });
                await baseLotteryInstance.buyTicket(ticketNumber, { value: ticketPrice.toString(), from: accounts[2] });

                prize = await baseLotteryInstance.todaysPrize();
                assert.equal(prize.toNumber(), ticketPrice * 3 * 99 / 100, 'correct ticket prize');
            });
    });
});