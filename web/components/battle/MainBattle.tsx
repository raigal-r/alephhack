import React, { useEffect, useCallback, useState } from 'react';
import { useBattle } from '../../hooks/useBattle';
import {
  IconApple,
  IconSword,
  IconShoe,
  IconShield,
  IconSparkles,
} from '@tabler/icons-react';
import Image from 'next/image';
import { Meme, memes } from '@/mockData/mockData';

interface StatDisplayProps {
  Icon: React.ElementType;
  value: string | number;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ Icon, value }) => (
  <div className="flex items-center justify-between">
    <Icon className="w-5 h-5" />
    <span className="ml-1">{value}</span>
  </div>
);

interface HealthBarProps {
  currentHealth: number;
  totalHealth: number;
}

const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  totalHealth,
}) => {
  const healthPercentage = Math.max(
    0,
    Math.min(100, (currentHealth / totalHealth) * 100)
  );

  return (
    <div className="flex w-full items-center bg-gray-300 h-5 rounded-[2px] overflow-hidden">
      <div
        className="bg-red-600 h-full"
        style={{ width: `${healthPercentage}%` }}
      >
        <div className="text-xs font-bold text-white text-center h-full leading-5">
          {Math.round(healthPercentage)}%
        </div>
      </div>
    </div>
  );
};

interface PlayerCardProps {
  name: string;
  level: number;
  currentHealth: number;
  totalHealth: number;
  imageSrc: string;
  stats: { attack: number; critical: number; speed: number; defense: number };
  isEnemy?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  level,
  currentHealth,
  totalHealth,
  imageSrc,
  stats,
  isEnemy,
}) => (
  <div className={`w-1/2 ${isEnemy ? 'text-red-800' : 'text-blue-800'}`}>
    <div className="flex justify-between">
      <div>{name}</div>
      <div>Lvl {level}</div>
    </div>
    <div className="flex justify-between gap-2 items-center">
      <div className="flex">HP</div>
      <HealthBar currentHealth={currentHealth} totalHealth={totalHealth} />
    </div>
    <div className="flex items-center justify-center">
      <Image src={imageSrc} width={151} height={151} alt={`${name}'s Pet`} />
    </div>
    <div className="grid grid-cols-2 gap-2 mt-4 max-w-[150px] mx-auto">
      <StatDisplay Icon={IconSword} value={stats.attack} />
      <StatDisplay Icon={IconSparkles} value={`${stats.critical}%`} />
      <StatDisplay Icon={IconShoe} value={stats.speed} />
      <StatDisplay Icon={IconShield} value={stats.defense} />
    </div>
  </div>
);

interface MoveCardProps {
  imageSrc: string;
  name: string;
  onClick: () => void;
}

const MoveCard: React.FC<MoveCardProps> = ({ imageSrc, name, onClick }) => (
  <div
    className="p-2 justify-center bg-black text-white gap-2 cursor-pointer"
    onClick={onClick}
  >
    <div>
      <Image src={imageSrc} width={119} height={119} alt={name} />
    </div>
    <div className="text-center">
      <div className="text-xl">{name}</div>
    </div>
  </div>
);

export default function MainBattle() {
  const { battleState, joinBattle, attack, playerId } = useBattle();
  console.log(battleState);
  const [p1Meme, setP1Meme] = useState<Meme>(
    memes.find((meme) => meme.name === 'WIF')!
  );
  const [p2Meme, setP2Meme] = useState<Meme>(
    memes.find((meme) => meme.name === 'MAGAIBA')!
  );

  useEffect(() => {
    joinBattle();
  }, [joinBattle]);

  const handleAttack = (
    memeId: string,
    powerDamage: string,
    targetMemeId: string
  ) => {
    console.log('atk: ');
    attack(memeId, powerDamage, targetMemeId);
  };

  const moves = [
    { name: 'Home run hit', src: '/images/cards/bonk-cards/home-run-hit.png' },
    { name: 'Golden bat', src: '/images/cards/bonk-cards/golden-bat.png' },
    {
      name: 'Running attack',
      src: '/images/cards/bonk-cards/running-attack.png',
    },
    { name: 'Bat block', src: '/images/cards/bonk-cards/bat-block.png' },
  ];

  return (
    <div className="p-2">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">BATTLE TIME!</h2>
        <div className="text-xl">Round 1</div>
      </div>

      <div className="text-center text-3xl">YOUR TURN</div>

      <div className="flex w-full justify-between gap-6">
        {p1Meme && (
          <PlayerCard
            name="You"
            level={p1Meme.level}
            currentHealth={100} // Replace with actual current health value
            totalHealth={p1Meme.health}
            imageSrc="/images/pets/pet-bonk.png"
            stats={{
              attack: p1Meme.attack,
              critical: p1Meme.critical / 100,
              speed: p1Meme.speed,
              defense: p1Meme.defense,
            }}
          />
        )}
        {p2Meme && (
          <PlayerCard
            name="Enemy"
            level={p2Meme.level}
            currentHealth={200} // Replace with actual current health value
            totalHealth={p2Meme.health}
            imageSrc="/images/pets/pet-magaiba.png"
            stats={{
              attack: p2Meme.attack,
              critical: p2Meme.critical / 100,
              speed: p2Meme.speed,
              defense: p2Meme.defense,
            }}
            isEnemy
          />
        )}
      </div>

      <div className="text-center text-2xl pt-4">Pick your next move</div>

      <div className="w-full">
        <div className="pt-4 flex flex-wrap justify-center gap-4 px-2">
          {moves.map((move) => (
            <div
              className="mx-auto flex items-center justify-center"
              key={move.name}
            >
              <MoveCard
                imageSrc={move.src}
                name={move.name}
                onClick={() =>
                  handleAttack('player-meme-id', move.name, 'enemy-meme-id')
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
