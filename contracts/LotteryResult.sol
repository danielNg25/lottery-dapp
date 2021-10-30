// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;

import "../contracts/BaseLottery.sol";

contract LotteryResult is BaseLottery{

    event onBalanceUpdate(uint _balance, address _wallet);

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

    //get account's balance
    function getAccountBalance() public view returns(uint){
        return balances[msg.sender];
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
        addToBalance(_owner, todaysPrize/20);
        //send fee to the winners
        uint _prizeValue = (todaysPrize-todaysPrize/20)/winnersCount;
        for(uint32 i =1; i <= winnersCount; i++){
            addToBalance(winnersMap[winnersCount].wallet, _prizeValue);
        }
    }

    function addToBalance(address _wallet, uint _amount) private{
        balances[_wallet] += _amount;
        emit onBalanceUpdate(balances[_wallet], _wallet);
    }

    function withdraw(uint _amount) public returns(bool){
        require(balances[msg.sender] >= _amount);
        (bool sent,) = payable(msg.sender).call{value: _amount}("");
        if(sent){
            balances[msg.sender] -= _amount;
            emit onBalanceUpdate(balances[msg.sender], msg.sender);
        }
        return sent;
    }

}