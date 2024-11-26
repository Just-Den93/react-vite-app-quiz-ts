// src/components/features/Quiz/QuizPage/hooks/useDataValidation.ts
import { useState, useEffect } from 'react';
import { Category } from '../../../../../types/quiz.types';

export const useDataValidation = (data: Category[] | null) => {
  const [isDataValid, setIsDataValid] = useState(true);

  useEffect(() => {
    if (!data) {
      setIsDataValid(false);
    } else {
      setIsDataValid(true);
    }
  }, [data]);

  return { isDataValid };
};

export {}; 