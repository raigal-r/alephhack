import React, { useCallback, useEffect, useState } from 'react';
import Button from '../ui/Button';
import { IconPlus, IconSwords } from '@tabler/icons-react';
import { useGameStage } from '../providers/GameStageProvider';
import MemeCard from '../ui/MemeCard';
import { Meme, memes as initialMemes } from '@/mockData/mockData';

import { useGetTokenBalances } from '@/hooks/useBalances';
import { useWallet } from '@solana/wallet-adapter-react';

export default function SelectMeme() {
  const { setGameStage } = useGameStage();
  const [selectedMemes, setSelectedMemes] = useState<number[]>([]);
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const wallet = useWallet();
  const { data: tokenBalances } = useGetTokenBalances({
    address: wallet.publicKey!,
  });

  const handleSelectMeme = useCallback((memeId: number) => {
    setSelectedMemes((prevSelected) => {
      if (prevSelected.includes(memeId)) {
        return prevSelected.filter((id) => id !== memeId);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, memeId];
      }
      return prevSelected;
    });
  }, []);

  useEffect(() => {
    if (tokenBalances && tokenBalances.length > 0) {
      setMemes((prevMemes) =>
        prevMemes.map((meme, index) => ({
          ...meme,
          balance: tokenBalances[index % tokenBalances.length].balance,
        }))
      );
    }
  }, [tokenBalances]);

  const canStartFight = selectedMemes.length === 3;

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <Button onClick={() => setGameStage('stakeMeme')}>
        <IconPlus />
        Stake meme
      </Button>
      <div className="flex p-2 text-black w-full justify-between">
        <div className="text-xl font-thin">Select your memes</div>
        <div>{selectedMemes.length}/3</div>
      </div>

      <div className="snap-y max-h-[460px] w-full px-2 overflow-scroll flex flex-col gap-2">
        {memes.map((meme: Meme) => (
          <MemeCard
            key={meme.id}
            meme={meme}
            isSelected={selectedMemes.includes(meme.id)}
            onSelect={() => handleSelectMeme(meme.id)}
          />
        ))}
      </div>
      <div className="w-full">
        <Button
          onClick={() => setGameStage('battlePreparation')}
          visible={canStartFight}
        >
          <IconSwords />
          Start fight
        </Button>
      </div>
    </div>
  );
}
