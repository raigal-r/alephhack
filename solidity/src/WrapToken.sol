// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WrappedToken1
 * @dev ERC20 token issued as a receipt for GameToken1 deposits.
 */
contract WrappedToken1 is ERC20, Ownable {
    constructor() ERC20("WrappedToken1", "WGTK1") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}

/**
 * @title WrappedToken2
 * @dev ERC20 token issued as a receipt for GameToken2 deposits.
 */
contract WrappedToken2 is ERC20, Ownable {
    constructor() ERC20("WrappedToken2", "WGTK2") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}

/**
 * @title WrappedToken3
 * @dev ERC20 token issued as a receipt for GameToken3 deposits.
 */
contract WrappedToken3 is ERC20, Ownable {
    constructor() ERC20("WrappedToken3", "WGTK3") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
