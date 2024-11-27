import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeStorage } from '../utils/errorHandling';

interface UIContextValue {
  showQuizPage: boolean;
  setShowQuizPage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMode: number;  // Changed from number | null
  setSelectedMode: React.Dispatch<React.SetStateAction<number>>;  // Changed
  currentQuizId: string;  // Changed from string | null
  setCurrentQuizId: React.Dispatch<React.SetStateAction<string>>;
  modalState: {
    isModalOpen: boolean;
    isSettingsOpen: boolean;
    isMenuOpen: boolean;
    isEndMessageVisible: boolean;
    isConfettiRunning: boolean;
  };
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

const UIContext = createContext<UIContextValue | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // Initialize with default values
  const [showQuizPage, setShowQuizPage] = useState<boolean>(() => {
    return safeStorage.getItem('showQuizPage') === 'true';
  });

  const [selectedMode, setSelectedMode] = useState<number>(() => {
    const savedMode = safeStorage.getItem('selectedMode');
    return savedMode ? parseInt(savedMode, 10) : 2;  // Default to mode 2
  });

  const [currentQuizId, setCurrentQuizId] = useState<string>(() => {
    return safeStorage.getItem('currentQuizId') || 'quiz_1';  // Default quiz ID
  });

  const [modalState, setModalState] = useState({
    isModalOpen: false,
    isSettingsOpen: false,
    isMenuOpen: false,
    isEndMessageVisible: false,
    isConfettiRunning: false,
  });

  // Effect to save state changes
  useEffect(() => {
    safeStorage.setItem('showQuizPage', showQuizPage.toString());
  }, [showQuizPage]);

  useEffect(() => {
    safeStorage.setItem('selectedMode', selectedMode.toString());
    console.log('Saving selected mode:', selectedMode);
  }, [selectedMode]);

  useEffect(() => {
    safeStorage.setItem('currentQuizId', currentQuizId);
  }, [currentQuizId]);

  const modalActions = {
    openModal: () => setModalState(prev => ({ ...prev, isModalOpen: true })),
    closeModal: () => setModalState(prev => ({ ...prev, isModalOpen: false })),
    openSettings: () => setModalState(prev => ({ ...prev, isSettingsOpen: true })),
    closeSettings: () => setModalState(prev => ({ ...prev, isSettingsOpen: false })),
    openMenu: () => setModalState(prev => ({ ...prev, isMenuOpen: true })),
    closeMenu: () => setModalState(prev => ({ ...prev, isMenuOpen: false })),
    showEndMessage: () => setModalState(prev => ({ ...prev, isEndMessageVisible: true })),
    hideEndMessage: () => setModalState(prev => ({ ...prev, isEndMessageVisible: false })),
    startConfetti: () => setModalState(prev => ({ ...prev, isConfettiRunning: true })),
    stopConfetti: () => setModalState(prev => ({ ...prev, isConfettiRunning: false })),
  };

  return (
    <UIContext.Provider
      value={{
        showQuizPage,
        setShowQuizPage,
        selectedMode,
        setSelectedMode,
        currentQuizId,
        setCurrentQuizId,
        modalState,
        ...modalActions
      }}
    >
      {children}
    </UIContext.Provider>
  );
};