// Modal.tsx
import React from 'react';
import styles from './Modal.module.scss';
import type { QuizBlock } from '../../../types/quiz.types';
import type { GameModeProps, GameBlock } from '../../../types/gameModes.types';
import CircleTimer from '../Timers/CircleTimer/CircleTimer';

interface ModalProps {
  block: QuizBlock | null;
  categoryName: string;
  onClose: () => void;
  modeComponent?: React.ComponentType<GameModeProps>;
  timerState?: { timerStarted: boolean; timerEnded: boolean };
  timerHandlers?: { startTimer: () => void; endTimer: () => void; resetTimer: () => void };
  answerState?: { showAnswer: boolean };
  answerHandlers?: { showAnswer: () => void; hideAnswer: () => void };
  onSelectCategory?: (categoryId: string, blockId: number) => void;
  isBlockUsed?: boolean;
  warningMessage?: React.ReactNode;
  showTimer?: boolean;
  timerDuration?: number;
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
  showTimer,
  timerDuration = 30,
}) => {
  if (!block && !showTimer) {
    return null;
  }

  const gameBlock: GameBlock | undefined = block
    ? {
        id: block.id,
        question: block.question,
        text: block.text,
        options: block.options ?? [],
        categoryId: block.categoryId ?? '',
        'correct answer': block['correct answer'] ?? 'Ответ не указан',
      }
    : undefined;

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        {showTimer ? (
          <CircleTimer duration={timerDuration} onComplete={onClose} />
        ) : isBlockUsed ? (
          warningMessage
        ) : (
          ModeComponent &&
          gameBlock && (
            <ModeComponent
              block={gameBlock}
              categoryName={categoryName}
              showAnswer={answerState?.showAnswer || false}
              setTimerStarted={timerHandlers?.startTimer}
              timerStarted={timerState?.timerStarted || false}
              timerEnded={timerState?.timerEnded || false}
              handleTimerEnd={timerHandlers?.endTimer}
              handleShowAnswer={answerHandlers?.showAnswer}
              handleSelectCategory={() => onSelectCategory?.(gameBlock.categoryId, gameBlock.id)}
              handleForceStop={timerHandlers?.resetTimer}
            />
          )
        )}
      </div>
    </div>
  );
};

export default React.memo(Modal);