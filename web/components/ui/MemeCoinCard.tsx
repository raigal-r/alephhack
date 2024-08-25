import React from 'react';
import Image from 'next/image';
import { Meme } from '@/mockData/mockData';
import { IconCoin } from '@tabler/icons-react';

interface MemeCardProps {
  meme: Meme;
  isSelected: boolean;
  onSelect: () => void;
}

export default function MemeCard({
  meme,
  isSelected,
  onSelect,
}: MemeCardProps) {
  return (
    <div
      className={`w-full max-w-[390px] flex border-2 gap-3 border-black p-4 text-black list-none cursor-pointer ${
        isSelected ? ' bg-[#FEF9C3]' : ''
      }`}
      onClick={onSelect}
    >
      <div className="">
        <Image
          src={meme.imageSrc}
          width={95}
          height={95}
          alt={meme.name}
          className="h-[95px] w-[95px]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="m-0">LVL {meme.level}</p>
        <h3 className="text-2xl"> $ {meme.name}</h3>
      </div>
    </div>
  );
}
