'use client';
import React from 'react';
import MainBattle from '@/components/battle/MainBattle';
import SelectMeme from '@/components/battle/SelectMeme';
import StakeMeme from '@/components/battle/StakeMeme';
import BattlePreparation from '@/components/battle/BattlePreparation';
import { useGameStage } from '@/components/providers/GameStageProvider';

const BattlePage: React.FC = () => {
  const { gameStage, setGameStage } = useGameStage();

  return (
    <section className="h-full pb-2 pt-6 max-w-[420px] mx-auto max-h-[1080px] text-black w-full">
      {gameStage === 'selectMeme' && <SelectMeme />}
      {gameStage === 'stakeMeme' && <StakeMeme />}
      {gameStage === 'battlePreparation' && <BattlePreparation />}
      {gameStage === 'battle' && <MainBattle />}
    </section>
  );
};

export default BattlePage;
