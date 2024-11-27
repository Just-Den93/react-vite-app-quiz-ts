// src/components/App/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import { useUIContext } from '../../context/UIContext';
import { useDataContext } from '../../context/DataContext';
import { useQuizData } from './hooks/useQuizData';
import { useQuizState } from './hooks/useQuizState';
import { startQuizHandler } from './appUtils';
import type { QuizData } from '../../types/quiz.types';

interface AppProps {
  Sidebar: React.ComponentType;
  QuizCard: React.ComponentType<{
    startQuiz: () => void;
    mode: number;
    uuid: string;
    name: string;
    categories: QuizData['categories'];
  }>;
  QuizPage: React.ComponentType;
  selectedMode: number;
  currentQuizId: string;
}

const App: React.FC<AppProps> = ({ Sidebar, QuizCard, QuizPage, selectedMode, currentQuizId }) => {
  const { showQuizPage, setShowQuizPage, setSelectedMode, setCurrentQuizId } = useUIContext();
  const { data } = useDataContext();
  const { quizData, isLoading, error } = useQuizData(data);
  useQuizState(currentQuizId);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (showQuizPage && !currentQuizId) {
    setShowQuizPage(false);
  }

  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <div className={styles.content_wraper}>
          <Routes>
            <Route
              path="/"
              element={
                !showQuizPage ? (
                  <div className={styles.quizCardsContainer}>
                    {quizData.map((data) => (
                      <QuizCard
                        key={data.uuid}
                        startQuiz={() =>
                          startQuizHandler(data.mode, data.uuid, setSelectedMode, setCurrentQuizId, setShowQuizPage)
                        }
                        mode={data.mode}
                        uuid={data.uuid}
                        name={data.name || 'Untitled Quiz'}
                        categories={data.categories}
                      />
                    ))}
                  </div>
                ) : null
              }
            />
          </Routes>
        </div>
        {showQuizPage && currentQuizId && (
          <div className={styles.fullscreen}>
            <QuizPage />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;