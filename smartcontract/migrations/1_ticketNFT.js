const TicketNFT = artifacts.require("TicketNFT");

module.exports = function(deployer) {

    deployer.deploy(TicketNFT, "1");
}