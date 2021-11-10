var LotteryResult = artifacts.require("./LotteryResult.sol");
contract("LotteryResult", function(accounts) {
    var lotteryResultInstance;
    var ticketNumber_1 = 654321;
    var ticketNumber_2 = 123456;
    var ticketPrice;
    it("Return correct ticket result", () => {
        return LotteryResult.deployed().then(instance => {
            lotteryResultInstance = instance;
            return lotteryResultInstance.ticketPrice();
        }).then((price) => {
            ticketPrice = price.toNumber();
            return lotteryResultInstance.buyTicket(ticketNumber_1, { value: ticketPrice, from: accounts[0] });
        }).then(() => {
            return lotteryResultInstance.buyTicket(ticketNumber_2, { value: ticketPrice, from: accounts[1] });
        }).then(() => {
            return lotteryResultInstance.setResult(ticketNumber_2, { from: accounts[0] });
        }).then(() => {
            return lotteryResultInstance.lastResult();
        }).then((result) => {
            assert.equal(result, ticketNumber_2, "ticket result is correct");
            return lotteryResultInstance.winnersCount();
        }).then((count) => {
            assert.equal(count, 1, "the number of winners is correct");
            return lotteryResultInstance.balances(accounts[0]);
        }).then((balance) => {
            //should change the 20 when change contract owner's rate
            assert.equal(balance.toNumber(), ticketPrice * 2 / 20, "contract owner ger the correct balance");
            return lotteryResultInstance.balances(accounts[1]);
        }).then((balance) => {
            assert.equal(balance.toNumber(), ticketPrice * 2 * 19 / 20, "the winner ger the correct balance");
        });
    });

    it("Withdraw successfully", () => {
        return LotteryResult.deployed().then(instance => {
            lotteryResultInstance = instance;
            return lotteryResultInstance.buyTicket(ticketNumber_1, { value: ticketPrice, from: accounts[0] });
        }).then(() => {
            return lotteryResultInstance.setResult(ticketNumber_1, { from: accounts[0] });
        }).then(() => {
            return lotteryResultInstance.withdraw(ticketPrice, { from: accounts[0] });
        }).then((sent) => {
            assert(sent, true, "Withdraw successfully!");
        })
    })
})