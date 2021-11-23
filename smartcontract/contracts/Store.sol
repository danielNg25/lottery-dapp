// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./TicketNFT.sol";

contract Store is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    event onPrizeChange(uint256 _prize);
    event onNewTicketBought(address player, uint32 ticket);
    event onBalanceUpdate(uint256 _balance, address _wallet);

    uint8 internal ticketSize;
    uint256 public ticketPrice;
    uint256 public todaysPrize;
    uint256 public lotteryTimes;


    TicketNFT public ticketNFT;

    mapping(address => uint256) public balances;
    mapping(uint256 => address) public timesToNFTAddress;

    modifier hasNotPlayed(address _address) {
        require(!ticketNFT.hasPlayed(msg.sender));
        _;
    }

    constructor() Ownable() {
        ticketSize = 5;
        ticketPrice = 0.001 ether;
        todaysPrize = 0;
        lotteryTimes = 0;
    }

    function buyTicket(uint8 _ticket)
        external
        payable
        hasNotPlayed(msg.sender)
        nonReentrant
    {
        require(_ticket < ticketSize);
        require(msg.value == ticketPrice);

        ticketNFT.mint(msg.sender, _ticket);

        todaysPrize = todaysPrize.add((ticketPrice.mul(99)).div(100));
        address _owner = owner();
        addToBalance(_owner, ticketPrice.div(100));
        emit onPrizeChange(todaysPrize);
        emit onNewTicketBought(msg.sender, _ticket);
    }

    function addToBalance(address _wallet, uint256 _amount) internal {
        balances[_wallet] = balances[_wallet].add(_amount);
        emit onBalanceUpdate(balances[_wallet], _wallet);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getTicketByAddress(address _address)
        external
        view
        returns (uint8)
    {
        return ticketNFT.getTicketByAddress(_address);
    }

    function getRandomNumber(uint8 _number) public view returns (uint8) {
        return
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.difficulty)
                    )
                ) % _number
            );
    }

    function setResult() external onlyOwner {
        uint8 _result = getRandomNumber(ticketSize);
        uint256 _winnersCount = ticketNFT.setResult(_result);
        addPrizeToWallet(_winnersCount);
        setUpNewTime();
    }

    function addPrizeToWallet(uint256 _winnersCount) private {
        if (_winnersCount > 0) {
            uint256 _prizeValue = todaysPrize.div(_winnersCount);
            ticketNFT.setPrize(_prizeValue);
            for (uint256 i = 1; i <= _winnersCount; i = i.add(1)) {
                address _winnerAddress = ticketNFT.getWinnerAddressByIndex(i);
                addToBalance(_winnerAddress, _prizeValue);
            }
            todaysPrize = 0;
        }
    }

    function setUpNewTime() private{
        lotteryTimes = lotteryTimes.add(1);
        ticketNFT = new TicketNFT(lotteryTimes);
        timesToNFTAddress[lotteryTimes] = address(ticketNFT);
    }

    function firstTimeSetUp() external onlyOwner{
        require(address(ticketNFT) == address(0));
        setUpNewTime();
    }

    function withdraw(uint256 _amount) public nonReentrant returns (bool) {
        require(balances[msg.sender] >= _amount);
        bool sent = payable(msg.sender).send(_amount);
        if (sent) {
            balances[msg.sender] = balances[msg.sender].sub(_amount);
            emit onBalanceUpdate(balances[msg.sender], msg.sender);
        }
        return sent;
    }

    function getTicketNFTAddressByTime(uint256 _time)
        external
        view
        returns (address)
    {
        return timesToNFTAddress[_time];
    }

    fallback() external payable {}

    receive() external payable {}
}
