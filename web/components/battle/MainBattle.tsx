import React, { useEffect } from 'react';
import { useBattle } from '../../hooks/useBattle';
import { IconApple, IconSword, IconShoe, IconShield } from '@tabler/icons-react';
import Image from 'next/image'

export default function MainBattle() {
  const { battleState, joinBattle, attack, playerId } = useBattle();

  useEffect(() => {
    joinBattle();
  }, [joinBattle]);

  const handleAttack = (
    memeId: string,
    powerName: string,
    targetMemeId: string
  ) => {
    attack(memeId, powerName, targetMemeId);
  };
  return (
    <>{/* 
      {' '}
      <h1>Battle Arena</h1>
      <p>Your Player ID: {playerId}</p>
      {battleState.battleStarted ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h2>Your Memes</h2>
            {Object.values(battleState.playerMemes).map((meme) => (
              <div
                key={meme.id}
                style={{
                  border: '1px solid gray',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                <h3>{meme.id}</h3>
                <p>Health: {meme.health}</p>
                <p>Powers:</p>
                {meme.powers.map((power) => (
                  <span key={power.name} style={{ marginRight: '10px' }}>
                    {power.name}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div>
            <h2>Opponents Memes</h2>
            {Object.values(battleState.opponentMemes).map((meme) => (
              <div
                key={meme.id}
                style={{
                  border: '1px solid gray',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                <h3>{meme.id}</h3>
                <p>Health: {meme.health}</p>
                <div>
                  <p>Attack with:</p>
                  {Object.values(battleState.playerMemes).map((playerMeme) =>
                    playerMeme.powers.map((power) => (
                      <button
                        key={power.name}
                        onClick={() =>
                          handleAttack(playerMeme.id, power.name, meme.id)
                        }
                      >
                        {playerMeme.id} uses {power.name} on {meme.id}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Finding a battle... Please wait.</p>
      )} */}
<div className="p-2">
      <div className="flex w-full  justify-between">
      <div className="  text-2xl items-center"> <h2>BATTLE TIME!</h2></div>
      <div className=" text-xl ">Round 1</div>
      </div>

<div>
      <div className="text-center text-3xl">
        YOUR TURN
      </div>
{/* <div className="border-2 text-center border-black my-2 text-red-800 animate-pulse">Double or nothing</div> */}
</div>
<div className="flex w-full justify-between gap-6">
<div className="w-1/2 ">
        <div className="flex justify-between">
          <div className="text-blue-800">You</div>
          <div>Lvl 51</div>
        </div>
        
          

        <div className=" flex justify-between gap-2 items-center">
          <div className="flex ">HP <IconApple /></div>
          <div className="flex w-full items-center  bg-black  dark:bg-gray-700 h-5">
    <div className="bg-red-600 text-xs font-bold pt-1 text-blue-100 text-center h-5  leading-none w-[60%]" > 60%</div>
  </div>
        </div>
        <div>
        
        </div>
        
        <div>
        <Image
                src="/images/pets/pet-bonk.png"
                width={151}
                height={151}
                alt='Pet'
              />
        </div>
        <div className="flex flex-wrap gap-2 mt-4 max-w-[150px] justify-center">
          <div className="flex gap-2"><IconSword /><span>594</span></div>
          <div className="flex gap-2"> <Image
                src="/images/stats/critico.svg"
                width={22}
                height={22}
              /><span>%5</span></div>
              <div className="flex gap-2"><IconShoe /><span>594</span></div>
              <div className="flex gap-2"><IconShield /><span>594</span></div> 
            
          </div>
      </div>
      <div className="w-1/2">
      <div className="flex justify-between">
          <div className="text-red-800">Enemy</div>
          <div>Lvl 51</div>
        </div>
      <div className=" flex justify-between gap-2 items-center">
          <div className="flex ">HP <IconApple /></div>
          <div className="flex w-full items-center  bg-black  dark:bg-gray-700 h-5">
    <div className="bg-red-600 text-xs font-bold pt-1 text-blue-100 text-center h-5  leading-none w-[60%]" > 60%</div>
  </div>
        </div>
        <div>
       
        </div>
      
        <div>
        <Image
                src="/images/pets/pet-magaiba.png"
                width={151}
                height={151}
                alt='Pet'
              />
        </div>
        <div className="flex flex-wrap gap-2 mt-4 max-w-[150px] justify-center">
          <div className="flex gap-2"><IconSword /><span>594</span></div>
          <div className="flex gap-2"> <Image
                src="/images/stats/critico.svg"
                width={22}
                height={22}
              /><span>%5</span></div>
              <div className="flex gap-2"><IconShoe /><span>594</span></div>
              <div className="flex gap-2"><IconShield /><span>594</span></div> 
            
          </div>
          </div>


</div>

<div className="text-center text-2xl pt-4">
  Pick your next move
</div>

<div className="flex flex-wrap w-full">
<div className="pt-4 flex flex-wrap justify-center gap-4 ">
<div className="p-2  justify-center bg-black text-white gap-2">  
              
            <div className=""><Image
                src="/images/cards/bonk-cards/home-run-hit.png"
               width={119}
               height={119}
              /></div>
            <div className="gap">
              <div className="text-xl">Home run hit</div>
             
            </div>  
              
              </div>

              <div className="p-2  justify-center bg-black text-white gap-2">  
              
            <div className=""><Image
                src="/images/cards/bonk-cards/golden-bat.png"
               width={119}
               height={119}
              /></div>
            <div className="gap">
              <div className="text-xl">Golden bat</div>
             
            </div>  
              
              </div>
              <div className="p-2  justify-center bg-black text-white gap-2">  
              
            <div className=""><Image
                src="/images/cards/bonk-cards/running-attack.png"
               width={119}
               height={119}
              /></div>
            <div className="gap">
              <div className="text-xl">Running attack</div>
             
            </div>  
              
              </div>
              <div className="p-2  justify-center bg-black text-white gap-2">  
              
            <div className=""><Image
                src="/images/cards/bonk-cards/bat-block.png"
               width={119}
               height={119}
              /></div>
            <div className="gap">
              <div className="text-xl">Bat block</div>
             
            </div>  
              
              </div>

              

             


              </div>

              


{/* <div>   <Image
                src="/images/cards/bonk-cards/card-bonk-3.png"
                width={151}
                height={77}
              /></div> */}
</div>
     
</div>
    </>
  );
}
