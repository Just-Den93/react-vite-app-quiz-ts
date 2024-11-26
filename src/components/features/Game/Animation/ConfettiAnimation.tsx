// src/components/features/Game/Animation/ConfettiAnimation.tsx
import React, { useEffect, useRef } from 'react';
import { handleError } from '../../../../utils/errorHandling';

interface ConfettiAnimationProps {
  isRunning: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isRunning }) => {
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const safeStartConfetti = React.useCallback(() => {
    try {
      // Здесь можно добавить реальную логику анимации конфетти
      console.log('Confetti animation started');
    } catch (error) {
      if (error instanceof Error) {
        handleError(error, 'Не удалось запустить анимацию фейерверка');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Не удалось запустить анимацию фейерверка');
      }
    }
  }, []);

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(safeStartConfetti, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, safeStartConfetti]);

  return <div data-testid="confetti-animation" />;
};

export default React.memo(ConfettiAnimation);