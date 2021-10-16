var BaseLottery = artifacts.require("./BaseLottery.sol");

contract("BaseLottery", function(accounts){
    var baseLotteryInstance;
    var ticketNumber;

    //test buy ticket function
    it("Buy ticket successfully", function(){
        return BaseLottery.deployed().then(function(instance){
            baseLotteryInstance = instance;
            ticketNumber = 12456;
            return  baseLotteryInstance.ticketPrice();
        }).then(function(price){
            price = price.toNumber();
            return baseLotteryInstance.buyTicket(ticketNumber, {value: price.toString()});          
        }).then(function(){
            return baseLotteryInstance.playersCount();
        }).then(function(count){
            return baseLotteryInstance.playersMap(count.toNumber());
        }).then(function(player){            
            assert.equal(player[2].toNumber(), ticketNumber, "correct ticket");
            assert.equal(player[1], accounts[0], "correct ticket");
        });
    });
});