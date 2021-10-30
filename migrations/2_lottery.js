const LotteryResult = artifacts.require("LotteryResult");
const BaseLottery = artifacts.require("BaseLottery");
module.exports = function(deployer) {
    deployer.deploy(BaseLottery);
    deployer.deploy(LotteryResult);
}