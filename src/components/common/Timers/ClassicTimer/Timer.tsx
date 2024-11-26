// src/components/common/Timer/Timer.tsx
import React from 'react';
import styles from './Timer.module.scss';
import { useTimer } from './timerUtils';

interface TimerProps {
 duration: number;
 onEnd: () => void;
 onForceStop: () => void;
 forceStopped?: boolean;
}

interface TimeDisplay {
 minutes: string;
 seconds: string;
}

const Timer: React.FC<TimerProps> = ({ 
 duration, 
 onEnd, 
 onForceStop,
 forceStopped = false 
}) => {
 const { 
   seconds,
   hovered,
   setHovered,
   handleForceStop,
   formattedTime
 } = useTimer(duration, onEnd, onForceStop);

 const renderDigits = React.useCallback(({ minutes, seconds }: TimeDisplay) => {
   return (
     <>
       <span className={styles.digit}>{minutes[0]}</span>
       <span className={styles.digit}>{minutes[1]}</span>
       <span className={styles.colon}>:</span>
       <span className={styles.digit}>{seconds[0]}</span>
       <span className={styles.digit}>{seconds[1]}</span>
     </>
   );
 }, []);

 return (
   <div
     className={styles.timerContainer}
     onMouseEnter={() => setHovered(true)}
     onMouseLeave={() => setHovered(false)}
     role="timer"
     aria-label={`${formattedTime.minutes}:${formattedTime.seconds} залишилось`}
   >
     <div className={styles.timer}>
       {renderDigits(formattedTime)}
     </div>
     {hovered && !forceStopped && (
       <button 
         className={styles.forceStopButton} 
         onClick={handleForceStop}
         aria-label="Зупинити таймер"
       >
         СПИНИТИ
       </button>
     )}
   </div>
 );
};

export default React.memo(Timer);