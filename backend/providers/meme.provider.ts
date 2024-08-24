// /src/providers/meme.provider.ts
import { Meme, Power } from '../models/meme.model';

export class MemeProvider {
  private availableMemes: Meme[] = [];

  constructor() {
    this.seedMemes();
  }

  private seedMemes() {
    const baseMemes = [
      { name: 'PEPE', health: 100, attack: 100, defense: 50, critChance: 0.2, speed: 30 },
      { name: 'WIF', health: 100, attack: 100, defense: 50, critChance: 0.2, speed: 30 },
      { name: 'MAGAIBA', health: 100, attack: 100, defense: 50, critChance: 0.2, speed: 30 },
    ];

    baseMemes.forEach((baseMeme) => {
      const memePowers: Power[] = [
        { name: 'Smash', powerValue: 10 },
        { name: 'Splash', powerValue: 20 },
        { name: 'Blast', powerValue: 30 },
        { name: 'Zap', powerValue: 40 },
      ];

      const meme: Meme = {
        id: baseMeme.name,
        name: baseMeme.name,
        health: baseMeme.health,
        attack: baseMeme.attack,
        defense: baseMeme.defense,
        critChance: baseMeme.critChance,
        speed: baseMeme.speed,
        powers: memePowers,
      };

      this.availableMemes.push(meme);
    });
  }

  getMemes(): Meme[] {
    return this.availableMemes;
  }

  assignMemesToPlayer(): Meme[] {
    // Clona los memes base para que cada jugador tenga su propia instancia
    return this.availableMemes
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(meme => this.cloneMeme(meme));
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
      powers: baseMeme.powers.map(power => ({ ...power })),
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
