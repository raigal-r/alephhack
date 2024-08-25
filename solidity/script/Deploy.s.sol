// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";
import "../src/BattleArena.sol";
import { WrappedToken1, WrappedToken2, WrappedToken3 } from '../src/WrapToken.sol';
import { GameToken1, GameToken2, GameToken3 } from '../src/BaseToken.sol';


contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        GameToken1 gameToken1 = new GameToken1();
        gameToken1.mint(msg.sender, 1000 ether);

        GameToken2 gameToken2 = new GameToken2();
        gameToken2.mint(msg.sender, 1000 ether);

        GameToken3 gameToken3 = new GameToken3();
        gameToken3.mint(msg.sender, 1000 ether);

        WrappedToken1 wrappedToken1 = new WrappedToken1();
        wrappedToken1.mint(msg.sender, 1000 ether);

        WrappedToken2 wrappedToken2 = new WrappedToken2();
        wrappedToken2.mint(msg.sender, 1000 ether);

        WrappedToken3 wrappedToken3 = new WrappedToken3();
        wrappedToken3.mint(msg.sender, 1000 ether);

        BattleArena battleArena = new BattleArena(
            address(gameToken1),
            address(wrappedToken1),
            address(gameToken2),
            address(wrappedToken2),
            address(gameToken3),
            address(wrappedToken3)
        );

        vm.stopBroadcast();

        // Log the deployed addresses
        console.log("WrappedToken1 deployed at:", address(wrappedToken1));
        console.log("WrappedToken2 deployed at:", address(wrappedToken2));
        console.log("WrappedToken3 deployed at:", address(wrappedToken3));
        console.log("BattleArena deployed at:", address(battleArena));
    }
}
