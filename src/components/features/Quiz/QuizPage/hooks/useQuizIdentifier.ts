import { useEffect } from 'react';
import { useUIContext } from '../../../../../context/UIContext';
import { useDataContext } from '../../../../../context/DataContext';
import { loadUniqueUuids } from '../../../../../utils/loadJsonData';

export const useQuizIdentifier = () => {
  const { 
    setCurrentQuizId, 
    setSelectedMode, 
    setShowQuizPage,
  } = useUIContext();
  const { 
    setQuizStates 
  } = useDataContext();

  useEffect(() => {
    // Восстанавливаем состояние из localStorage
    const storedQuizId = localStorage.getItem('currentQuizId');
    const storedMode = localStorage.getItem('selectedMode');
    const storedShowQuizPage = localStorage.getItem('showQuizPage');
    const storedQuizStates = localStorage.getItem('quizStates');

    if (storedQuizId && storedMode) {
      // Проверяем существование викторины с таким ID
      const quizzes = loadUniqueUuids();
      const quizExists = quizzes.some(quiz => quiz.uuid === storedQuizId);

      if (quizExists) {
        setCurrentQuizId(storedQuizId);
        setSelectedMode(Number(storedMode));
        
        if (storedShowQuizPage === 'true') {
          setShowQuizPage(true);
        }

        if (storedQuizStates) {
          try {
            const parsedStates = JSON.parse(storedQuizStates);
            setQuizStates(parsedStates);
          } catch (error) {
            console.error('Failed to parse quiz states:', error);
          }
        }
      } else {
        // Если викторина не найдена, очищаем localStorage
        localStorage.removeItem('currentQuizId');
        localStorage.removeItem('selectedMode');
        localStorage.removeItem('showQuizPage');
        localStorage.removeItem('quizStates');
      }
    }
  }, [setCurrentQuizId, setSelectedMode, setShowQuizPage, setQuizStates]);
};