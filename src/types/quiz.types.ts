import type { Dispatch, SetStateAction } from 'react';

// Типы для данных викторины
export interface QuizState {
  usedBlocks: { [key: string]: number[] }; // Использованные блоки
  data: Category[] | null; // Данные категорий
  completedGames: number; // Количество завершённых игр
}

export interface Category {
  id: string; // Идентификатор категории
  name: string; // Название категории
  blocks: QuizBlock[]; // Массив блоков викторины
}

export interface QuizBlock {
  id: number; // Идентификатор блока
  question: string; // Вопрос блока
  options?: string[]; // Варианты ответов (если есть)
  text: string; // Текст блока
  categoryId?: string; // Идентификатор категории (опционально)
  'correct answer'?: string; // Правильный ответ (если есть)
}

export interface QuizData {
  uuid: string; // Уникальный идентификатор викторины
  mode: number; // Режим викторины
  name?: string; // Название (опционально)
  categories: Category[]; // Категории викторины
  filename?: string; // Имя файла с данными викторины
}

// Типы для состояния игры
export interface GameState {
  timerStarted: boolean; // Таймер запущен
  timerEnded: boolean; // Таймер завершён
  showAnswer: boolean; // Показан ответ
}

export interface GameActions {
  startTimer: () => void; // Запуск таймера
  endTimer: () => void; // Завершение таймера
  resetTimer: () => void; // Сброс таймера
  showAnswer: () => void; // Показать ответ
  hideAnswer: () => void; // Скрыть ответ
}

// Типы для UI состояния
export interface UIState {
  showQuizPage: boolean; // Показывать страницу викторины
  selectedMode: number | null; // Выбранный режим
  currentQuizId: string | null; // Идентификатор текущей викторины
}

export interface ModalState {
  isModalOpen: boolean; // Модальное окно открыто
  isSettingsOpen: boolean; // Открыты настройки
  isMenuOpen: boolean; // Меню открыто
  isEndMessageVisible: boolean; // Показано сообщение об окончании
  isConfettiRunning: boolean; // Конфетти запущено
}

// Типы для действий UI
export interface UIActions {
  setShowQuizPage: Dispatch<SetStateAction<boolean>>;
  setSelectedMode: Dispatch<SetStateAction<number | null>>;
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>;
  openModal: () => void;
  closeModal: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  showEndMessage: () => void;
  hideEndMessage: () => void;
  startConfetti: () => void;
  stopConfetti: () => void;
}

// Типы для контекстов
export interface DataContextValue {
  data: Category[] | null; // Данные категорий
  quizStates: { [key: string]: QuizState }; // Состояние викторин
  setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>; // Обновление состояния викторин
  updateQuizState: (uuid: string, newState: Partial<QuizState>) => void; // Обновление состояния викторины
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void; // Пометить блок как использованный
}

export interface GameContextValue {
  gameState: GameState; // Состояние игры
  gameActions: GameActions; // Действия игры
}

export interface UIContextValue {
  showQuizPage: boolean; // Показывать страницу викторины
  setShowQuizPage: Dispatch<SetStateAction<boolean>>; // Обновление состояния показа страницы
  selectedMode: number | null; // Выбранный режим
  setSelectedMode: Dispatch<SetStateAction<number | null>>; // Установка режима
  currentQuizId: string | null; // Текущая викторина
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>; // Установка текущей викторины
  modalState: ModalState; // Состояние модальных окон
  openModal: () => void; // Открыть модальное окно
  closeModal: () => void; // Закрыть модальное окно
  openSettings: () => void; // Открыть настройки
  closeSettings: () => void; // Закрыть настройки
  openMenu: () => void; // Открыть меню
  closeMenu: () => void; // Закрыть меню
  showEndMessage: () => void; // Показать сообщение об окончании
  hideEndMessage: () => void; // Скрыть сообщение об окончании
  startConfetti: () => void; // Запустить конфетти
  stopConfetti: () => void; // Остановить конфетти
}
