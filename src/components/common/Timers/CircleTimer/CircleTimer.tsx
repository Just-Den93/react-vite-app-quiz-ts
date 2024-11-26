// src/components/common/Timers/CircleTimer/CircleTimer.tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Button, BUTTON_VARIANTS } from '../../Button/Button';
import { IoClose } from "react-icons/io5";
import styles from './CircleTimer.module.scss';

interface CircleTimerProps {
  onClose: () => void;
  duration?: number;
}

const CircleTimer: React.FC<CircleTimerProps> = ({ 
  onClose,
  duration = 30 
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number | null>(null);

  const firstSemicircleRef = useRef<HTMLDivElement>(null);
  const secondSemicircleRef = useRef<HTMLDivElement>(null);
  const thirdSemicircleRef = useRef<HTMLDivElement>(null);

  const stopTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsRunning(false);
    startTimeRef.current = null;
  }, []);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    pausedTimeRef.current = null;
    setIsRunning(true);
    setRemainingTime(duration);

    if (firstSemicircleRef.current) {
      firstSemicircleRef.current.style.transform = 'rotate(180deg)';
    }
    if (secondSemicircleRef.current) {
      secondSemicircleRef.current.style.transform = 'rotate(180deg)';
    }
    if (thirdSemicircleRef.current) {
      thirdSemicircleRef.current.style.display = 'none';
    }
  }, [duration]);

  const updateProgress = useCallback((angle: number) => {
    if (!firstSemicircleRef.current || !secondSemicircleRef.current || !thirdSemicircleRef.current) return;

    if (angle > 180) {
      firstSemicircleRef.current.style.transform = 'rotate(180deg)';
      secondSemicircleRef.current.style.transform = `rotate(${angle}deg)`;
      thirdSemicircleRef.current.style.display = 'none';
    } else {
      firstSemicircleRef.current.style.transform = `rotate(${angle}deg)`;
      secondSemicircleRef.current.style.transform = `rotate(${angle}deg)`;
      thirdSemicircleRef.current.style.display = 'block';
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isRunning && startTimeRef.current) {
          pausedTimeRef.current = Date.now();
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        }
      } else {
        if (isRunning && startTimeRef.current && pausedTimeRef.current) {
          const pauseDuration = Date.now() - pausedTimeRef.current;
          startTimeRef.current += pauseDuration;
          pausedTimeRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || !startTimeRef.current) return;

    const animate = () => {
      if (!startTimeRef.current) return;
      
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed / 1000);
      const angle = (remaining / duration) * 360;

      setRemainingTime(remaining);
      updateProgress(angle);

      if (remaining > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        stopTimer();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isRunning, duration, stopTimer, updateProgress]);

  // Расчет минут и секунд
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className={styles.circleContainer}>
          <div ref={firstSemicircleRef} className={styles.semicircle} />
          <div ref={secondSemicircleRef} className={styles.semicircle} />
          <div ref={thirdSemicircleRef} className={styles.semicircle} />
          <div className={styles.innermostCircle}>
            <div className={styles.timerContainer}>
              <div className={styles.timer}>
                <div>{String(minutes).padStart(2, '0')}</div>
                <div className={styles.timerColon}>:</div>
                <div>{String(seconds).padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {!isRunning && (
          <div className={styles.startButtonContainer}>
            <Button 
              variant={BUTTON_VARIANTS.START_TIMER}
              onClick={startTimer}
              ariaLabel="Запустити таймер"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleTimer;