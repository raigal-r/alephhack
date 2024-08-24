import React from 'react';
import Button from '../ui/Button';
import { IconPlus, IconSwords, IconApple, IconSword, IconShield, IconShoe } from '@tabler/icons-react';
import { useGameStage } from '../providers/GameStageProvider';
import Image from 'next/image'

export default function SelectMeme() {
  const { gameStage, setGameStage } = useGameStage();

  const handleStakeMeme = () => {
    console.log('staking meme');
  };

  return (
    <div className=" flex flex-col w-[]  items-center justify-between h-full ">
      <Button onClick={() => handleStakeMeme()}>
        <IconPlus />
        Stake meme
      </Button>
      <div className="flex p-2 text-black w-full justify-between">
        <div className="text-xl">
          Select your memes
        </div>
        <div>
          2/3
        </div>
        </div>

<div className=" snap-y max-h-[500px] w-full p-2 overflow-scroll "> 
     
      <div className=" w-full flex border-2 gap-3 border-black mb-2 p-4 text-black list-none cursor-pointer ">
        <div className="">
          <div className="min-w-[100px]">
            <div>$ MAGAIBA</div>
          <Image
                src="/images/memes/magaiba.png"
                width={95}
                height={95}
              />
          </div>
        </div>
        <div>
          <div className="pb-2">LVL 51</div>
          <div className="flex flex-wrap gap-4">
          <div className="flex gap-2"><IconApple /><span>594</span></div>
          <div className="flex gap-2"><IconSword /><span>594</span></div>
          <div className="flex gap-2"> <Image
                src="/images/stats/critico.svg"
                width={22}
                height={22}
              /><span> 594</span></div>
              <div className="flex gap-2"><IconShoe /><span>594</span></div>
              <div className="flex gap-2"><IconShield /><span>594</span></div> 
            
          </div>
        </div>
      </div>

      <div className=" w-full flex border-4 gap-3 border-black mb-2 p-4 text-black list-none cursor-pointer bg-[#FEF9C3] ">
        <div className="">
          <div className="min-w-[100px]">
            <div>$ MAGAIBA</div>
          <Image
                src="/images/memes/magaiba.png"
                width={95}
                height={95}
              />
          </div>
        </div>
        <div>
          <div className="pb-2">LVL 51</div>
          <div className="flex flex-wrap gap-4">
          <div className="flex gap-2"><IconApple /><span>594</span></div>
          <div className="flex gap-2"><IconSword /><span>594</span></div>
          <div className="flex gap-2"> <Image
                src="/images/stats/critico.svg"
                width={22}
                height={22}
              /><span> 594</span></div>
              <div className="flex gap-2"><IconShoe /><span>594</span></div>
              <div className="flex gap-2"><IconShield /><span>594</span></div> 
            
          </div>
        </div>
      </div>


      <div className=" w-full flex border-2 gap-3 border-black mb-2 p-4 text-black list-none cursor-pointer ">
        <div className="">
          <div className="min-w-[100px]">
            <div>$ MAGAIBA</div>
          <Image
                src="/images/memes/magaiba.png"
                width={95}
                height={95}
              />
          </div>
        </div>
        <div>
          <div className="pb-2">LVL 51</div>
          <div className="flex flex-wrap gap-4">
          <div className="flex gap-2"><IconApple /><span>594</span></div>
          <div className="flex gap-2"><IconSword /><span>594</span></div>
          <div className="flex gap-2"> <Image
                src="/images/stats/critico.svg"
                width={22}
                height={22}
              /><span> 594</span></div>
              <div className="flex gap-2"><IconShoe /><span>594</span></div>
              <div className="flex gap-2"><IconShield /><span>594</span></div> 
            
          </div>
        </div>
      </div>


      <div className=" w-full flex border-4 gap-3 border-black mb-2 p-4 text-black list-none cursor-pointer bg-[#FEF9C3] ">
        <div className="">
          <div className="min-w-[100px]">
            <div>$ MAGAIBA</div>
          <Image
                src="/images/memes/magaiba.png"
                width={95}
                height={95}
              />
          </div>
        </div>
        <div>
          <div className="pb-2">LVL 51</div>
          <div className="flex flex-wrap gap-4">
          <div className="flex gap-2"><IconApple /><span>594</span></div>
          <div className="flex gap-2"><IconSword /><span>594</span></div>
          <div className="flex gap-2"> <Image
                src="/images/stats/critico.svg"
                width={22}
                height={22}
              /><span> 594</span></div>
              <div className="flex gap-2"><IconShoe /><span>594</span></div>
              <div className="flex gap-2"><IconShield /><span>594</span></div> 
            
          </div>
        </div>
      </div>






      </div>



      <Button onClick={() => setGameStage('battlePreparation')}>
        <IconSwords />
        Start fight
      </Button>
    </div>
  );
}
