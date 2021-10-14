// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BaseLottery{
    struct Player{
        uint id;
        address wallet;
        uint ticket;
    }
    //store all current players
    mapping (uint => Player) playersMap;
    
    uint Balance;


}