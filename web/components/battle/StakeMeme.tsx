import React, { useState, useCallback, useEffect } from 'react';
import Button from '../ui/Button';
import { Meme, memes as initialMemes } from '@/mockData/mockData';
import MemeCoinCard from '../ui/MemeCoinCard';
import { useGameStage } from '../providers/GameStageProvider';
import Image from 'next/image';
import { IconArrowBackUp } from '@tabler/icons-react';
import { useGetTokenBalances } from '../../hooks/useBalances';
import { useWallet } from '@solana/wallet-adapter-react';

export default function StakeMeme() {
  const { setGameStage } = useGameStage();
  const [selectedMeme, setSelectedMeme] = useState<Meme | undefined>(undefined);
  const [stakeAmount, setStakeAmount] = useState<number | null>(null);
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const wallet = useWallet();
  const { data: tokenBalances } = useGetTokenBalances({ address: wallet.publicKey! });


  useEffect(() => {
    if (tokenBalances && tokenBalances.length > 0) {
      setMemes(prevMemes =>
        prevMemes.map((meme, index) => ({
          ...meme,
          balance: tokenBalances[index % tokenBalances.length].balance
        }))
      );
    }
  }, [tokenBalances, memes]);

  const handleStake = useCallback(() => {
    if (selectedMeme && stakeAmount !== null) {
      if (stakeAmount > 0 && stakeAmount <= (selectedMeme.balance ?? 0)) {
        console.log(`Staking ${stakeAmount} of ${selectedMeme.name}`);
        // Here you would typically call a function to perform the actual staking
      } else {
        alert('Invalid stake amount');
      }
    }
  }, [selectedMeme, stakeAmount]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '') {
        setStakeAmount(null);
      } else {
        const numValue = Number(value);
        if (
          !isNaN(numValue) &&
          numValue >= 0 &&
          numValue <= (selectedMeme?.balance ?? 0)
        ) {
          setStakeAmount(numValue);
        }
      }
    },
    [selectedMeme]
  );
  {console.log({memes})}

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex justify-center items-center relative w-full pb-4 px-2">
        <Button
          onClick={() => setGameStage('selectMeme')}
          className="!w-fit absolute top-0 left-2"
        >
          <IconArrowBackUp />
        </Button>
        <div className="h-[48px] flex items-center justify-center">
          <h2 className="title text-center">Stake meme</h2>
        </div>
      </div>

      <div className="snap-y max-h-[460px] w-full px-2 overflow-scroll flex flex-col gap-2">
        {memes.map((meme: Meme, index: number) => (
          <MemeCoinCard
            key={meme.id}
            meme={meme}
            isSelected={selectedMeme?.id === meme.id}
            onSelect={() => {
              setSelectedMeme(meme);
              setStakeAmount(null);
            }}
          />
        ))}
      </div>
      <div className="p-4 flex flex-col gap-2 w-full h-[152px]">
        {selectedMeme ? (
          <>
            <div className="flex justify-between items-center">
              <span>Available: {selectedMeme.balance ?? 0}</span>
              <span
                className="text-lg underline"
                onClick={() => setStakeAmount(selectedMeme.balance ?? 0)}
              >
                Max
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-black rounded p-2">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Image
                  src={selectedMeme.imageSrc}
                  width={20}
                  height={20}
                  alt={selectedMeme.name}
                />
                <h3 className="text-xl">$ {selectedMeme.name}</h3>
              </div>
              <input
                type="number"
                value={stakeAmount === null ? '' : stakeAmount}
                onChange={handleInputChange}
                className="flex-grow bg-transparent outline-none text-right text-2xl "
                placeholder="0.00"
                step="any"
                min="0"
                max={selectedMeme.balance}
              />
            </div>
            <Button
              onClick={handleStake}
              disabled={stakeAmount === null || stakeAmount === 0}
              className={`${
                stakeAmount === null || stakeAmount === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              Stake
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Select a meme to stake</p>
          </div>
        )}
      </div>
    </div>
  );
}
