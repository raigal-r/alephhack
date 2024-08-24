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
    setPlayerId((Math.floor(Math.random() * 100)).toString());
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:443');

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      
      if (data.status === 'battle_started') {
        setBattleState({
          battleStarted: true,
          opponentId: data.opponentId,
          playerMemes: data.playerMemes,
          opponentMemes: data.opponentMemes,
        });
      } else if (data.status === 'attack_successful' || data.status === 'attacked') {
        setBattleState((prevState) => ({
          ...prevState,
          playerMemes: {
            ...prevState.playerMemes,
            [data.memeId]: {
              ...prevState.playerMemes[data.memeId],
              health: data.playerMemeHealth
            }
          },
          opponentMemes: {
            ...prevState.opponentMemes,
            [data.memeId]: {
              ...prevState.opponentMemes[data.memeId],
              health: data.opponentMemeHealth
            }
          }
        }));
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

  const attack = useCallback((memeId: string, powerName: string, targetMemeId: string) => {
    if (ws && ws.readyState === WebSocket.OPEN && battleState.opponentId && playerId) {
      const attackPayload = {
        action: 'attack',
        playerId,
        opponentId: battleState.opponentId,
        memeId,
        targetMemeId,
        powerName
      };
      ws.send(JSON.stringify(attackPayload));
    }
  }, [ws, battleState.opponentId, playerId]);

  return {
    battleState,
    joinBattle,
    attack,
    playerId,
  };
}
