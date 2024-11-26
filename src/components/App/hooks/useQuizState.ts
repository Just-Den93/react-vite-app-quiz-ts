// src/hooks/useQuizState.ts
import { useEffect } from 'react';
import { useQuizContext } from '../../../context/QuizContext';

export const useQuizState = () => {
  const { setCurrentQuizId, setSelectedMode, setShowQuizPage } = useQuizContext();

  useEffect(() => {
    const savedQuizId = localStorage.getItem('currentQuizId');
    const savedMode = localStorage.getItem('selectedMode');
    const savedShowQuizPage = localStorage.getItem('showQuizPage');

    console.log('Збережений стан:', { savedQuizId, savedMode, savedShowQuizPage });

    if (savedShowQuizPage === 'true' && !savedQuizId) {
      localStorage.removeItem('showQuizPage');
      setShowQuizPage(false);
      return;
    }

    if (savedQuizId && savedMode) {
      setCurrentQuizId(savedQuizId);
      setSelectedMode(Number(savedMode));
      setShowQuizPage(savedShowQuizPage === 'true');
    }
  }, [setCurrentQuizId, setSelectedMode, setShowQuizPage]);
};