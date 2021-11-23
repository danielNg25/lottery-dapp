// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseLottery is Ownable {
    event onPrizeChange(uint256 _prize);
    event onNewTicketBought(address player, uint32 ticket);
    event onBalanceUpdate(uint256 _balance, address _wallet);
    // price for 1 ticket
    uint32 public playersCount = 0;
    uint32 internal resultLength = 100;
    uint256 public ticketPrice = 0.001 ether;
    uint256 public todaysPrize = 0;
    mapping(address => uint256) public balances;

    struct Player {
        uint32 ticket;
        address wallet;
    }
    //store all current players
    mapping(uint32 => Player) public playersMap;
    mapping(address => Player) public addressToPlayers;

    //function to buy ticket
    function buyTicket(uint32 _ticket) external payable {
        require(addressToPlayers[msg.sender].wallet == address(0));
        require(_ticket <= 99);
        require(msg.value == ticketPrice);
        playersCount++;
        playersMap[playersCount] = Player(_ticket, msg.sender);
        addressToPlayers[msg.sender] = playersMap[playersCount];
        todaysPrize += (ticketPrice * 99) / 100;
        address _owner = owner();
        addToBalance(_owner, ticketPrice / 100);
        emit onPrizeChange(todaysPrize);
        emit onNewTicketBought(msg.sender, _ticket);
    }

    function getTicketByAddress(address _address)
        external
        view
        returns (uint32)
    {
        if (addressToPlayers[_address].wallet != address(0)) {
            uint32 ticket = addressToPlayers[_address].ticket;
            return ticket;
        }else{
          return resultLength;
        }
    }

    function addToBalance(address _wallet, uint256 _amount) internal {
        balances[_wallet] += _amount;
        emit onBalanceUpdate(balances[_wallet], _wallet);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {}

    receive() external payable {}
}
