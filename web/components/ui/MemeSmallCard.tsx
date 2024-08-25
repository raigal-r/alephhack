import React from 'react';
import Image from 'next/image';
import { Meme } from '@/mockData/mockData';

export default function MemeSmallCard({ level, name, imageSrc }: Meme) {
  return (
    <div className="flex flex-col items-center justify-center border-black border-2 rounded p-2">
      <div className="flex gap-2 ">
        <h4 className="text-xl">{name}</h4>
        <p className="m-0">Lvl: {level}</p>
      </div>
      <div>
        <Image
          src={imageSrc}
          alt={name}
          width={95}
          height={95}
          className="h-[95px] w-[95px]"
        />
      </div>
    </div>
  );
}
