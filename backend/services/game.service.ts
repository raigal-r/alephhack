// /src/services/game.service.ts
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
    const { playerId, opponentId, memeId, powerName } = data;
    const player = this.playerProvider.getPlayer(playerId);
    const opponent = this.playerProvider.getPlayer(opponentId);

    if (player && opponent) {
      const meme = player.memes.find(m => m.id === memeId);
      const power = meme?.powers.find(p => p.name === powerName);

      if (meme && power) {
        const damage = power.powerValue * 2; // Ecuación simple
        const remainingHealth = this.playerProvider.updateMemeHealth(opponentId, memeId, damage);

        if (remainingHealth !== null) {
          wsConnection.send(JSON.stringify({
            status: 'attack_successful',
            opponentId,
            memeId,
            remainingHealth,
          }));

          if (opponent.socket.readyState === WebSocket.OPEN) {
            opponent.socket.send(JSON.stringify({
              status: 'attacked',
              attackerId: playerId,
              memeId,
              damage,
              remainingHealth,
            }));
          }

          // Verificar si todos los memes del oponente han sido derrotados
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
    const players = Object.values(this.playerProvider.getPlayerCount());
    if (players.length >= 2) {
      const player1 = players[0];
      const player2 = players[1];
      this.battleProvider.createBattle(player1, player2);

      player1.socket.send(JSON.stringify({ status: 'battle_started', opponentId: player2.id }));
      player2.socket.send(JSON.stringify({ status: 'battle_started', opponentId: player1.id }));
    } else {
      console.log('[GameService] Not enough players to start the game');
    }
  }
}
