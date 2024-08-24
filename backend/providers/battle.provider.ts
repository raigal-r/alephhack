// /src/providers/battle.provider.ts
import { Battle } from '../models/battle.mode';
import { Player } from '../models/player.model';

export class BattleProvider {
  private battles: Record<string, Battle> = {};
  private activeBattleId: string | null = null;

  createBattle(player1: Player, player2: Player): string {
    const battleId = `battle-${player1.id}-${player2.id}`;
    const battle: Battle = {
      id: battleId,
      player1,
      player2,
      isActive: true,
    };

    this.battles[battleId] = battle;
    this.activeBattleId = battleId;

    console.log(`[BattleProvider] Battle started between ${player1.id} and ${player2.id}`);
    return battleId;
  }

  getBattle(battleId: string): Battle | null {
    return this.battles[battleId] || null;
  }

  getActiveBattle(): Battle | null {
    return this.activeBattleId ? this.battles[this.activeBattleId] : null;
  }

  endBattle(battleId: string) {
    const battle = this.battles[battleId];
    if (battle) {
      battle.isActive = false;
      this.activeBattleId = null;
      console.log(`[BattleProvider] Battle ${battleId} ended`);
    }
  }
}
