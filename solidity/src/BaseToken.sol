// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GameToken1
 * @dev ERC20 token used as one of the in-game currencies that players deposit.
 */
contract GameToken1 is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("GameToken1", "GTK1") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }
}

/**
 * @title GameToken2
 * @dev ERC20 token used as another in-game currency that players deposit.
 */
contract GameToken2 is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("GameToken2", "GTK2") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }
}

/**
 * @title GameToken3
 * @dev ERC20 token used as another in-game currency that players deposit.
 */
contract GameToken3 is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("GameToken3", "GTK3") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }
}
