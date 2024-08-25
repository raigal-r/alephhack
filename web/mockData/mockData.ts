export type Meme = {
  id: string;
  name: string;
  imageSrc?: string;
  level?: number;
  health: number;
  attack: number;
  critChance: number;
  speed: number;
  defense: number;
  balance?: number;
  powers: { name: string; powerValue: number; src?: string }[];
};

export const memes: Meme[] = [
  {
    id: 'MAGAIBA',
    name: 'MAGAIBA',
    imageSrc: '/images/memes/magaiba.png',
    level: 51,
    health: 1200,
    attack: 60,
    critChance: 120,
    speed: 200,
    defense: 57,
    balance: 0,
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
    id: 'MOG',
    name: 'MOG',
    imageSrc: '/images/memes/mog.png',
    level: 48,
    health: 556,
    attack: 110,
    critChance: 40,
    speed: 600,
    defense: 120,
    balance: 0,
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
    imageSrc: '/images/memes/bonk.png',
    level: 13,
    health: 789,
    attack: 78,
    critChance: 300,
    speed: 300,
    defense: 14,
    balance: 0,
    powers: [
      {
        name: 'Home run hit',
        src: '/images/cards/bonk-cards/home-run-hit.png',
        powerValue: 10,
      },
      {
        name: 'Golden bat',
        src: '/images/cards/bonk-cards/golden-bat.png',
        powerValue: 20,
      },
      {
        name: 'Running attack',
        src: '/images/cards/bonk-cards/running-attack.png',
        powerValue: 30,
      },
      {
        name: 'Bat block',
        src: '/images/cards/bonk-cards/bat-block.png',
        powerValue: 40,
      },
    ],
  },
];
