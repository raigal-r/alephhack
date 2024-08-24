export interface Meme {
  id: string;
  name: string;
  health: number;
  attack: number;
  defense: number;
  critChance: number;
  speed: number;
  powers: Power[];
}

export interface Power {
  name: string;
  powerValue: number;
}