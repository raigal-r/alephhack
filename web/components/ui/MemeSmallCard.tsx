import React from 'react';
import { MemeData } from '../battle/BattlePreparation';
import Image from 'next/image';

export default function MemeSmallCard({ lvl, name, img }: MemeData) {
  return (
    <div className="flex flex-col items-center justify-center border-black border-2 rounded p-2">
      <div className="flex gap-2 ">
        <h4 className="text-xl">{name}</h4>
        <p className="m-0">Lvl: {lvl}</p>
      </div>
      <div>
        <Image
          src={img}
          alt={name}
          width={95}
          height={95}
          className="h-[95px] w-[95px]"
        />
      </div>
    </div>
  );
}
