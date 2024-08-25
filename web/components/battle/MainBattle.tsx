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
  <div className="flex items-center justify-center">
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
console.log(currentHealth, totalHealth)
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
  stats: { attack: number; critChance: number; speed: number; defense: number };
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
      <StatDisplay Icon={IconSparkles} value={`${stats.critChance}%`} />
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

  const [p1Meme, setP1Meme] = useState<Meme>();
  const [p2Meme, setP2Meme] = useState<Meme>();

  console.log(battleState);
  console.log(p1Meme, p2Meme);

  useEffect(() => {
    if (battleState?.playerMemes[0]) {
      const appMemes = Object.values(battleState?.playerMemes) as Meme[];
      const localMemes = memes;

      const localMeme = localMemes.find((meme) => meme.id === 'BONK')!;
      const appMeme = appMemes.find((meme) => meme.id === 'BONK')!;

      setP1Meme({ ...localMeme, health: appMeme.health });
    }

    if (battleState?.opponentMemes[0]) {
      const localMeme = memes.find(
        (meme) => meme.id === battleState?.opponentMemes[0].id
      );
      setP2Meme({ ...localMeme, ...(battleState?.opponentMemes[0] as Meme) });
    }
  }, [battleState.opponentMemes, battleState.playerMemes]);

  useEffect(() => {
    joinBattle();
  }, [joinBattle]);

  const handleAttack = (
    memeId: string,
    powerDamage: number,
    targetMemeId: string
  ) => {
    console.log(memeId, powerDamage, targetMemeId);
    attack(memeId, powerDamage, targetMemeId);
  };

  // const powers = [
  //   { name: 'Home run hit', src: '/images/cards/bonk-cards/home-run-hit.png' },
  //   { name: 'Golden bat', src: '/images/cards/bonk-cards/golden-bat.png' },
  //   {
  //     name: 'Running attack',
  //     src: '/images/cards/bonk-cards/running-attack.png',
  //   },
  //   { name: 'Bat block', src: '/images/cards/bonk-cards/bat-block.png' },
  // ];

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
            level={p1Meme?.level ?? 0}
            currentHealth={battleState?.playerMemes[0]?.health} // Replace with actual current health value
            totalHealth={p1Meme.health}
            imageSrc={p1Meme?.imageSrc ?? ''}
            stats={{
              attack: p1Meme.attack,
              critChance: p1Meme.critChance / 100,
              speed: p1Meme.speed,
              defense: p1Meme.defense,
            }}
          />
        )}
        {p2Meme && (
          <PlayerCard
            name="Enemy"
            level={p2Meme?.level ?? 0}
            currentHealth={battleState?.opponentMemes[0]?.health} // Replace with actual current health value
            totalHealth={p2Meme.health}
            imageSrc={p2Meme?.imageSrc ?? ''}
            stats={{
              attack: p2Meme.attack,
              critChance: p2Meme.critChance / 100,
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
          {p1Meme?.powers.map((power) => (
            <div
              className="mx-auto flex items-center justify-center"
              key={power.name}
            >
              <MoveCard
                imageSrc={power?.src ?? ''}
                name={power.name}
                onClick={() =>
                  handleAttack(p1Meme.id, power.powerValue, p2Meme?.id ?? '')
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
