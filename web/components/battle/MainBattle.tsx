import React, { useEffect, useCallback } from 'react';
import { useBattle } from '../../hooks/useBattle';
import {
  IconApple,
  IconSword,
  IconShoe,
  IconShield,
  IconSparkles,
} from '@tabler/icons-react';
import Image from 'next/image';

const StatDisplay: React.FC<{
  Icon: React.ElementType;
  value: string | number;
}> = ({ Icon, value }) => (
  <div className="flex gap-2">
    <Icon />
    <span>{value}</span>
  </div>
);

const HealthBar: React.FC<{ percentage: number }> = ({ percentage }) => (
  <div className="flex w-full items-center bg-black dark:bg-gray-700 h-5">
    <div
      className="bg-red-600 text-xs font-bold pt-1 text-blue-100 text-center h-5 leading-none"
      style={{ width: `${percentage}%` }}
    >
      {percentage}%
    </div>
  </div>
);

const PlayerCard: React.FC<{
  name: string;
  level: number;
  health: number;
  imageSrc: string;
  stats: { attack: number; critical: number; speed: number; defense: number };
  isEnemy?: boolean;
}> = ({ name, level, health, imageSrc, stats, isEnemy }) => (
  <div className={`w-1/2 ${isEnemy ? 'text-red-800' : 'text-blue-800'}`}>
    <div className="flex justify-between">
      <div>{name}</div>
      <div>Lvl {level}</div>
    </div>
    <div className="flex justify-between gap-2 items-center">
      <div className="flex">HP</div>
      <HealthBar percentage={health} />
    </div>
    <div>
      <Image src={imageSrc} width={151} height={151} alt={`${name}'s Pet`} />
    </div>
    <div className="flex flex-wrap gap-2 mt-4 max-w-[150px] justify-center">
      <StatDisplay Icon={IconSword} value={stats.attack} />
      <StatDisplay Icon={IconSparkles} value={`${stats.critical}%`} />
      <StatDisplay Icon={IconShoe} value={stats.speed} />
      <StatDisplay Icon={IconShield} value={stats.defense} />
    </div>
  </div>
);

const MoveCard: React.FC<{
  imageSrc: string;
  name: string;
  onClick: () => void;
}> = ({ imageSrc, name, onClick }) => (
  <div
    className="p-2 justify-center bg-black text-white gap-2"
    onClick={onClick}
  >
    <div>
      <Image src={imageSrc} width={119} height={119} alt={name} />
    </div>
    <div className="gap">
      <div className="text-xl">{name}</div>
    </div>
  </div>
);

export default function MainBattle() {
  const { battleState, joinBattle, attack, playerId } = useBattle();

  useEffect(() => {
    joinBattle();
  }, [joinBattle]);

  const handleAttack = useCallback(
    (memeId: string, powerName: string, targetMemeId: string) => {
      attack(memeId, powerName, targetMemeId);
    },
    [attack]
  );

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
        <PlayerCard
          name="You"
          level={51}
          health={60}
          imageSrc="/images/pets/pet-bonk.png"
          stats={{ attack: 594, critical: 5, speed: 594, defense: 594 }}
        />
        <PlayerCard
          name="Enemy"
          level={51}
          health={60}
          imageSrc="/images/pets/pet-magaiba.png"
          stats={{ attack: 594, critical: 5, speed: 594, defense: 594 }}
          isEnemy
        />
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
