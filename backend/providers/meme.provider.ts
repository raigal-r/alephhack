// /src/providers/meme.provider.ts
import { Power } from '../models/meme.model';

export type Meme = {
  id: string;
  name: string;
  health: number;
  attack: number;
  critChance: number;
  speed: number;
  defense: number;
  powers: { name: string; powerValue: number }[];
};

export const memes: Meme[] = [
  {
    id: 'MAGAIBA',
    name: 'MAGAIBA',
    health: 1200,
    attack: 60,
    critChance: 120,
    speed: 200,
    defense: 57,
    powers: [
      {
        name: 'Smash',
        powerValue: 5,
      },
      {
        name: 'Splash',
        powerValue: 20,
      },
      {
        name: 'Blast',
        powerValue: 40,
      },
      {
        name: 'Zap',
        powerValue: 30,
      },
    ],
  },
  {
    id: 'WIF',
    name: 'WIF',
    health: 400,
    attack: 594,
    critChance: 594,
    speed: 400,
    defense: 80,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 15,
      },
      {
        name: 'Blast',
        powerValue: 20,
      },
      {
        name: 'Zap',
        powerValue: 50,
      },
    ],
  },
  {
    id: 'MOG',
    name: 'MOG',
    health: 556,
    attack: 110,
    critChance: 40,
    speed: 600,
    defense: 120,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 40,
      },
      {
        name: 'Blast',
        powerValue: 5,
      },
      {
        name: 'Zap',
        powerValue: 10,
      },
    ],
  },
  {
    id: 'BONK',
    name: 'BONK',
    health: 789,
    attack: 78,
    critChance: 300,
    speed: 300,
    defense: 14,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 20,
      },
      {
        name: 'Blast',
        powerValue: 30,
      },
      {
        name: 'Zap',
        powerValue: 40,
      },
    ],
  },
  {
    id: 'BOBO',
    name: 'BOBO',
    health: 594,
    attack: 34,
    critChance: 100,
    speed: 200,
    defense: 24,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 20,
      },
      {
        name: 'Blast',
        powerValue: 30,
      },
      {
        name: 'Zap',
        powerValue: 40,
      },
    ],
  },
];

export class MemeProvider {
  private availableMemes: Meme[] = [];

  constructor() {
    this.seedMemes();
  }

  private seedMemes() {
    this.availableMemes = memes;
  }

  getMemes(): Meme[] {
    return this.availableMemes;
  }

  assignMemesToPlayer(): Meme[] {
    // Clona los memes base para que cada jugador tenga su propia instancia
    return this.availableMemes
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((meme) => this.cloneMeme(meme));
  }

  cloneMeme(baseMeme: Meme): Meme {
    // Retorna una copia profunda del meme para que cada jugador tenga su propia instancia
    return {
      id: baseMeme.id,
      name: baseMeme.name,
      health: baseMeme.health,
      attack: baseMeme.attack,
      defense: baseMeme.defense,
      critChance: baseMeme.critChance,
      speed: baseMeme.speed,
      powers: baseMeme.powers.map((power) => ({ ...power })),
    };
  }

  updateMemeHealth(meme: Meme, damage: number): number {
    meme.health = Math.max(0, meme.health - damage);
    return meme.health;
  }

  isMemeDefeated(meme: Meme): boolean {
    return meme.health === 0;
  }
}
