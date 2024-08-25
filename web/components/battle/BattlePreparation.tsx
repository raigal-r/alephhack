import { IconSwords } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import MemeSmallCard from '../ui/MemeSmallCard';
import SkeletonMemeCard from '../ui/SkeletonMemeCard';
import Button from '../ui/Button';
import { useGameStage } from '../providers/GameStageProvider';
import { useBattle } from '@/hooks/useBattle';
import { memes } from '@/mockData/mockData';

export default function BattlePreparation() {
  const [isBattleFound, setIsBattleFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { gameStage, setGameStage } = useGameStage();
  const { battleState, joinBattle, attack, playerId } = useBattle();

  useEffect(() => {
    joinBattle();
  }, [joinBattle]);

  const handleAttack = (
    memeId: string,
    powerName: string,
    targetMemeId: string
  ) => {
    attack(memeId, powerName, targetMemeId);
  };

  const handleReady = () => {
    console.log('Battle begins!');
    setGameStage('battle');
  };
  const cutMemes = memes.slice(0, 3);
  return (
    <div className="flex flex-col h-full">
      <h2 className="title text-center my-4">
        {battleState.battleStarted ? 'Battle found!' : 'Finding battle...'}
      </h2>
      <div className="flex items-center justify-between px-2 flex-grow">
        <div className="w-[45%] flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2 text-blue-800">Your team</h3>
          <div className="flex flex-col gap-2 w-full">
            {cutMemes.map((elem) => (
              <MemeSmallCard key={`${elem.level}_${elem.name}`} {...elem} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <IconSwords className="h-6 w-6 mb-2" />
          <span className="text-xs">VS</span>
        </div>
        <div className="w-[45%] flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2 text-red-800">Enemy team</h3>
          <div className="flex flex-col gap-2 w-full">
            {!battleState.battleStarted ? (
              <>
                <SkeletonMemeCard />
                <SkeletonMemeCard />
                <SkeletonMemeCard />
              </>
            ) : (
              cutMemes
                .reverse()
                .map((elem) => (
                  <MemeSmallCard
                    key={`enemy_${elem.level}_${elem.name}`}
                    {...elem}
                  />
                ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto pb-4 px-4">
        <Button
          onClick={handleReady}
          className={`mt-4 `}
          visible={battleState?.battleStarted}
        >
          Ready!
        </Button>
      </div>
    </div>
  );
}
