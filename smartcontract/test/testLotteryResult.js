const LotteryResult = artifacts.require("./LotteryResult.sol");
contract("LotteryResult", function(accounts) {
    let lotteryResultInstance;
    let ticketNumber_1 = 65;
    let ticketNumber_2 = 12;
    let ticketPrice;

    before(async() => {
        lotteryResultInstance = await LotteryResult.deployed()
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = lotteryResultInstance.address;
            console.log("Lottery Result", address);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, 0x0);
            assert.notEqual(address, undefined);
        });
    });

    describe('Check ticket result', async() => {
        it('Set ticket result successful', async() => {
                ticketPrice = await lotteryResultInstance.ticketPrice();
                ticketPrice = ticketPrice.toNumber();
                await lotteryResultInstance.buyTicket(ticketNumber_1, { value: ticketPrice, from: accounts[1] });
                await lotteryResultInstance.buyTicket(ticketNumber_2, { value: ticketPrice, from: accounts[2] });
                await lotteryResultInstance.setResult();

                let result = await lotteryResultInstance.lastResult();
                result = result.toNumber();
                assert.notEqual(result, 0);
                assert.notEqual(result, null);
                assert.notEqual(result, undefined);
                console.log(result);

            }),
            it('Return correct balance', async() => {

                let ownerBalance = await lotteryResultInstance.balances(accounts[0]);
                ownerBalance = ownerBalance.toNumber();
                assert.equal(ownerBalance, ticketPrice * 2 / 100, 'contract owner gets the correct balance');
            });
    });

    describe('Check withdraw', async() => {
        it('Withdraw successfully', async() => {
            let contractBalance = await lotteryResultInstance.getBalance();
            contractBalance = contractBalance.toNumber();
            assert.equal(contractBalance, ticketPrice * 2, 'contract balance is correct');

            let sent = await lotteryResultInstance.withdraw(ticketPrice * 2 / 100, { from: accounts[0] });
            assert(sent, true, "Sent transaction successfully!");

            contractBalance = await lotteryResultInstance.getBalance();
            contractBalance = contractBalance.toNumber();
            assert.equal(contractBalance, ticketPrice * 2 * 99 / 100, 'contract balance is correct');
        });
    });
})