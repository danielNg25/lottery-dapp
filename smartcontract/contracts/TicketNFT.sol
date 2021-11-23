// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TicketNFT is Ownable, ERC721, ReentrancyGuard {
    using SafeMath for uint256;

    bool public ended;

    uint8 private ticketSize;
    uint8 public result;

    uint256 public lotteryTime;
    uint256 public tokenId;
    uint256 public winnersCount;
    uint256 public prize;

    struct Player {
        address wallet;
        uint8 ticket;
        bool isWinner;
    }

    mapping(uint256 => Player) public idToPlayer;
    mapping(address => uint256) public addressToId;
    mapping(uint256 => uint256) public winnersMapId;

    modifier notEnded() {
        require(!ended);
        _;
    }

    constructor( uint256 _times)
        ERC721("NDTLottery", "NDT")
        Ownable()
    {
        ticketSize = 5;
        lotteryTime = _times;
    }

    function mint(address _playerAddress, uint8 ticket)
        external
        onlyOwner
        nonReentrant
        notEnded
    {
        require(!hasPlayed(_playerAddress));
        require(_playerAddress != address(0));
        require(ticket < ticketSize);

        tokenId = tokenId.add(1);
        idToPlayer[tokenId] = Player(_playerAddress, ticket, false);
        addressToId[_playerAddress] = tokenId;

        _safeMint(_playerAddress, tokenId);
    }

    function getTicketByAddress(address _address)
        external
        view
        returns (uint8)
    {
        if (hasPlayed(_address)) {
            return idToPlayer[addressToId[_address]].ticket;
        }
        return ticketSize;
    }

    function hasPlayed(address _address) public view returns (bool) {
        if (idToPlayer[addressToId[_address]].wallet != address(0)) {
            return true;
        }
        return false;
    }

    function setResult(uint8 _result) external notEnded onlyOwner returns(uint256){
        result = _result;
        processPrize();
        return winnersCount;
    }

    function processPrize() notEnded internal {
        if (tokenId > 0) {
            for (uint256 i = 1; i <= tokenId; i = i.add(1)) {
                if(idToPlayer[i].ticket == result){
                    winnersCount = winnersCount.add(1);
                    idToPlayer[i].isWinner = true;
                    winnersMapId[winnersCount] = i;
                }
            }
        }
        ended = true;
    }
    
    function setPrize(uint256 _prize) onlyOwner external {
        require(ended == true);
        prize = _prize;
    }

    function getWinnerAddressByIndex(uint256 _index) view external returns(address){
        return idToPlayer[winnersMapId[_index]].wallet;
    }
}
