// gameModes.types.ts
import type { FC } from 'react';

export interface GameBlock {
  id: number;
  question: string;
  text: string;
  options: string[];
  categoryId: string;
  'correct answer': string;
}

export interface GameModeProps {
  block: GameBlock;
  categoryName: string;
  showAnswer: boolean;
  setTimerStarted?: (value: boolean) => void;
  timerStarted?: boolean;
  timerEnded?: boolean;
  handleTimerEnd?: () => void;
  handleShowAnswer?: () => void;
  handleSelectCategory: (categoryId: string, blockId: number) => void;
  handleForceStop?: () => void;
}

export type GameModeComponent = FC<GameModeProps>;

export interface GameModeConfig {
  id: number;
  name: string;
  component: GameModeComponent;
  options?: {
    timerDuration?: number;
    allowHints?: boolean;
    maxAttempts?: number;
  };
}