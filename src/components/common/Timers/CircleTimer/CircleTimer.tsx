import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button, BUTTON_VARIANTS } from '../../Button/Button';
import styles from './CircleTimer.module.scss';

interface CircleTimerProps {
  duration: number;
  onComplete: () => void;
}

const formatRemainingTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const CircleTimer: React.FC<CircleTimerProps> = ({ duration, onComplete }) => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);

  const handleStartTimer = () => {
    if (isTimerStarted) {
      setIsTimerStarted(false);
      setIsTimerCompleted(true);
      onComplete();
    } else {
      setIsTimerStarted(true);
      setIsTimerCompleted(false);
    }
  };

  const handleTimerComplete = () => {
    setIsTimerStarted(false);
    setIsTimerCompleted(true);
    onComplete();
  };

  return (
    <div className={styles.circleTimer}>
      <CountdownCircleTimer
        key={`${duration}-${isTimerStarted}`} // add a unique key when timer should restart
        isPlaying={isTimerStarted}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={handleTimerComplete}
        size={400}
        strokeWidth={20}
      >
        {({ remainingTime }) => {
          const isPulse = remainingTime <= 5 && isTimerStarted;

          return (
            <div className={`${styles.remainingTime} ${isPulse ? styles.pulse : ''}`}>
              {formatRemainingTime(remainingTime)}
            </div>
          );
        }}
      </CountdownCircleTimer>

      <div className={styles.startButtonContainer}>
        <Button
          variant={BUTTON_VARIANTS.START_TIMER}
          onClick={handleStartTimer}
          ariaLabel={isTimerStarted ? 'Stop timer' : 'Start timer'}
        >
        </Button>
      </div>
    </div>
  );
};

export default CircleTimer;