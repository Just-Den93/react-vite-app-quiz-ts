import type { FC } from 'react';

// Определяем интерфейс для игрового блока
export interface GameBlock {
  id: number;
  question: string;
  text: string;
  options: string[];
  categoryId: string;
  'correct answer': string;
}

// Пропсы для игровых режимов
export interface GameModeProps {
  block: GameBlock;
  categoryName: string;
  showAnswer: boolean;
  setTimerStarted: (value: boolean) => void;
  timerStarted: boolean;
  timerEnded: boolean;
  handleTimerEnd: () => void;
  handleShowAnswer: () => void;
  handleSelectCategory: (categoryId: string, blockId: number) => void;
  handleForceStop: () => void;
}

export type GameModeComponent = FC<GameModeProps>;

// Конфигурация игрового режима
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