import { IconSwords } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import MemeSmallCard from '../ui/MemeSmallCard';
import SkeletonMemeCard from '../ui/SkeletonMemeCard';
import Button from '../ui/Button';
import { useGameStage } from '../providers/GameStageProvider';

export interface MemeData {
  lvl: number;
  name: string;
  img: string;
}

const teamMockedData: MemeData[] = [
  {
    lvl: 31,
    name: 'BONK',
    img: '/BONK_profile.png',
  },
  {
    lvl: 88,
    name: 'WIF',
    img: '/WIF_profile.png',
  },
  {
    lvl: 52,
    name: 'MAGAIBA',
    img: '/MAGAIBA_profile.png',
  },
];

export default function BattlePreparation() {
  const [isBattleFound, setIsBattleFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { gameStage, setGameStage } = useGameStage();

  useEffect(() => {
    // Simulate finding a battle after 3 seconds
    const timer = setTimeout(() => {
      setIsBattleFound(true);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleReady = () => {
    console.log('Player is ready!');
    setGameStage("battle")
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="title text-center my-4">
        {isBattleFound ? 'Battle found!' : 'Finding battle...'}
      </h2>
      <div className="flex items-center justify-between px-2 flex-grow">
        <div className="w-[45%] flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2">Your team</h3>
          <div className="flex flex-col gap-2 w-full">
            {teamMockedData.map((elem) => (
              <MemeSmallCard key={`${elem.lvl}_${elem.name}`} {...elem} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <IconSwords className="h-6 w-6 mb-2" />
          <span className="text-xs">VS</span>
        </div>
        <div className="w-[45%] flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2">Enemy team</h3>
          <div className="flex flex-col gap-2 w-full">
            {isLoading ? (
              <>
                <SkeletonMemeCard />
                <SkeletonMemeCard />
                <SkeletonMemeCard />
              </>
            ) : isBattleFound ? (
              teamMockedData.map((elem) => (
                <MemeSmallCard
                  key={`enemy_${elem.lvl}_${elem.name}`}
                  {...elem}
                />
              ))
            ) : (
              <p className="text-center text-sm">No opponent found</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto pb-4 px-4">
        <Button
          onClick={handleReady}
          className={`mt-4 ${
            !isBattleFound || isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isBattleFound || isLoading}
        >
          Ready!
        </Button>
      </div>
    </div>
  );
}
