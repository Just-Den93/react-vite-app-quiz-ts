import React from 'react';
import styles from './Modal.module.scss';
import type { QuizBlock } from '../../../types/quiz.types';
import type { GameModeProps, GameBlock } from '../../../types/gameModes.types';

interface ModalProps {
  block: QuizBlock | null;
  categoryName: string;
  onClose: () => void;
  modeComponent: React.ComponentType<GameModeProps>;
  timerState: { timerStarted: boolean; timerEnded: boolean };
  timerHandlers: { startTimer: () => void; endTimer: () => void; resetTimer: () => void };
  answerState: { showAnswer: boolean };
  answerHandlers: { showAnswer: () => void; hideAnswer: () => void };
  onSelectCategory: (categoryId: string, blockId: number) => void;
  isBlockUsed: boolean;
  warningMessage: React.ReactNode;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  block,
  categoryName,
  onClose,
  modeComponent: ModeComponent,
  timerState,
  timerHandlers,
  answerState,
  answerHandlers,
  onSelectCategory,
  isBlockUsed,
  warningMessage,
  children,
}) => {
  if (!block) {
    return null;
  }

  const gameBlock: GameBlock = {
    id: block.id,
    question: block.question,
    text: block.text,
    options: block.options ?? [],
    categoryId: block.categoryId ?? '',
    'correct answer': block['correct answer'] ?? 'Ответ не указан',
  };

  // Убираем рендеринг children и меняем условие рендеринга контента
  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        {isBlockUsed ? (
          warningMessage
        ) : (
          <ModeComponent
            block={gameBlock}
            categoryName={categoryName}
            showAnswer={answerState?.showAnswer || false}
            setTimerStarted={timerHandlers?.startTimer}
            timerStarted={timerState?.timerStarted}
            timerEnded={timerState?.timerEnded}
            handleTimerEnd={timerHandlers?.endTimer}
            handleShowAnswer={answerHandlers?.showAnswer}
            handleSelectCategory={() => onSelectCategory?.(gameBlock.categoryId, gameBlock.id)}
            handleForceStop={timerHandlers?.resetTimer}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(Modal);