// /src/models/battle.model.ts
import { Player } from './player.model';

export interface Battle {
  id: string;
  player1: Player;
  player2: Player;
  isActive: boolean;
}
