import React, { useState, useCallback } from 'react';
import styles from './QuizCard.module.scss';
import { Category } from '../../../../types/quiz.types';

interface QuizCardProps {
  uuid: string;
  mode: number;
  name: string;
  categories: Category[];
  startQuiz: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ uuid, mode, name, categories, startQuiz }) => {
  const [isError, setIsError] = useState(false);

  const handleStartQuiz = useCallback(() => {
    setIsError(false);
    startQuiz();
  }, [startQuiz]);

  return (
    <div onClick={handleStartQuiz}>
      <h3>{name}</h3>
      <p>Mode: {mode}</p>
      <p>Categories: {categories.length}</p>
    </div>
  );
};

export default QuizCard;
