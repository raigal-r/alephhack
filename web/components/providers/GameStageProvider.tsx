'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Stages = 'selectMeme' | 'stakeMeme' | 'battlePreparation' | 'battle';

interface GameStageContextType {
  gameStage: Stages;
  setGameStage: React.Dispatch<React.SetStateAction<Stages>>;
}

const GameStageContext = createContext<GameStageContextType | undefined>(
  undefined
);

export function GameStageProvider({ children }: { children: ReactNode }) {
  const [gameStage, setGameStage] = useState<Stages>('selectMeme');

  return (
    <GameStageContext.Provider value={{ gameStage, setGameStage }}>
      {children}
    </GameStageContext.Provider>
  );
}

export function useGameStage() {
  const context = useContext(GameStageContext);
  if (context === undefined) {
    throw new Error('useGameStage must be used within a GameStageProvider');
  }
  return context;
}
