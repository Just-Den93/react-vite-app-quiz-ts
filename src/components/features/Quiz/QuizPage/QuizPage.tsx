import React, { useState } from 'react';
import { useUIContext } from '../../../../context/UIContext';
import { useDataContext } from '../../../../context/DataContext';
import { useQuizGameLogic } from './hooks/useQuizGameLogic';
import { useQuizIdentifier } from './hooks/useQuizIdentifier';
import { useKeyboardEvents } from './hooks/useKeyboardEvents';
import ModalManager  from '../../../common/ModalManager/ModalManager';
import { useModal } from '../../../common/ModalManager/useModal';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import BurgerMenu from '../../../common/MenuModal/BurgerMenu'
import styles from './QuizPage.module.scss';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
import { Category, QuizBlock } from '../../../../types/quiz.types';

const QuizPage: React.FC = () => {
  const { hideModal } = useModal();
  const { quizStates, data } = useDataContext();
  const { currentQuizId } = useUIContext();
  const [menuOpen, setMenuOpen] = useState(false);
  
  useQuizIdentifier();
  useKeyboardEvents();

  const {
    gameState,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  } = useQuizGameLogic();

  const handleMenuStateChange = (state: { isOpen: boolean }) => {
    setMenuOpen(state.isOpen);
  };

  if (!currentQuizId) {
    return (
      <div className={styles.quiz_page}>
        <div className={styles.errorMessage}>
          Ошибка: ID викторины не найден
        </div>
      </div>
    );
  }

  const currentQuizState = quizStates[currentQuizId] || {
    usedBlocks: {},
    data: null,
    completedGames: 0
  };

  const handleBlockSelectWrapper = (block: QuizBlock & { categoryId: string }) => {
    console.log('Block data:', block);
    
    if (!data) {
      console.error('Quiz data is not loaded');
      return;
    }
  
    const category = data.find(cat => cat.id === block.categoryId);
    console.log('Found category:', category);
  
    // Изменяем проверку, убирая проверку block.id === 0
    if (block.categoryId === undefined || !category) {
      console.error('Category not found');
      return;
    }
  
    handleBlockSelect(block, category);
  };

  const handleBlockRetry = () => {
    if (gameState.setIsBlockUsed) {
      gameState.setIsBlockUsed(false);
    }
  };

  if (!data) {
    return (
      <div className={styles.quiz_page}>
        <div className={styles.errorMessage}>
          Данные викторины недоступны
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quiz_page} id="outer-container">
		
<BurgerMenu 
  isOpen={menuOpen}
  onStateChange={handleMenuStateChange}
  onNewGame={() => {
    handleNewGame();
    setMenuOpen(false);
  }}
  onContinue={() => setMenuOpen(false)}
  onMainMenu={() => {
    handleMainMenu();
    setMenuOpen(false);
  }}
  onSettings={() => setMenuOpen(false)}
  onTimer={() => {
	// Handle timer click
	setMenuOpen(false);
 }}
/>
      
      <main id="page-wrap">
        <img
          src={PCImage}
          alt="PC horizontal line"
          className={styles.image}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            console.error('Failed to load logo image');
          }}
        />
       
        <ContentContainer
          data={data}
          onBlockSelect={handleBlockSelectWrapper}
          usedBlocks={currentQuizState.usedBlocks}
        />

<ModalManager
  selectedBlock={gameState.selectedBlock}
  selectedCategory={gameState.selectedCategory}
  isBlockUsed={gameState.isBlockUsed}
  onModalClose={() => {
    handleModalClose();
    hideModal('modal'); // Добавить этот вызов
  }}
  onBlockRetry={handleBlockRetry}
  onSelectCategory={handleSelectCategory}
  onNewGame={handleNewGame}
  onMainMenu={handleMainMenu}
/>
      </main>
    </div>
  );
};

export default React.memo(QuizPage);