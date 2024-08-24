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
    const { playerId, opponentId, memeId, targetMemeId, powerName } = data;
    console.log({ playerId, opponentId, memeId, targetMemeId, powerName })
    const player = this.playerProvider.getPlayer(playerId);
    const opponent = this.playerProvider.getPlayer(opponentId);

    if (player && opponent) {
      const meme = player.memes.find(m => m.id === targetMemeId);
      const power = meme?.powers.find(p => p.name === powerName);

      if (meme && power) {
        const damage = power.powerValue * 2; 
        const remainingHealth = this.playerProvider.updateMemeHealth(opponentId, targetMemeId, damage);

        if (remainingHealth !== null) {
          wsConnection.send(JSON.stringify({
            status: 'attack_successful',
            opponentId,
            memeId,
            remainingHealth,
            playerMemeHealth: this.playerProvider.getMemeHealth(playerId, memeId), 
            opponentMemeHealth: this.playerProvider.getMemeHealth(opponentId, targetMemeId),
          }));

          if (opponent.socket.readyState === WebSocket.OPEN) {
            opponent.socket.send(JSON.stringify({
              status: 'attacked',
              attackerId: playerId,
              memeId,
              damage,
              remainingHealth,
              playerMemeHealth: this.playerProvider.getMemeHealth(playerId, memeId), 
              opponentMemeHealth: this.playerProvider.getMemeHealth(opponentId, targetMemeId), 
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

  private startGameIfReady() {
    const players = this.playerProvider.getPlayers();
    if (Object.keys(players).length >= 2) {
      const player1 = players[Object.keys(players)[0]];
      const player2 = players[Object.keys(players)[1]];
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
    } else {
      console.log('[GameService] Not enough players to start the game');
    }
  }
}
