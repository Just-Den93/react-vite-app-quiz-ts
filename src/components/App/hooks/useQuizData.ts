// src/hooks/useQuizData.ts
import { useState, useEffect } from 'react';
import type { QuizData, Category } from '../../../types/quiz.types';

export const useQuizData = (data: Category[] | null) => {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const uniqueData: QuizData[] = [{
        uuid: 'unique-quiz-id',
        mode: 1,
        name: 'Unique Quiz',
        categories: data
      }];
      setQuizData(uniqueData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError('Помилка завантаження даних');
    }
  }, [data]);

  return { quizData, isLoading, error };
};