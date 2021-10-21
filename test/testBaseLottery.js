var BaseLottery = artifacts.require("./BaseLottery.sol");

contract("BaseLottery", function(accounts) {
    var baseLotteryInstance;
    var ticketNumber;
    var ticketPrice;
    //test buy ticket function
    it("Buy ticket successfully", function() {
        return BaseLottery.deployed().then((instance) => {
            baseLotteryInstance = instance;
            ticketNumber = 12456;
            return baseLotteryInstance.ticketPrice();
        }).then((price) => {
            price = price.toNumber();
            ticketPrice = price;
            return baseLotteryInstance.buyTicket(ticketNumber, { value: price.toString(), from: accounts[0] });
        }).then(() => {
            return baseLotteryInstance.playersCount();
        }).then((count) => {
            return baseLotteryInstance.playersMap(count.toNumber());
        }).then((player) => {
            assert.equal(player[0].toNumber(), ticketNumber, "correct ticket");
            assert.equal(player[1], accounts[0], "correct ticket");
            return baseLotteryInstance.buyTicket(ticketNumber, { value: ticketPrice.toString(), from: accounts[1] });
        }).then(() => {
            return baseLotteryInstance.playersCount();
        }).then((count) => {
            assert.equal(2, count.toNumber(), "correct players count");
            return baseLotteryInstance.todaysPrize();
        }).then((prize) => {
            assert.equal(ticketPrice * 2, prize.toNumber(), "correct today's prize");
        });
    });
});