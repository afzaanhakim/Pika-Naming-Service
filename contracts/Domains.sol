
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import { StringUtils } from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

contract Domains {
  string public maindomain; 
  mapping(string => address) public domains; //storing domain names in a mapping that maps two values in this case i will map domain name which is a string to the wallet address
  mapping(string => string) public records; //storing values i.e records of registrations
  mapping(string => string) public emails; //storing emails 
  mapping (string => string) public twitter; //storing twitter handles 
  mapping (string => string) public professions; //storing profession
  mapping (string => string) public pfp; //storing profile picture
  constructor(string memory _maindomain) payable {
    maindomain = _maindomain;
    console.log("%s name service deployed", _maindomain);
    console.log("PIKA CONTRACT");
  }

  //a function for price of domain based on length of characters in domain

  function price(string calldata name) public pure returns(uint){
    uint len = StringUtils.strlen(name);
    require(len > 0);
    if(len == 3) {
      return 1 * 10**17; // 5 MATIC = 5 000 000 000 000 000 000 (18 decimals). 0.5 Matic cause the faucets don't give a lot
    }
    else if(len == 4) {
      return 0.5 * 10**17; //reducing price if characters are higher
    }
    else {
      return 0.3 * 10**17;
    }
  }

  function register (string calldata name) public payable { //a register function that takes name as parameter and assignes it to whoeevr calls this func on the chain (msg.sender) and adds the name to the domains mapping - calldata is the location of the where name argument should be stored. I am storing in calldata so it takes less gas.
    require(domains[name] == address(0));//checking to see if name is unregistered i.e there are 0 address for that name inside the domains mapping
    uint _price = price(name); //calculating price of the name used
   // Check if enough Matic was paid in the transaction
    require(msg.value >= _price, "Not enough Matic paid"); //checking if value of transaction is greater or equal to the price paid
    domains[name] = msg.sender; 
    console.log("%s has register a domain", msg.sender);
    console.log("%s has cost", domains[name], _price);
  }

  function getAddress(string calldata name) public view returns(address) { //simple function that returns the address of the owner of a specific name
    return domains[name];
  }

  function setRecord(string calldata name, string calldata record) public {
    require(domains[name] == msg.sender); //using require as a prereq to check if the name belongs to the person calling the function then setting the record for that name to map to the record;
    records[name] = record;
  }

  function getRecord(string calldata name) public view returns(string memory) {
    return records[name];
  }

  function setEmail(string calldata name, string calldata email) public {
    require(domains[name] == msg.sender);
    emails[name] = email; //setting emails of the person registered to this domain
  }

  function getEmail(string calldata name) public view returns(string memory){
    return emails[name]; //getting email of the person registering with this domain
  }

  function setTwitter(string calldata name, string calldata handle) public {
     require(domains[name] == msg.sender);
     twitter[name] = handle;
  }

  function getTwitter(string calldata name) public view returns(string memory){
    return twitter[name];
  }

  function setProfession(string calldata name, string calldata profession) public {
    require(domains[name] == msg.sender);
    professions[name] = profession;
  }

  function getProfession(string calldata name) public view returns(string memory) {
    return professions[name];
  }

  function setPFP (string calldata name, string calldata pic) public {
    require(domains[name] == msg.sender);
    pfp[name] = pic;
  }

  function getPFP(string calldata name) public view returns(string memory){
    return pfp[name];
  }
}