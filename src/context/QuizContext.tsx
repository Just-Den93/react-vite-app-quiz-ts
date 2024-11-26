import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import type {
  QuizState,
  QuizContextValue,
  Category,
  GameState,
  GameActions,
} from '../types/quiz.types';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { safeStorage, safeJsonParse, handleError } from '../utils/errorHandling';

const initialGameState: GameState = {
  timerStarted: false,
  timerEnded: false,
  showAnswer: false,
};

const initialQuizStatesStorage: { [key: string]: QuizState } = {};

const gameReducer = (state: GameState, action: any): GameState => {
  switch (action.type) {
    case 'START_TIMER':
      return { ...state, timerStarted: true };
    case 'END_TIMER':
      return { ...state, timerEnded: true };
    case 'RESET_TIMER':
      return { ...state, timerStarted: false, timerEnded: false };
    case 'SHOW_ANSWER':
      return { ...state, showAnswer: true };
    case 'HIDE_ANSWER':
      return { ...state, showAnswer: false };
    default:
      return state;
  }
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext должен использоваться внутри QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  // Перенос хуков в компонент
  const [timerState, setTimerState] = useState({
    timerStarted: false,
    timerEnded: false,
  });

  const [answerState, setAnswerState] = useState({
    showAnswer: false,
  });

  const timerHandlers = useMemo(
    () => ({
      startTimer: () => setTimerState((prev) => ({ ...prev, timerStarted: true })),
      endTimer: () => setTimerState((prev) => ({ ...prev, timerEnded: true })),
      resetTimer: () =>
        setTimerState({ timerStarted: false, timerEnded: false }),
    }),
    []
  );

  const answerHandlers = useMemo(
    () => ({
      showAnswer: () => setAnswerState({ showAnswer: true }),
      hideAnswer: () => setAnswerState({ showAnswer: false }),
    }),
    []
  );

  const [showQuizPage, setShowQuizPage] = useState<boolean>(() => {
    const savedValue = safeStorage.getItem('showQuizPage');
    return savedValue === 'true';
  });

  const [selectedMode, setSelectedMode] = useState<number | null>(() => {
    const savedMode = safeStorage.getItem('selectedMode');
    return savedMode ? parseInt(savedMode, 10) : null;
  });

  const [currentQuizId, setCurrentQuizId] = useState<string | null>(() => {
    return safeStorage.getItem('currentQuizId');
  });

  const [quizStates, setQuizStates] = useState<{ [key: string]: QuizState }>(
    () => {
      const savedStates = safeStorage.getItem('quizStates');
      return savedStates
        ? safeJsonParse(savedStates, initialQuizStatesStorage) ?? initialQuizStatesStorage
        : initialQuizStatesStorage;
    }
  );

  const [data, setData] = useState<Category[] | null>(null);

  const [gameState, dispatchGame] = useReducer(gameReducer, initialGameState);

  const gameActions: GameActions = useMemo(
    () => ({
      startTimer: () => dispatchGame({ type: 'START_TIMER' }),
      endTimer: () => dispatchGame({ type: 'END_TIMER' }),
      resetTimer: () => dispatchGame({ type: 'RESET_TIMER' }),
      showAnswer: () => dispatchGame({ type: 'SHOW_ANSWER' }),
      hideAnswer: () => dispatchGame({ type: 'HIDE_ANSWER' }),
    }),
    []
  );

  const updateQuizState = useCallback(
    (uuid: string, newState: Partial<QuizState>) => {
      setQuizStates((prev) => {
        const updatedStates = {
          ...prev,
          [uuid]: { ...prev[uuid], ...newState },
        };
        safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
        return updatedStates;
      });
    },
    []
  );

  const markBlockAsUsed = useCallback(
    (quizId: string, categoryId: string, blockId: number) => {
      setQuizStates((prev) => {
        const currentState = prev[quizId] || { ...initialQuizStatesStorage };
        const currentBlocks = currentState.usedBlocks[categoryId] || [];
        return {
          ...prev,
          [quizId]: {
            ...currentState,
            usedBlocks: {
              ...currentState.usedBlocks,
              [categoryId]: [...currentBlocks, blockId],
            },
          },
        };
      });
    },
    []
  );

  useEffect(() => {
    safeStorage.setItem('showQuizPage', showQuizPage.toString());
  }, [showQuizPage]);

  useEffect(() => {
    if (selectedMode !== null) {
      safeStorage.setItem('selectedMode', selectedMode.toString());
    }
  }, [selectedMode]);

  useEffect(() => {
    if (currentQuizId) {
      safeStorage.setItem('currentQuizId', currentQuizId);
    }
  }, [currentQuizId]);

  useEffect(() => {
    const loadQuizData = async () => {
      if (selectedMode !== null && currentQuizId) {
        try {
          const quizData = await loadJsonDataByMode(selectedMode);
          if (quizData && quizData.categories) {
            setData(quizData.categories);
          } else {
            throw new Error('Некорректные данные викторины');
          }
        } catch (error) {
          handleError(error as Error, 'Ошибка при загрузке данных викторины');
          setData(null);
        }
      }
    };
    loadQuizData();
  }, [selectedMode, currentQuizId]);

  const contextValue = useMemo(
    () => ({
      timerState,
      timerHandlers,
      answerState,
      answerHandlers,
      showQuizPage,
      setShowQuizPage,
      selectedMode,
      setSelectedMode,
      currentQuizId,
      setCurrentQuizId,
      quizStates,
      setQuizStates,
      updateQuizState,
      markBlockAsUsed,
      data,
      gameState,
      gameActions,
      quizActions: {
        updateQuizState,
        markBlockAsUsed,
      },
    }),
    [
      timerState,
      timerHandlers,
      answerState,
      answerHandlers,
      showQuizPage,
      selectedMode,
      currentQuizId,
      quizStates,
      data,
      gameState,
      gameActions,
      updateQuizState,
      markBlockAsUsed,
    ]
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};

export { QuizProvider, QuizContext };
