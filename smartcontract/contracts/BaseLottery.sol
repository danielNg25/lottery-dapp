// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../contracts/Ownable.sol";

contract BaseLottery is Ownable {
  event onPrizeChange(uint256 _prize);
  event onNewTicketBought(address player, uint32 ticket);
  event onBalanceUpdate(uint256 _balance, address _wallet);
  // price for 1 ticket
  uint32 public playersCount = 0;
  uint256 public ticketPrice = 0.001 ether;
  uint256 public todaysPrize = 0;
  mapping(address => uint256) public balances;

  struct Player {
    uint32 ticket;
    address wallet;
  }
  //store all current players
  mapping(uint32 => Player) public playersMap;

  //function to buy ticket
  function buyTicket(uint32 _ticket) external payable {
    require(_ticket >= 10000 && _ticket <= 999999);
    require(msg.value == ticketPrice);
    playersCount++;
    playersMap[playersCount] = Player(_ticket, msg.sender);
    todaysPrize += ticketPrice;
    address _owner = owner();
    addToBalance(_owner, ticketPrice / 100);
    emit onPrizeChange(todaysPrize);
    emit onNewTicketBought(msg.sender, _ticket);
  }

  function addToBalance(address _wallet, uint256 _amount) internal {
    balances[_wallet] += _amount;
    emit onBalanceUpdate(balances[_wallet], _wallet);
  }

  //get Pirze
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  fallback() external payable {}

  receive() external payable {}
}
