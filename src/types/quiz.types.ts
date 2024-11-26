import type { Dispatch, SetStateAction } from 'react';

// Типы состояний
export interface QuizState {
  usedBlocks: { [key: string]: number[] };
  data: Category[] | null;
  completedGames: number;
}

export interface GameState {
  timerStarted: boolean;
  timerEnded: boolean;
  showAnswer: boolean;
}

export interface UIState {
  showQuizPage: boolean;
  selectedMode: number | null;
  currentQuizId: string | null;
}

// Действия
export interface GameActions {
  startTimer: () => void;
  endTimer: () => void;
  resetTimer: () => void;
  showAnswer: () => void;
  hideAnswer: () => void;
}

export interface QuizActions {
  updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
  setShowQuizPage: Dispatch<SetStateAction<boolean>>;
  setSelectedMode: Dispatch<SetStateAction<number | null>>;
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>;
}

// Главный тип контекста
export interface QuizContextValue {
  showQuizPage: boolean;
  setShowQuizPage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMode: number | null;
  setSelectedMode: React.Dispatch<React.SetStateAction<number | null>>;
  currentQuizId: string | null;
  setCurrentQuizId: React.Dispatch<React.SetStateAction<string | null>>;
  quizStates: { [key: string]: QuizState };
  setQuizStates: React.Dispatch<React.SetStateAction<{ [key: string]: QuizState }>>;
  updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
  data: Category[] | null;
  gameState: GameState;
  gameActions: GameActions;
  quizActions: {
    updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
    markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
  };
  timerState: {
    timerStarted: boolean;
    timerEnded: boolean;
  };
  timerHandlers: {
    startTimer: () => void;
    endTimer: () => void;
    resetTimer: () => void;
  };
  answerState: {
    showAnswer: boolean;
  };
  answerHandlers: {
    showAnswer: () => void;
    hideAnswer: () => void;
  };
}

export interface QuizBlock {
  id: number;
  question: string;
  options?: string[];
  text: string;
  categoryId?: string;
  'correct answer'?: string;
}

export interface Category {
  id: string;
  name: string;
  blocks: QuizBlock[];
}

export interface QuizData {
  uuid: string;
  mode: number;
  name?: string;
  "quiz name"?: string;
  categories: Category[];
  filename?: string;
}
