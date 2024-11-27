// src/hooks/useQuizState.ts
import { useEffect } from 'react';
import { useUIContext } from '../../../context/UIContext';

export const useQuizState = (currentQuizId: string | null) => {
  const { setCurrentQuizId, setSelectedMode, setShowQuizPage } = useUIContext();

  useEffect(() => {
    const savedMode = localStorage.getItem('selectedMode');
    const savedShowQuizPage = localStorage.getItem('showQuizPage');

    console.log("Состояние useQuizState:", { currentQuizId, savedMode, savedShowQuizPage });
    console.log('Збережений стан:', { currentQuizId, savedMode, savedShowQuizPage });

    if (savedShowQuizPage === 'true' && !currentQuizId) {
      localStorage.removeItem('showQuizPage');
      setShowQuizPage(false);
      return;
    }

    if (currentQuizId && savedMode) {
      setSelectedMode(Number(savedMode));
      setShowQuizPage(savedShowQuizPage === 'true');
    }
  }, [currentQuizId, setSelectedMode, setShowQuizPage]);
};