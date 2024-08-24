import React, { useEffect } from 'react';
import { useBattle } from '../../hooks/useBattle';

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
    <>
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
      )}
    </>
  );
}
