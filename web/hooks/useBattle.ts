'use client';
import { useState, useEffect, useCallback } from 'react';

interface MemeState {
  id: string;
  health: number;
  powers: { name: string }[];
}

interface BattleState {
  battleStarted: boolean;
  opponentId: string | null;
  playerMemes: Record<string, MemeState>;
  opponentMemes: Record<string, MemeState>;
}

export function useBattle() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [battleState, setBattleState] = useState<BattleState>({
    battleStarted: false,
    opponentId: null,
    playerMemes: {},
    opponentMemes: {},
  });

  useEffect(() => {
    // Genera el playerId solo en el cliente después del montaje
    setPlayerId(Math.floor(Math.random() * 100).toString());
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:443');

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log({ data });

      if (data.status === 'battle_started') {
        setBattleState({
          battleStarted: true,
          opponentId: data.opponentId,
          playerMemes: data.playerMemes,
          opponentMemes: data.opponentMemes,
        });
      } else if (data.status === 'attack_successful') {
        setBattleState((prevState) => {
          const updatedOpponentMemes = Object.values(
            prevState.opponentMemes
          ).map((meme) =>
            meme.id === data.targetMemeId
              ? { ...meme, health: data.opponentMemeHealth }
              : meme
          );
          const updatedOpponentMemesObject = updatedOpponentMemes.reduce(
            (acc, meme) => {
              acc[meme.id] = meme;
              return acc;
            },
            {} as Record<string, MemeState>
          );

          return {
            ...prevState,
            opponentMemes: updatedOpponentMemesObject,
          };
        });
      } else if (data.status === 'attacked') {
        setBattleState((prevState) => {
          const updatedPlayerMemes = Object.values(prevState.playerMemes).map(
            (meme) =>
              meme.id === data.targetMemeId
                ? { ...meme, health: data.opponentMemeHealth }
                : meme
          );
          const updatedPlayerMemesObject = updatedPlayerMemes.reduce(
            (acc, meme) => {
              acc[meme.id] = meme;
              return acc;
            },
            {} as Record<string, MemeState>
          );
          return {
            ...prevState,
            playerMemes: updatedPlayerMemesObject,
          };
        });
      } else if (data.status === 'battle_ended') {
        console.log('FIN GANASTE!');
        console.log(data.winnerId);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    return () => {
      socket.close();
    };
  }, []);

  const joinBattle = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN && playerId) {
      const joinPayload = {
        action: 'join',
        playerId,
      };
      ws.send(JSON.stringify(joinPayload));
    }
  }, [ws, playerId]);

  const attack = useCallback(
    (memeId: string, powerDamage: number, targetMemeId: string) => {
      if (
        ws &&
        ws.readyState === WebSocket.OPEN &&
        battleState.opponentId &&
        playerId
      ) {
        const attackPayload = {
          action: 'attack',
          playerId,
          opponentId: battleState.opponentId,
          memeId,
          targetMemeId,
          powerDamage,
        };
        ws.send(JSON.stringify(attackPayload));
      }
    },
    [ws, battleState.opponentId, playerId]
  );

  return {
    battleState,
    joinBattle,
    attack,
    playerId,
  };
}
