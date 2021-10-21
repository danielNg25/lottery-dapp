// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;

import "../contracts/BaseLottery.sol";

contract LotteryResult is BaseLottery{
    uint32 public lastResult;
    uint32 public winnersCount = 0;
    //save all last winners
    mapping (uint32 => Player) public winnersMap;
    mapping (address => uint) public balances;
    //set the ticket result by the contract owner
    function setResult(uint32 _result) external onlyOwner{
        lastResult = _result;
        processPrize(_result);
        addPrizeToWallet();
        playersCount = 0;
        todaysPrize = 0;
    }

    //find the winners
    function processPrize(uint32 _result) private {
        winnersCount = 0;
        for(uint32 i = 1; i <= playersCount; i++){
            if(playersMap[i].ticket == _result){
                winnersCount ++;
                winnersMap[winnersCount] = playersMap[i];
            }
        }
    }

    //send prize money to the winners
    function addPrizeToWallet() private{
        //send fee to the owner
        address _owner = owner();
        balances[_owner] += todaysPrize/20;
        //send fee to the winners
        uint _prizeValue = (todaysPrize-todaysPrize/20)/winnersCount;
        for(uint32 i =1; i <= winnersCount; i++){
            balances[winnersMap[winnersCount].wallet]+= _prizeValue;
        }

    }

    function withdraw(uint amount) public returns(bool){
        require(balances[msg.sender] >= amount);
        (bool sent,) = payable(msg.sender).call{value: amount}("");
        return sent;
    }

}