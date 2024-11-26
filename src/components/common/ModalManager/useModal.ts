// src/components/common/ModalManager/useModal.ts
import { useCallback } from 'react';
import { useModal as useModalContext } from '../../../context/ModalContext';

interface ModalState {
 modal: boolean;
 settings: boolean;
 menu: boolean;
 endMessage: boolean;
 confetti: boolean;
}

type ModalType = 'modal' | 'settings' | 'menu' | 'endMessage';

interface ModalAPI {
 modalState: ModalState;
 showModal: (modalType: ModalType) => void;
 hideModal: (modalType: ModalType) => void;
 closeSettings: () => void;
 closeMenu: () => void;
}

export function useModal(): ModalAPI {
 const { 
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
   stopConfetti 
 } = useModalContext();

 const showModal = useCallback(
   (modalType: ModalType) => {
     console.log('Showing modal:', modalType);
     switch (modalType) {
       case 'modal':
         openModal();
         break;
       case 'settings':
         openSettings();
         break;
       case 'menu':
         openMenu();
         break;
       case 'endMessage':
         showEndMessage();
         startConfetti();
         break;
     }
   },
   [openModal, openSettings, openMenu, showEndMessage, startConfetti]
 );

 const hideModal = useCallback(
   (modalType: ModalType) => {
     console.log('Hiding modal:', modalType);
     switch (modalType) {
       case 'modal':
         closeModal();
         break;
       case 'settings':
         closeSettings();
         break;
       case 'menu':
         closeMenu();
         break;
       case 'endMessage':
         hideEndMessage();
         stopConfetti();
         break;
     }
   },
   [closeModal, closeSettings, closeMenu, hideEndMessage, stopConfetti]
 );

 return {
   modalState: state,
   showModal,
   hideModal,
   closeSettings,
   closeMenu,
 };
}