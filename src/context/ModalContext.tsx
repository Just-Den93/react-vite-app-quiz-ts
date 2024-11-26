// src/context/ModalContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';

interface ModalContextValue {
  state: ModalState;
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
  resetModalState: () => void;
}

interface ModalState {
  modal: boolean;
  settings: boolean;
  menu: boolean;
  endMessage: boolean;
  confetti: boolean;
}

type ModalAction =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }  
  | { type: 'OPEN_SETTINGS' }
  | { type: 'CLOSE_SETTINGS' }
  | { type: 'OPEN_MENU' }
  | { type: 'CLOSE_MENU' }
  | { type: 'SHOW_END_MESSAGE' }
  | { type: 'HIDE_END_MESSAGE' }
  | { type: 'START_CONFETTI' }
  | { type: 'STOP_CONFETTI' }
  | { type: 'RESET_STATE' };

const initialState: ModalState = {
  modal: false,
  settings: false,
  menu: false,
  endMessage: false,
  confetti: false
};

// Создаем контекст с начальным значением
const ModalContext = createContext<ModalContextValue>({
  state: initialState,
  openModal: () => {},
  closeModal: () => {},  
  openSettings: () => {},
  closeSettings: () => {},
  openMenu: () => {},
  closeMenu: () => {},
  showEndMessage: () => {},
  hideEndMessage: () => {},
  startConfetti: () => {},
  stopConfetti: () => {},
  resetModalState: () => {}
});

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_MODAL':
      return { ...state, modal: false };
    case 'OPEN_SETTINGS':
      return { ...state, settings: true };
    case 'CLOSE_SETTINGS':
      return { ...state, settings: false };
    case 'OPEN_MENU':
      return { ...state, menu: true };
    case 'CLOSE_MENU':
      return { ...state, menu: false };
    case 'SHOW_END_MESSAGE':
      return { ...state, endMessage: true };
    case 'HIDE_END_MESSAGE':
      return { ...state, endMessage: false };
    case 'START_CONFETTI':
      return { ...state, confetti: true };
    case 'STOP_CONFETTI':
      return { ...state, confetti: false };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = useCallback(() => dispatch({ type: 'OPEN_MODAL' }), []);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), []);
  const openSettings = useCallback(() => dispatch({ type: 'OPEN_SETTINGS' }), []);
  const closeSettings = useCallback(() => dispatch({ type: 'CLOSE_SETTINGS' }), []);
  const openMenu = useCallback(() => dispatch({ type: 'OPEN_MENU' }), []);
  const closeMenu = useCallback(() => dispatch({ type: 'CLOSE_MENU' }), []);
  const showEndMessage = useCallback(() => dispatch({ type: 'SHOW_END_MESSAGE' }), []);
  const hideEndMessage = useCallback(() => dispatch({ type: 'HIDE_END_MESSAGE' }), []);
  const startConfetti = useCallback(() => dispatch({ type: 'START_CONFETTI' }), []);
  const stopConfetti = useCallback(() => dispatch({ type: 'STOP_CONFETTI' }), []);
  const resetModalState = useCallback(() => dispatch({ type: 'RESET_STATE' }), []);

  const value = {
    state,
    openModal,
    closeModal,
    openSettings,
    closeSettings,
    openMenu,
    closeMenu,
    showEndMessage,
    hideEndMessage,
    startConfetti,
    stopConfetti,
    resetModalState
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext };