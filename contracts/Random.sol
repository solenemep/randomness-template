// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./libraries/RandomGenerator.sol";

contract Random {
    uint256 public random;

    constructor() {}

    function generateRandom(address _user,
        uint256 _limit,
        uint256 _salt) public {
        random =  RandomGenerator.random(_user, _limit, _salt);
    }
}
