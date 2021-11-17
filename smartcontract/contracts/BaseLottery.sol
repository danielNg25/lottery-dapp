// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../contracts/Ownable.sol";

contract BaseLottery is Ownable{

    event onPrizeChange(uint _prize);

    // price for 1 ticket
    uint32 public playersCount = 0;
    uint public ticketPrice = 0.001 ether;
    uint public todaysPrize = 0;
    

    struct Player{
        uint32 ticket;
        address wallet;
    }
    //store all current players
    mapping (uint32 => Player) public playersMap;
    
    //function to buy ticket
    function buyTicket(uint32 _ticket) external payable{
        require(_ticket >= 10000 && _ticket <= 999999);
        require(msg.value == ticketPrice);
        playersCount++;
        playersMap[playersCount] = Player(_ticket, msg.sender);
        todaysPrize += ticketPrice;

        emit onPrizeChange(todaysPrize);
    }

    //get Pirze
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {}
    receive() external payable {}
}