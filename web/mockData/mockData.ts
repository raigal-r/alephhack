export type Meme = {
  id: number;
  name: string;
  imageSrc: string;
  level: number;
  health: number;
  attack: number;
  critical: number;
  speed: number;
  defense: number;
  balance: number;
  powers: { name: string; powerValue: number }[];
};

export const memes: Meme[] = [
  {
    id: 1,
    name: 'MAGAIBA',
    imageSrc: '/images/memes/magaiba.png',
    level: 51,
    health: 1200,
    attack: 60,
    critical: 120,
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
    id: 2,
    name: 'WIF',
    imageSrc: '/images/memes/wif.png',
    level: 23,
    health: 400,
    attack: 594,
    critical: 594,
    speed: 400,
    defense: 80,
    balance: 0,
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
    id: 3,
    name: 'MOG',
    imageSrc: '/images/memes/mog.png',
    level: 48,
    health: 556,
    attack: 110,
    critical: 40,
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
    id: 4,
    name: 'BONK',
    imageSrc: '/images/memes/bonk.png',
    level: 13,
    health: 789,
    attack: 78,
    critical: 300,
    speed: 300,
    defense: 14,
    balance: 0,
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
    id: 5,
    name: 'BOBO',
    imageSrc: '/images/memes/bobo.png',
    level: 9,
    health: 594,
    attack: 34,
    critical: 100,
    speed: 200,
    defense: 24,
    balance: 0,
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
