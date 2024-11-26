// quizPageUtils.ts
import { Category, QuizState, QuizBlock } from '../../../../types/quiz.types';
import { Dispatch, SetStateAction } from 'react';

// Создаем и экспортируем все функции через объект Utils
const Utils = {
  getTotalBlocks: (data: Category[] | null): number => {
    if (!data) return 0;
    return data.reduce((acc, category) => acc + (category.blocks?.length || 0), 0);
  },

  getUsedBlocksCount: (currentQuizState: QuizState): number => {
    if (!currentQuizState.usedBlocks) return 0;
    return Object.values(currentQuizState.usedBlocks).reduce(
      (acc, categoryBlocks) => acc + categoryBlocks.length,
      0
    );
  },

  handleBlockSelect: (
    block: QuizBlock,
    category: Category,
    currentQuizState: QuizState,
    setSelectedBlock: Dispatch<SetStateAction<QuizBlock | null>>,
    setSelectedCategory: Dispatch<SetStateAction<Category | null>>,
    setIsBlockUsed: Dispatch<SetStateAction<boolean>>
  ): void => {
    setSelectedBlock(block);
    setSelectedCategory(category);
    setIsBlockUsed(
      !!currentQuizState.usedBlocks?.[category.id]?.includes(block.id)
    );
  },

  handleCloseModal: (
    setSelectedBlock: Dispatch<SetStateAction<QuizBlock | null>>,
    setSelectedCategory: Dispatch<SetStateAction<Category | null>>,
    setIsBlockUsed: Dispatch<SetStateAction<boolean>>
  ): void => {
    setSelectedBlock(null);
    setSelectedCategory(null);
    setIsBlockUsed(false);
  },

  handleNewGame: (
    currentQuizId: string,
    setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>,
    setConfettiRunning: Dispatch<SetStateAction<boolean>>,
    setShowEndMessage: Dispatch<SetStateAction<boolean>>
  ): void => {
    setQuizStates((prevStates) => {
      const currentGameState = prevStates[currentQuizId] || {};
      const completedGames = (currentGameState.completedGames || 0) + 1;

      const newState = {
        ...prevStates,
        [currentQuizId]: {
          ...currentGameState,
          usedBlocks: {},
          completedGames,
        },
      };

      localStorage.setItem('quizStates', JSON.stringify(newState));
      return newState;
    });

    setConfettiRunning(false);
    setShowEndMessage(false);
  },

  handleSelectCategory: (
    categoryId: string,
    blockId: number,
    currentQuizId: string,
    markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void,
    totalBlocks: number,
    usedBlocksCount: number,
    setConfettiRunning: Dispatch<SetStateAction<boolean>>,
    setShowEndMessage: Dispatch<SetStateAction<boolean>>,
    handleCloseModal: () => void
  ): void => {
    markBlockAsUsed(currentQuizId, categoryId, blockId);

    if (usedBlocksCount + 1 === totalBlocks) {
      setConfettiRunning(true);
      setShowEndMessage(true);
    }

    handleCloseModal();
  }
};

export default Utils;