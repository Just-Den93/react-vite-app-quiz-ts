import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { QuizState, Category } from '../types/quiz.types';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { safeStorage, safeJsonParse } from '../utils/errorHandling';

const initialQuizStatesStorage: { [key: string]: QuizState } = {};

interface DataContextValue {
  data: Category[] | null;
  quizStates: { [key: string]: QuizState };
  setQuizStates: React.Dispatch<React.SetStateAction<{ [key: string]: QuizState }>>;
  updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
  selectedMode: number;
  currentQuizId: string;
}

export const DataProvider: React.FC<DataProviderProps> = ({ 
  children, 
  selectedMode, 
  currentQuizId 
}) => {
  const [quizStates, setQuizStates] = useState<{ [key: string]: QuizState }>(() => {
    const savedStates = safeStorage.getItem('quizStates');
    const initialState = {
      [currentQuizId]: {
        usedBlocks: {},
        data: null,
        completedGames: 0
      }
    };
    return savedStates
      ? safeJsonParse(savedStates, initialState) ?? initialState
      : initialState;
  });

  const [data, setData] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateQuizState = useCallback((uuid: string, newState: Partial<QuizState>) => {
    setQuizStates(prev => {
      const updatedStates = {
        ...prev,
        [uuid]: { ...prev[uuid], ...newState },
      };
      safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
      return updatedStates;
    });
  }, []);

  const markBlockAsUsed = useCallback((quizId: string, categoryId: string, blockId: number) => {
    setQuizStates(prev => {
      const currentState = prev[quizId] || { 
        usedBlocks: {}, 
        data: null, 
        completedGames: 0 
      };
      const currentBlocks = currentState.usedBlocks[categoryId] || [];
      
      const updatedState = {
        ...prev,
        [quizId]: {
          ...currentState,
          usedBlocks: {
            ...currentState.usedBlocks,
            [categoryId]: [...currentBlocks, blockId],
          },
        },
      };
      
      safeStorage.setItem('quizStates', JSON.stringify(updatedState));
      return updatedState;
    });
  }, []);

  useEffect(() => {
    const loadQuizData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const quizData = await loadJsonDataByMode(selectedMode);
        
        if (!quizData) {
          throw new Error('No quiz data returned');
        }

        if (!Array.isArray(quizData.categories)) {
          throw new Error('Categories is not an array');
        }

        if (quizData.categories.length === 0) {
          throw new Error('Categories array is empty');
        }

        setData(quizData.categories);
        
        // Initialize quiz state if it doesn't exist
        setQuizStates(prev => {
          if (!prev[currentQuizId]) {
            const newState = {
              ...prev,
              [currentQuizId]: {
                usedBlocks: {},
                data: null,
                completedGames: 0
              }
            };
            safeStorage.setItem('quizStates', JSON.stringify(newState));
            return newState;
          }
          return prev;
        });

      } catch (err) {
        console.error('Failed to load quiz data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load quiz data');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [selectedMode, currentQuizId]);

  const contextValue: DataContextValue = {
    data,
    quizStates,
    setQuizStates,
    updateQuizState,
    markBlockAsUsed,
  };

  if (isLoading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        Завантаження...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        color: '#e53935',
        backgroundColor: '#ffebee',
        border: '1px solid #ffcdd2',
        borderRadius: '4px',
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Помилка завантаження даних</h3>
        <p style={{ margin: '0' }}>{error}</p>
      </div>
    );
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};