// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../contracts/BaseLottery.sol";

contract LotteryResult is BaseLottery {
    uint256 public lastPrize = 0;
    uint32 public lastResult;
    uint32 public winnersCount = 0;

    //save all last winners
    mapping(uint32 => Player) public winnersMap;

    //set the ticket result by the contract owner
    function setResult() external onlyOwner {
        lastResult = getRandomNumber(resultLength);
        processPrize();
        addPrizeToWallet();
        playersCount = 0;
    }

    //get account's balance
    function getAccountBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    //find the winners
    function processPrize() private {
        winnersCount = 0;
        for (uint32 i = 1; i <= playersCount; i++) {
            if (playersMap[i].ticket == lastResult) {
                winnersCount++;
                winnersMap[winnersCount] = playersMap[i];
            }
        }
    }

    //send prize money to the winners
    function addPrizeToWallet() private {
        //send fee to the owner

        //send fee to the winners
        if (winnersCount > 0) {
            uint256 _prizeValue = todaysPrize / winnersCount;
            for (uint32 i = 1; i <= winnersCount; i++) {
                addToBalance(winnersMap[winnersCount].wallet, _prizeValue);
            }
            lastPrize = todaysPrize;
            todaysPrize = 0;
        }
    }

    function withdraw(uint256 _amount) public returns (bool) {
        require(balances[msg.sender] >= _amount);
        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        if (sent) {
            balances[msg.sender] -= _amount;
            emit onBalanceUpdate(balances[msg.sender], msg.sender);
        }
        return sent;
    }

    function getRandomNumber(uint32 _number) public view returns (uint32) {
        return
            uint32(
                uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.difficulty)
                    )
                ) % _number
            );
    }
}
