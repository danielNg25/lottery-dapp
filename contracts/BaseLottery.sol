// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;

import "../contracts/Ownable.sol";

contract BaseLottery is Ownable{
    // price for 1 ticket
    uint public ticketPrice = 0.001 ether;
    // percent of ticket price the owner will receive
    uint ticketFee = 5;

    struct Player{
        uint id;
        address wallet;
        uint ticket;
    }
    //store all current players
    mapping (uint => Player) public playersMap;
    uint public playersCount;
    

    

    function buyTicket(uint _ticket) external payable{
        require(msg.value == ticketPrice);
        playersCount++;
        playersMap[playersCount] = Player(playersCount, msg.sender, _ticket);
    }

    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {}
    receive() external payable {}
}