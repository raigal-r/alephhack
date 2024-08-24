// /src/providers/player.provider.ts
import WebSocket from 'ws';
import { Player } from '../models/player.model';
import { MemeProvider } from './meme.provider';

export class PlayerProvider {
  private players: Record<string, Player> = {};
  private memeProvider: MemeProvider;

  constructor() {
    this.memeProvider = new MemeProvider();
  }

  addPlayer(playerId: string, socket: WebSocket) {
    const memes = this.memeProvider.assignMemesToPlayer();
    this.players[playerId] = { id: playerId, socket, memes };
    console.log(`[PlayerProvider] Player ${playerId} added with memes`, memes);
  }

  removePlayer(playerId: string) {
    delete this.players[playerId];
    console.log(`[PlayerProvider] Player ${playerId} removed`);
  }

  getPlayer(playerId: string): Player | undefined {
    return this.players[playerId];
  }

  getPlayerCount(): number {
    return Object.keys(this.players).length;
  }

  updateMemeHealth(playerId: string, memeId: string, damage: number): number | null {
    const player = this.players[playerId];
    if (player) {
      const meme = player.memes.find(m => m.id === memeId);
      if (meme) {
        return this.memeProvider.updateMemeHealth(meme, damage);
      }
    }
    return null;
  }

  areAllMemesDefeated(playerId: string): boolean {
    const player = this.players[playerId];
    if (player) {
      return player.memes.every(meme => this.memeProvider.isMemeDefeated(meme));
    }
    return false;
  }
}
