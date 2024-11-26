// src/components/features/Game/GameModes/QAMode/QAMode.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import Timer from '../../../../common/Timers/ClassicTimer/Timer';
import { resetQAState } from './QAModeUtils';
import type { GameModeProps } from '../../../../../types/gameModes.types';
import styles from './QAMode.module.scss';

const QAMode: React.FC<GameModeProps> = ({
  block,
  categoryName,
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) => {
  const [localTimerStarted, setLocalTimerStarted] = useState<boolean>(false);
  const [forceStopped, setForceStopped] = useState<boolean>(false);
  const [answerShown, setAnswerShown] = useState<boolean>(false);

  const handleSelectCategoryClick = useCallback(() => {
    if (block && block.categoryId) {
      handleSelectCategory(block.categoryId, block.id);
    }
  }, [block, handleSelectCategory]);

  return (
    <div className={styles.qaModeContainer}>
      <div className={styles.selectedInfo}>
        <div className={styles.infoCategoryName}>{categoryName}</div>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.content}>
        {/* Добавьте сюда содержимое вопроса и ответа */}
      </div>
      <div className={styles.controlBlock}>
        {answerShown && (
          <Button
            variant={BUTTON_VARIANTS.SELECT_CATEGORY}
            onClick={handleSelectCategoryClick}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(QAMode);