import { useState, useCallback } from 'react';
import { useQuizContext } from '../../../../../context/QuizContext';
import { useModal } from '../../../../common/ModalManager/useModal';
import { QuizBlock, Category } from '../../../../../types/quiz.types';

interface GameState {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
  setIsBlockUsed: (value: boolean) => void;
}

export function useQuizGameLogic() {
  const { 
    quizStates, 
    currentQuizId, 
    markBlockAsUsed, 
    setShowQuizPage,
    setQuizStates  // Добавить это
  } = useQuizContext();
  const { showModal, hideModal } = useModal();

  const [selectedBlock, setSelectedBlock] = useState<QuizBlock | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isBlockUsed, setIsBlockUsed] = useState(false);

  const gameState: GameState = {
    selectedBlock,
    selectedCategory,
    isBlockUsed,
    setIsBlockUsed
  };

  const handleBlockSelect = useCallback((
    block: QuizBlock & { categoryId: string }, 
    category: Category
  ) => {
    setSelectedBlock(block);
    setSelectedCategory(category);
    setIsBlockUsed(!!quizStates[currentQuizId!]?.usedBlocks?.[category.id]?.includes(block.id));
  }, [currentQuizId, quizStates]);

  const handleModalClose = useCallback(() => {
    setSelectedBlock(null);
    setSelectedCategory(null);
    setIsBlockUsed(false);
  }, []);

  const handleSelectCategory = useCallback((categoryId: string, blockId: number) => {
    if (!currentQuizId) return;
    markBlockAsUsed(currentQuizId, categoryId, blockId);
    handleModalClose();
  }, [currentQuizId, markBlockAsUsed, handleModalClose]);

  const handleNewGame = useCallback(() => {
    if (!currentQuizId) return;
    
    setQuizStates(prevStates => {
      const updatedStates = {
        ...prevStates,
        [currentQuizId]: {
          ...prevStates[currentQuizId],
          usedBlocks: {}
        }
      };
      localStorage.setItem('quizStates', JSON.stringify(updatedStates));
      return updatedStates;
    });
    
    handleModalClose();
    hideModal('endMessage');
  }, [currentQuizId, handleModalClose, hideModal, setQuizStates]);

  const handleMainMenu = useCallback(() => {
    setShowQuizPage(false);
  }, [setShowQuizPage]);

  return {
    gameState,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  };
}