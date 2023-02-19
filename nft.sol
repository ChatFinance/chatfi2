// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Main is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address owner;

    // config
    uint32 supplyTotal = 10000;
    uint MintOneForUser = 0.009 ether;
    uint MintOneForWl = 0 ether;

    uint startTime;

    // contract and token
    string public contractURI;
    string baseURI;

    mapping(address => uint8) userHasMint;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _contranctURI,
        string memory _baseURI,
        uint _startTime
    ) ERC721(_name, _symbol) {
        // init config
        owner = msg.sender;
        contractURI = _contranctURI;
        baseURI = _baseURI;
        startTime = _startTime;

        _tokenIds.increment();
    }

    function mint(address player) private {
        uint tokenId = _tokenIds.current();
        _mint(player, tokenId);
        _tokenIds.increment();
    }

    function mintGuest(uint8 times, bool isWhite) external payable  {
        require(block.timestamp >= startTime, "ERR_NOT_START");

        if (isWhite){
            require((_tokenIds.current() + times) <= supplyTotal+1 && (userHasMint[msg.sender] + times) == 1, "ERR_MINT_OVERFLOW_MAX");
        }  else {
            require((_tokenIds.current() + times) <= supplyTotal+1 && (userHasMint[msg.sender] + times) <= 100, "ERR_MINT_OVERFLOW_MAX");
            require(msg.value >= MintOneForUser * times, "ERR_NOT_ENOUGH_ETH"); // price
        }

        for (uint i; i < times; i++) {
            mint(msg.sender);
        }
        
        userHasMint[msg.sender] += times;
    }

    function tokenURI(uint tokenId) public view override returns (string memory) {
        return string.concat(baseURI, Strings.toString(tokenId), ".json");
    }

    function withdraw() external payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }

    function setStartTime(uint _startTime) external onlyOwner {
        startTime = _startTime;
    }

    function setContractURI(string memory _contractURI) external onlyOwner {
        contractURI = _contractURI;
    }

    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function setTotalSupply(uint32 _supply) external onlyOwner {
        supplyTotal = _supply;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "ERR_ONLY_OWNER");
        _;
    }
}
