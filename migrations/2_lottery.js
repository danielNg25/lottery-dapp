const BaseLottery = artifacts.require("BaseLottery");

module.exports = function (deployer){
    deployer.deploy(BaseLottery);
}