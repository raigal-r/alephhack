import WebSocket from 'ws';
import { PlayerProvider } from '../providers/player.provider';
import { BattleProvider } from '../providers/battle.provider';

export class GameService {
  private playerProvider: PlayerProvider;
  private battleProvider: BattleProvider;

  constructor() {
    this.playerProvider = new PlayerProvider();
    this.battleProvider = new BattleProvider();
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
