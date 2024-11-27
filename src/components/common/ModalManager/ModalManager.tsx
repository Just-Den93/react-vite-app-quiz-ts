import React from 'react';
import { useModal } from './useModal';
import { gameModeFactory } from './factories/gameModeFactory';
import { useUIContext } from '../../../context/UIContext';
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

const ModalManager: React.FC<ModalManagerProps> = ({
  selectedBlock,
  selectedCategory,
  isBlockUsed,
  onModalClose,
  onBlockRetry,
  onSelectCategory = () => {},
}) => {
  const { modalState, hideModal } = useModal();
  const { selectedMode } = useUIContext();

  // Get the correct mode component based on selectedMode
  const ModeComponent = React.useMemo(() => {
    const component = gameModeFactory.getMode(selectedMode);
    console.log('Selected Mode:', selectedMode);
    console.log('Mode Component:', component);
    return component;
  }, [selectedMode]);

  if (!modalState.modal) {
    return null;
  }

  if (!selectedBlock || !selectedCategory) {
    return null;
  }

  return (
    <Modal
      block={selectedBlock}
      categoryName={selectedCategory?.name ?? 'Без категории'}
      onClose={() => {
        hideModal('modal');
        onModalClose();
      }}
      modeComponent={ModeComponent || (() => <div>Режим не определён</div>)}
      timerState={{ timerStarted: false, timerEnded: false }}
      timerHandlers={{
        startTimer: () => {},
        endTimer: () => {},
        resetTimer: () => {}
      }}
      answerState={{ showAnswer: false }}
      answerHandlers={{
        showAnswer: () => {},
        hideAnswer: () => {}
      }}
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

export default React.memo(ModalManager);