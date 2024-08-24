import React from 'react';
import Button from '../ui/Button';
import { IconPlus, IconSwords } from '@tabler/icons-react';
import { useGameStage } from '../providers/GameStageProvider';

export default function SelectMeme() {
  const { gameStage, setGameStage } = useGameStage();

  const handleStakeMeme = () => {
    console.log('staking meme');
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-between h-full">
      <Button onClick={() => handleStakeMeme()}>
        <IconPlus />
        Stake meme
      </Button>
      <div>meme deck</div>
      <Button onClick={() => setGameStage('battlePreparation')}>
        <IconSwords />
        Start fight
      </Button>
    </div>
  );
}
