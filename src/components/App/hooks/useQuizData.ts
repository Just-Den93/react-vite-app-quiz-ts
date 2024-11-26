// src/hooks/useQuizData.ts
import { useState, useEffect } from 'react';
import { loadUniqueUuids } from '../../../utils/loadJsonData';
import type { QuizData } from '../../../types/quiz.types';

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueData = await loadUniqueUuids();
        console.log('Завантажені дані тесту:', uniqueData);
        setQuizData(uniqueData);
      } catch (err) {
        console.error('Помилка завантаження даних тесту:', err);
        setError('Помилка завантаження даних');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { quizData, isLoading, error };
};