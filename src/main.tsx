import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { UIProvider } from './context/UIContext';
import { DataProvider } from './context/DataContext';
import { GameProvider } from './context/GameContext';
import Sidebar from './components/layout/Sidebar/Sidebar';
import QuizCard from './components/features/Quiz/QuizCard/QuizCard';
import QuizPage from './components/features/Quiz/QuizPage/QuizPage';
import { ModalProvider } from './context/ModalContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

const AppContent: React.FC = () => {
  return (
    <App
      Sidebar={Sidebar}
      QuizCard={QuizCard}
      QuizPage={QuizPage}
      selectedMode={2}
      currentQuizId="quiz_1"
    />
  );
};

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <UIProvider>
      <ModalProvider>
        <GameProvider>
          <DataProvider selectedMode={2} currentQuizId="quiz_1">
            <AppContent />
          </DataProvider>
        </GameProvider>
      </ModalProvider>
    </UIProvider>
  </React.StrictMode>
);