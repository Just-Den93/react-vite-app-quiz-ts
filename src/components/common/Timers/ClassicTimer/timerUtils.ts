// src/components/common/Timer/timerUtils.ts
import { useState, useEffect, useCallback } from 'react';

interface TimeFormat {
  minutes: string;
  seconds: string;
}

interface UseTimerReturn {
  seconds: number;
  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  handleForceStop: () => void;
  formattedTime: TimeFormat;
}

/**
 * Форматирует число в двузначный формат с ведущим нулем
 */
const formatTimeUnit = (unit: number): string => {
  return unit.toString().padStart(2, '0');
};

/**
 * Преобразует общее количество секунд в формат минут и секунд
 */
const formatTime = (totalSeconds: number): TimeFormat => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return {
    minutes: formatTimeUnit(minutes),
    seconds: formatTimeUnit(seconds)
  };
};

/**
 * Хук для управления таймером
 * @param duration - Длительность таймера в секундах
 * @param onEnd - Callback, вызываемый по окончанию таймера
 * @param onForceStop - Callback, вызываемый при принудительной остановке
 */
export const useTimer = (
  duration: number,
  onEnd: () => void,
  onForceStop: () => void
): UseTimerReturn => {
  const [seconds, setSeconds] = useState<number>(duration);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onEnd]);

  const handleForceStop = useCallback(() => {
    setSeconds(0);
    onForceStop();
  }, [onForceStop]);

  const formattedTime = formatTime(seconds);

  return {
    seconds,
    hovered,
    setHovered,
    handleForceStop,
    formattedTime
  };
};

// Тестовые утилиты для Timer
export const createTestUtils = () => {
  let mockInterval: NodeJS.Timeout;
  
  const advanceTimer = (ms: number) => {
    if (mockInterval) {
      clearInterval(mockInterval);
    }
    jest.advanceTimersByTime(ms);
  };

  const cleanup = () => {
    if (mockInterval) {
      clearInterval(mockInterval);
    }
  };

  return {
    advanceTimer,
    cleanup
  };
};

// Создаем и экспортируем тестовые утилиты
export const testUtils = createTestUtils();