import React, { useState, useEffect } from 'react';
import Image from 'next/image'


export default function BattlePreparation() {


  return (
    <div className="flex flex-col h-full">

<div className="pyro">
  <div className="before"></div>
  <div className="after"></div>
</div>

      <div className="">
      <div className=" text-6xl text-center text-[#257C18]">
        You Win
        </div>
     <div className="flex justify-center gap-2 "><Image
                src="/images/tokens/usdc-icon.webp"
               width={36}
               height={36}
              /><span className="text-3xl text-[#257C18] ">+250</span></div>
     <div>
      <div className="flex justify-center gap-1 mt-12">
      <Image  className="rotate-scale-up"
                src="/images/pets/pet-bonk.png"
               width={95}
               height={95}
              />
              <Image
              className="rotate-scale-up"
                src="/images/pets/pet-magaiba.png"
               width={95}
               height={95}
              />
              <Image
              className="rotate-scale-up"
                src="/images/pets/pet-bonk.png"
               width={95}
               height={95}
              />
      </div>
     </div>
     </div>

     <div className="">
      <div className=" text-6xl text-center text-red-800">
        You Lose
        </div>
     <div className="flex justify-center gap-2 mt-3"><Image
                src="/images/tokens/usdc-icon.webp"
               width={36}
               height={36}
              /><span className="text-3xl text-red-800 ">-250</span></div>
     <div>
      <div className="flex justify-center gap-1 mt-3">
      <Image 
                src="/images/pets/pet-bonk.png"
               width={95}
               height={95}
              />
              <Image
                src="/images/pets/pet-magaiba.png"
               width={95}
               height={95}
              />
              <Image
                src="/images/pets/pet-bonk.png"
               width={95}
               height={95}
              />
      </div>
     </div>
     </div>

    </div>
  );
}
