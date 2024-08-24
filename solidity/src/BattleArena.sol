// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";
import "./ReceiptToken.sol";

/**
 * @title BattleArena
 * @dev Manages deposits, issues receipt tokens, and handles battle logic.
 */
contract BattleArena is Ownable {
    struct Player {
        address playerAddress;
        uint256 depositedAmount;
        IERC20 depositedToken;
    }

    ReceiptToken public receiptToken;
    mapping(address => Player) public players;
    address[] public playerAddresses;

    event DepositMade(address indexed player, address indexed token, uint256 amount);
    event BattleSettled(address indexed winner, uint256 rewardAmount);
    
    /**
     * @dev Sets the ReceiptToken contract address.
     * @param _receiptToken The address of the ReceiptToken contract.
     */
    constructor(address _receiptToken) {
        receiptToken = ReceiptToken(_receiptToken);
    }

    /**
     * @notice Deposit GameTokens into the pool.
     * @param token The address of the ERC20 token to deposit.
     * @param amount The amount of tokens to deposit.
     */
    function deposit(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero.");
        
        IERC20 gameToken = IERC20(token);
        require(gameToken.transferFrom(msg.sender, address(this), amount), "Transfer failed.");

        if (players[msg.sender].playerAddress == address(0)) {
            players[msg.sender] = Player({
                playerAddress: msg.sender,
                depositedAmount: amount,
                depositedToken: gameToken
            });
            playerAddresses.push(msg.sender);
        } else {
            players[msg.sender].depositedAmount += amount;
        }

        receiptToken.mint(msg.sender, amount);
        emit DepositMade(msg.sender, token, amount);
    }

    /**
     * @notice Settles a battle and sends the pooled tokens to the winner.
     * @param winner The address of the winner.
     */
    function settleBattle(address winner) external onlyOwner {
        require(players[winner].playerAddress != address(0), "Winner not found.");
        
        uint256 totalReward = 0;

        for (uint256 i = 0; i < playerAddresses.length; i++) {
            address playerAddr = playerAddresses[i];
            uint256 playerDeposit = players[playerAddr].depositedAmount;

            if (playerDeposit > 0) {
                players[playerAddr].depositedToken.transfer(winner, playerDeposit);
                totalReward += playerDeposit;
                receiptToken.burn(playerAddr, playerDeposit);
                players[playerAddr].depositedAmount = 0;
            }
        }

        delete playerAddresses;
        emit BattleSettled(winner, totalReward);
    }
}
