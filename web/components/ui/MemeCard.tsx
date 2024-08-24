import React from 'react';
import {
  IconPlus,
  IconSwords,
  IconApple,
  IconSword,
  IconShoe,
  IconShield,
} from '@tabler/icons-react';
import Image from 'next/image';
import { Meme } from '@/mockData/mockData';

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
      className={`w-full flex border-2 gap-3 border-black p-4 text-black list-none cursor-pointer ${
        isSelected ? 'border-4 bg-[#FEF9C3]' : ''
      }`}
      onClick={onSelect}
    >
      <div className="min-w-[100px]">
        <div>$ {meme.name}</div>
        <Image src={meme.imageSrc} width={95} height={95} alt={meme.name} />
      </div>
      <div>
        <div className="pb-2">LVL {meme.level}</div>
        <div className="flex flex-wrap gap-4">
          {[
            { Icon: IconApple, value: meme.health },
            { Icon: IconSword, value: meme.attack },
            {
              Icon: () => (
                <Image
                  src="/images/stats/critico.svg"
                  width={22}
                  height={22}
                  alt="Critical"
                />
              ),
              value: meme.critical,
            },
            { Icon: IconShoe, value: meme.speed },
            { Icon: IconShield, value: meme.defense },
          ].map(({ Icon, value }, index) => (
            <div key={index} className="flex gap-2">
              <Icon />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
