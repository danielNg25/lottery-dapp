const Store = artifacts.require("./Store.sol");
const TicketNFT = artifacts.require("./TicketNFT");
contract("Store", function(accounts) {
    let storeIntance;
    let ticketNumber_1 = 1;
    let ticketNumber_2 = 2;
    let ticketPrice;
    let NFTTokenIntance;
    let ticketNFTAddress;
    before(async() => {
        storeIntance = await Store.deployed();
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = storeIntance.address;
            console.log("Store", address);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, 0x0);
            assert.notEqual(address, undefined);
        });
    });

    describe('First time start', async() => {
        it('create ticket token successfully', async() => {
            await storeIntance.firstTimeSetUp();
            ticketNFTAddress = await storeIntance.ticketNFT();
            assert.notEqual(ticketNFTAddress, 0x0);
            assert.notEqual(ticketNFTAddress, undefined);
            assert.notEqual(ticketNFTAddress, null);
            ticketNFTAddress = await storeIntance.timesToNFTAddress(1);
            assert.notEqual(ticketNFTAddress, 0x0);
            assert.notEqual(ticketNFTAddress, undefined);
            assert.notEqual(ticketNFTAddress, null);
        })
    })

    describe('Buy ticket ', async() => {
        it('Buy successfully', async() => {
            ticketPrice = await storeIntance.ticketPrice();
            await storeIntance.buyTicket(ticketNumber_1, { value: ticketPrice.toString(), from: accounts[0] });
            await storeIntance.buyTicket(ticketNumber_2, { value: ticketPrice.toString(), from: accounts[1] });
            NFTTokenIntance = await TicketNFT.at(ticketNFTAddress.toString());

            let playersCount = await NFTTokenIntance.tokenId();
            assert.equal(playersCount, 2, 'correct players count');

            let player_1 = await NFTTokenIntance.idToPlayer(1);
            assert.equal(player_1[1], ticketNumber_1, 'correct ticket number');
            assert.equal(player_1[0], accounts[0], `correct player's address`)
        })

        it('Update ticket prize successfully', async() => {
            let prize = await storeIntance.todaysPrize();
            assert.equal(prize, ticketPrice * 2 * 99 / 100, 'correct ticket prize')
        })

        it('Return correct owner balance', async() => {
            let ownerBalance = await storeIntance.balances(accounts[0]);
            assert.equal(ownerBalance, ticketPrice * 2 / 100, 'contract owner gets the correct balance');
        })
    })

    describe('Check ticket result', async() => {
        it('Set ticket result successful', async() => {
            await storeIntance.setResult();
            let result = await NFTTokenIntance.result();
            assert.notEqual(result, null);
            assert.notEqual(result, undefined);
            console.log(result);

            let ended = await NFTTokenIntance.ended();
            assert.equal(ended, true, 'lottery time has ended');
        })

    });

    describe('Check withdraw', async() => {
        it('Withdraw successfully', async() => {
            let contractBalance = await storeIntance.getBalance();
            assert.equal(contractBalance, ticketPrice * 2, 'contract balance is correct');

            let ownerBalance = await storeIntance.balances(accounts[0]);

            let sent = await storeIntance.withdraw(ownerBalance, { from: accounts[0] });
            assert(sent, true, "Sent transaction successfully!");

            ownerBalance = await storeIntance.balances(accounts[0]);
            assert.equal(ownerBalance, 0, 'withdraw successfully');
        });
    });


})