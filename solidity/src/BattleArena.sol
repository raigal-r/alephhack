// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { WrappedToken1, WrappedToken2, WrappedToken3 } from './WrapToken.sol';
/**
 * @title BattleArena
 * @dev Manages deposits, issues wrapped tokens, and handles battle logic.
 */
contract BattleArena is Ownable {
    struct TokenPair {
        IERC20 baseToken;
        IERC20 wrappedToken;
    }

    // Mapping to manage the relationship between base tokens and their wrapped tokens
    mapping(address => address) public baseToWrapped;

    // Mapping to manage locked tokens for each player
    mapping(address => mapping(address => uint256)) public lockedTokens; 

    // Array to store the addresses of the players
    address[] public playerAddresses;

    address[] public wrappedTokenAddresses;

    /// @notice Emitted when a player makes a deposit
    /// @param player The address of the player who made the deposit
    /// @param token The address of the deposited token
    /// @param amount The amount of tokens deposited
    event DepositMade(address indexed player, address indexed token, uint256 amount);

    /// @notice Emitted when a battle is settled
    /// @param winner The address of the winner of the battle
    /// @param rewardAmount The total amount of wrapped tokens transferred to the winner
    event BattleSettled(address indexed winner, uint256 rewardAmount);

    /// @notice Emitted when a player withdraws tokens
    /// @param player The address of the player withdrawing the tokens
    /// @param token The address of the token being withdrawn
    /// @param amount The amount of tokens withdrawn
    event Withdrawn(address indexed player, address indexed token, uint256 amount);

    /// @notice Emitted when tokens are locked for a battle
    /// @param player The address of the player whose tokens are locked
    /// @param token The address of the wrapped token that is locked
    /// @param amount The amount of tokens locked
    event TokensLocked(address indexed player, address indexed token, uint256 amount);
    
    /**
     * @dev Sets the relationships between base tokens and their corresponding wrapped tokens.
     * @param _baseToken1 Address of the first base token.
     * @param _wrappedToken1 Address of the first wrapped token.
     * @param _baseToken2 Address of the second base token.
     * @param _wrappedToken2 Address of the second wrapped token.
     * @param _baseToken3 Address of the third base token.
     * @param _wrappedToken3 Address of the third wrapped token.
     */
    constructor(address _baseToken1, address _wrappedToken1, address _baseToken2, address _wrappedToken2, address _baseToken3, address _wrappedToken3) 
        Ownable(msg.sender) 
    {
        baseToWrapped[_baseToken1] = _wrappedToken1;
        baseToWrapped[_baseToken2] = _wrappedToken2;
        baseToWrapped[_baseToken3] = _wrappedToken3;

        wrappedTokenAddresses.push(_wrappedToken1);
        wrappedTokenAddresses.push(_wrappedToken2);
        wrappedTokenAddresses.push(_wrappedToken3);
    }

    /**
     * @notice Allows players to deposit GameTokens into the pool and receive wrapped tokens.
     * @param token The address of the ERC20 token to deposit.
     * @param amount The amount of tokens to deposit.
     */
    function deposit(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero.");
        
        IERC20 gameToken = IERC20(token);
        require(gameToken.transferFrom(msg.sender, address(this), amount), "Transfer failed.");

        // Check that the token has a wrapped token associated
        address wrappedTokenAddress = baseToWrapped[token];
        require(wrappedTokenAddress != address(0), "Token does not have a wrapped equivalent.");

        IERC20 wrappedToken = IERC20(wrappedTokenAddress);
        require(address(wrappedToken) != address(0), "Wrapped token is invalid.");

        // Mint wrapped tokens to the depositor
        WrappedToken1(wrappedTokenAddress).mint(msg.sender, amount);

        // Add to player list if it's a new player
        if (lockedTokens[msg.sender][wrappedTokenAddress] == 0) {
            playerAddresses.push(msg.sender);
        }

        emit DepositMade(msg.sender, token, amount);
    }

    /**
     * @notice Locks 5% of the player's wrapped tokens at the start of a battle.
     * @param player The address of the player whose tokens are being locked.
     * @param token The address of the base token to lock.
     */
    function lockTokensForBattle(address player, address token) external onlyOwner {
        address wrappedTokenAddr = baseToWrapped[token];
        require(wrappedTokenAddr != address(0), "Token does not have a wrapped equivalent.");

        WrappedToken1 wrappedToken = WrappedToken1(wrappedTokenAddr);
        uint256 playerBalance = wrappedToken.balanceOf(player);
        uint256 lockAmount = (playerBalance * 5) / 100; 

        require(playerBalance >= lockAmount, "Insufficient balance to lock.");

        lockedTokens[player][wrappedTokenAddr] += lockAmount;

        emit TokensLocked(player, wrappedTokenAddr, lockAmount);
    }

    /**
     * @notice Settles a battle and transfers 5% of the locked wrapped tokens from the loser to the winner.
     * @param winner The address of the battle's winner.
     */
  function settleBattle(address winner, address loser) external onlyOwner {
        require(winner != address(0), "Winner address is invalid.");
        require(loser != address(0), "Loser address is invalid.");
        
        uint256 totalReward = 0;

        for (uint256 j = 0; j < wrappedTokenAddresses.length; j++) {
            address wrappedTokenAddr = wrappedTokenAddresses[j];
            uint256 lockedAmount = lockedTokens[loser][wrappedTokenAddr];

            if (lockedAmount > 0) {
                WrappedToken1(wrappedTokenAddr).transferFrom(loser, winner, lockedAmount);
                totalReward += lockedAmount;
                lockedTokens[loser][wrappedTokenAddr] = 0;
            }
        }

        emit BattleSettled(winner, loser, totalReward);
    } 

    /**
     * @notice Allows a player to withdraw their deposits, excluding the locked amount.
     * @param token The address of the base token to withdraw.
     * @param amount The amount of tokens to withdraw.
     */
    function withdraw(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero.");

        address wrappedTokenAddr = baseToWrapped[token];
        require(wrappedTokenAddr != address(0), "Token does not have a wrapped equivalent.");

        WrappedToken1 wrappedToken = WrappedToken1(wrappedTokenAddr);
        uint256 wrappedTokenBalance = wrappedToken.balanceOf(msg.sender);
        uint256 lockedAmount = lockedTokens[msg.sender][wrappedTokenAddr];
        uint256 availableAmount = wrappedTokenBalance - lockedAmount;

        require(availableAmount >= amount, "Insufficient unlocked balance to withdraw.");

        // Burn the player's wrapped tokens and return the base tokens
        wrappedToken.burn(msg.sender, amount);
        IERC20(token).transfer(msg.sender, amount);

        emit Withdrawn(msg.sender, token, amount);
    }
}
