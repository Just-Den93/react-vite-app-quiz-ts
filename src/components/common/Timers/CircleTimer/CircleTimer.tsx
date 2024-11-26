import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from './CircleTimer.module.scss';

interface CircleTimerProps {
  duration: number;
  onComplete: () => void;
}

const formatRemainingTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const CircleTimer: React.FC<CircleTimerProps> = ({ duration, onComplete }) => {
  return (
    <div className={styles.circleTimer}>
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={onComplete}
      >
        {({ remainingTime }) => {
          const isPulse = remainingTime <= 5;

          return (
            <div className={`${styles.remainingTime} ${isPulse ? styles.pulse : ''}`}>
              {formatRemainingTime(remainingTime)}
            </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default CircleTimer;