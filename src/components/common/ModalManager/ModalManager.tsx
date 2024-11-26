import React, { useMemo } from 'react';
import { useModal } from './useModal';
import { gameModeFactory } from './factories/gameModeFactory';
import { useQuizContext } from '../../../context/QuizContext';
import WarningMessage from '../../features/Game/Messages/WarningMessage/WarningMessage';
import Modal from '../Modal/Modal';
import { QuizBlock, Category } from '../../../types/quiz.types';

interface ModalManagerProps {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
  onModalClose: () => void;
  onBlockRetry: () => void;
  onSelectCategory?: (categoryId: string, blockId: number) => void;
  onNewGame: () => void; 
  onMainMenu: () => void; 
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  selectedBlock,
  selectedCategory,
  isBlockUsed,
  onModalClose,
  onBlockRetry,
  onSelectCategory = () => {},
}) => {
  const { modalState, hideModal } = useModal();
  const { selectedMode } = useQuizContext();
  const ModeComponent = gameModeFactory.getMode(selectedMode);

  console.log('Mode Component:', ModeComponent, 'Selected Mode:', selectedMode);

  // Убираем useMemo и меняем логику рендеринга
  const defaultTimerState = {
    timerStarted: false,
    timerEnded: false
  };

  const defaultTimerHandlers = {
    startTimer: () => {},
    endTimer: () => {},
    resetTimer: () => {}
  };

  const defaultAnswerState = {
    showAnswer: false
  };

  const defaultAnswerHandlers = {
    showAnswer: () => {},
    hideAnswer: () => {}
  };

  if (!modalState.modal) {
    return null;
  }

  // Добавляем дополнительную проверку на блок и категорию
  if (!selectedBlock || !selectedCategory) {
    return null;
  }

  return (
    <Modal
      block={selectedBlock}
      categoryName={selectedCategory?.name ?? 'Без категории'}
      onClose={() => hideModal('modal')}
      modeComponent={ModeComponent || (() => <div>Режим не определён</div>)}
      timerState={defaultTimerState}
      timerHandlers={defaultTimerHandlers}
      answerState={defaultAnswerState}
      answerHandlers={defaultAnswerHandlers}
      onSelectCategory={onSelectCategory}
      isBlockUsed={isBlockUsed}
      warningMessage={
        <WarningMessage
          onTryAgain={onBlockRetry}
          onContinue={onModalClose}
          message="Этот блок уже использован. Хотите попробовать ещё раз?"
        />
      }
    />
  );
};

export default ModalManager;