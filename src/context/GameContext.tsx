// src/context/GameContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import type { GameState, GameActions } from '../types/quiz.types';

const initialGameState: GameState = {
  timerStarted: false,
  timerEnded: false,
  showAnswer: false,
};

const gameReducer = (state: GameState, action: any): GameState => {
  switch (action.type) {
    case 'START_TIMER':
      return { ...state, timerStarted: true };
    case 'END_TIMER':
      return { ...state, timerEnded: true };
    case 'RESET_TIMER':
      return { ...state, timerStarted: false, timerEnded: false };
    case 'SHOW_ANSWER':
      return { ...state, showAnswer: true };
    case 'HIDE_ANSWER':
      return { ...state, showAnswer: false };
    default:
      return state;
  }
};

interface GameContextValue {
  gameState: GameState;
  gameActions: GameActions;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, dispatchGame] = useReducer(gameReducer, initialGameState);

  const gameActions: GameActions = useMemo(
    () => ({
      startTimer: () => dispatchGame({ type: 'START_TIMER' }),
      endTimer: () => dispatchGame({ type: 'END_TIMER' }),
      resetTimer: () => dispatchGame({ type: 'RESET_TIMER' }),
      showAnswer: () => dispatchGame({ type: 'SHOW_ANSWER' }),
      hideAnswer: () => dispatchGame({ type: 'HIDE_ANSWER' }),
    }),
    []
  );

  const contextValue: GameContextValue = {
    gameState,
    gameActions,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};