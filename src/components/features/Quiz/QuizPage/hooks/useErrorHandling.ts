// src/components/features/Quiz/QuizPage/hooks/useErrorHandling.ts
import { useState, useEffect } from 'react';

export const useErrorHandling = (currentQuizId: string | null) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!currentQuizId) {
      setHasError(true);
      setErrorMessage('Помилка: ID вікторини не знайдено');
    } else {
      setHasError(false);
      setErrorMessage('');
    }
  }, [currentQuizId]);

  return { hasError, errorMessage };
};

export {}; 