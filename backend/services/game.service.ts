import WebSocket from 'ws';
import { PlayerProvider } from '../providers/player.provider';
import { BattleProvider } from '../providers/battle.provider';

//Sign protocol imports
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, Contract, ethers } from "ethers";


export class GameService {
  private playerProvider: PlayerProvider;
  private battleProvider: BattleProvider;

  constructor() {
    this.playerProvider = new PlayerProvider();
    this.battleProvider = new BattleProvider(); 
  }

  handleAttestation(playerA: string,
    playerB: string,
    winner: string,
    amount: BigNumber,
    ){
    
    const address: string = process.env.PUBLIC_KEY || ''; // Provide a default value or handle undefined
    // Encode the schema data: playerA, playerB, winner, amount
    const schemaData: string = ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "address", "uint256"],
      [playerA, playerB, winner, amount]
    );

    // Standard setup for the contract
    const provider = new ethers.providers.JsonRpcProvider(
    // Get an RPC URL (such as an infura link) to connect to the network
    getProviderUrl(84532)
    );

    const contract = new Contract(CONTRACT_ADDRESS(0x878c92FD89d8E0B93Dc0a3c907A2adc7577e39c5), ISPABI.abi, provider);

    const library = new Web3Provider(await connector.getProvider());

    const instance = contract.connect(library.getSigner() as any) as Contract;

    try {
      const tx = await instance[
        "attest((uint64,uint64,uint64,uint64,address,uint64,uint8,bool,bytes[],bytes),string,bytes,bytes)"
      ](
        {
          schemaId: BigNumber.from("0x34"), // The final number from our schema's ID.
          linkedAttestationId: 0, // We are not linking an attestation.
          attestTimestamp: 0, // Will be generated for us.
          revokeTimestamp: 0, // Attestation is not revoked.
          attester: address, // Alice's address.
          validUntil: 0, // We are not setting an expiry date.
          dataLocation: 0, // We are placing data on-chain.
          revoked: false, // The attestation is not revoked.
          recipients: [winner], // The winner is our recipient.
          data: schemaData, // The encoded schema data (playerA, playerB, winner, amount)
        },
        winner.toLowerCase(), // Winner's lowercase address will be our indexing key.
        "0x", // No delegate signature.
        "0x00" // No extra data.
      );
      
      const res = await tx.wait(1);
      console.log("success", res);
      // You can find the attestation's ID using the following path:
      // res.events[0].args.attestationId
    } catch (err: any) {
      console.error(err?.message ? err.message : err);
    }
  
  }

  handleJoin(wsConnection: WebSocket, data: any) {
    const { playerId } = data;
    this.playerProvider.addPlayer(playerId, wsConnection);
    
    wsConnection.send(JSON.stringify({
      status: 'joined',
      playerId,
      memes: this.playerProvider.getPlayer(playerId)?.memes,
    }));

    this.startGameIfReady();
  }

  handleAttack(wsConnection: WebSocket, data: any) {
    const { playerId, opponentId, memeId, targetMemeId, powerDamage } = data;
    console.log({ playerId, opponentId, memeId, targetMemeId, powerDamage });
    const player = this.playerProvider.getPlayer(playerId);
    const opponent = this.playerProvider.getPlayer(opponentId);

    if (player && opponent) {
      const playerMeme = player.memes.find(m => m.id === memeId);

      if (playerMeme && powerDamage) {
        const remainingHealth = this.playerProvider.updateMemeHealth(opponentId, targetMemeId, powerDamage);

        if (remainingHealth !== null) {
          wsConnection.send(JSON.stringify({
            status: 'attack_successful',
            opponentId,
            memeId,
            targetMemeId,
            playerMemeHealth: playerMeme.health, 
            opponentMemeHealth: remainingHealth,
          }));

          if (opponent.socket.readyState === WebSocket.OPEN) {
            opponent.socket.send(JSON.stringify({
              status: 'attacked',
              attackerId: playerId,
              memeId,
              targetMemeId,
              playerMemeHealth: playerMeme.health, 
              opponentMemeHealth: remainingHealth, 
            }));
          }

          if (this.playerProvider.areAllMemesDefeated(opponentId)) {
            const battle = this.battleProvider.getActiveBattle();
            if (battle) {
              this.battleProvider.endBattle(battle.id);
              wsConnection.send(JSON.stringify({ status: 'battle_ended', winnerId: playerId }));
              opponent.socket.send(JSON.stringify({ status: 'battle_ended', winnerId: playerId }));
            }
          }
        } else {
          wsConnection.send(JSON.stringify({ message: 'Opponent or meme not found' }));
        }
      } else {
        wsConnection.send(JSON.stringify({ message: 'Invalid meme or power' }));
      }
    }
  }
  getPlayerMemes(playerId: string) {
    const player = this.playerProvider.getPlayer(playerId);
    if (player) {
      return player.memes;
    }
    return null;
  }

  private startGameIfReady() {
    const players = this.playerProvider.getPlayers();
    const playerIds = Object.keys(players);
    console.log({length:playerIds.length})
    if (playerIds.length >= 2) {
      playerIds.sort(); 
  
      const player1 = players[playerIds[0]];
      const player2 = players[playerIds[1]];
      
      this.battleProvider.createBattle(player1, player2);
      player1.socket.send(JSON.stringify({
        status: 'battle_started',
        opponentId: player2.id,
        playerMemes: player1.memes,
        opponentMemes: player2.memes
      }));
      player2.socket.send(JSON.stringify({
        status: 'battle_started',
        opponentId: player1.id,
        playerMemes: player2.memes,
        opponentMemes: player1.memes
      }));
      console.log('Battle start!')

    } else {
      console.log('[GameService] Not enough players to start the game');
    }
  }
  
}
