import type { Dispatch, SetStateAction } from 'react';

type StateSetter = Dispatch<SetStateAction<boolean>>;

export function resetQAState(
  setForceStopped: StateSetter,
  setAnswerShown: StateSetter,
  setLocalTimerStarted: StateSetter
): void {
  setForceStopped(false);
  setAnswerShown(false);
  setLocalTimerStarted(false);
}

export const handleQAActions = {
  startTimer: (setTimerStarted: StateSetter, setLocalTimerStarted: StateSetter): void => {
    setTimerStarted(true);
    setLocalTimerStarted(true);
  },

  forceStop: (handleForceStop: () => void, setForceStopped: StateSetter): void => {
    handleForceStop();
    setForceStopped(true);
  },

  showAnswer: (handleShowAnswer: () => void, setAnswerShown: StateSetter): void => {
    handleShowAnswer();
    setAnswerShown(true);
  },
};