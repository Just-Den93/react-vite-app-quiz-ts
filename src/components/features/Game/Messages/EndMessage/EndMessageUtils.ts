// src/components/features/Game/Messages/EndMessage/EndMessageUtils.ts
import type { Dispatch, SetStateAction } from 'react';
import type { QuizState } from '../../../../../types/quiz.types';

interface StorageKeys {
  readonly data: string;
  readonly usedBlocks: string;
  readonly quizStates: string;
}

const STORAGE_KEYS: StorageKeys = {
  data: 'data-',
  usedBlocks: 'usedBlocks-',
  quizStates: 'quizStates'
} as const;

/**
 * Очищает данные викторины из localStorage
 * @param currentQuizId - ID текущей викторины
 */
const clearQuizStorage = (currentQuizId: string): void => {
  localStorage.removeItem(`${STORAGE_KEYS.data}${currentQuizId}`);
  localStorage.removeItem(`${STORAGE_KEYS.usedBlocks}${currentQuizId}`);
  localStorage.removeItem(STORAGE_KEYS.quizStates);
};

/**
 * Создает начальное состояние для викторины
 * @returns Начальное состояние викторины
 */
const getInitialQuizState = (): QuizState => ({
  usedBlocks: {},
  data: null,
  completedGames: 0
});

/**
 * Сбрасывает состояние викторины
 * @param currentQuizId - ID текущей викторины
 * @param setQuizStates - Функция для обновления состояния викторин
 */
export const resetQuizState = (
  currentQuizId: string,
  setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>
): void => {
  try {
    // Очищаем данные из localStorage
    clearQuizStorage(currentQuizId);

    // Обновляем состояние в контексте
    setQuizStates(prevStates => ({
      ...prevStates,
      [currentQuizId]: getInitialQuizState()
    }));
  } catch (error) {
    console.error('Error resetting quiz state:', error);
    throw new Error('Failed to reset quiz state');
  }
};