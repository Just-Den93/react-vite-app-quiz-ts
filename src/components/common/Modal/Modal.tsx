import React, { useState, useCallback, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Добавляем небольшую задержку для старта анимации появления
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Ждем завершения анимации перед закрытием
    setTimeout(() => {
      onClose();
    }, 500); // Длительность должна совпадать с CSS transition
  }, [onClose]);

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

  const modalClassName = `${styles.modal} ${isVisible ? styles.show : ''} ${
    isClosing ? styles.hide : ''
  }`;

  return (
    <div className={modalClassName} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={handleClose}>
          &times;
        </span>
        {showTimer ? (
          <CircleTimer duration={timerDuration} onComplete={() => {}} />
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