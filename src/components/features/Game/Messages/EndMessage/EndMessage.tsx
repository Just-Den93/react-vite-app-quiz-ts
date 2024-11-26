// src/components/features/Game/Messages/EndMessage/EndMessage.tsx
import React from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import styles from './EndMessage.module.scss';
import { FaAward } from 'react-icons/fa';
import { resetQuizState } from './EndMessageUtils';
import type { QuizState } from '../../../../../types/quiz.types';
import type { Dispatch, SetStateAction } from 'react';

interface EndMessageProps {
 onNewGame: () => void;
 onMainMenu: () => void;
 currentQuizId: string;
 setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>;
}

const EndMessage: React.FC<EndMessageProps> = ({
 onNewGame,
 onMainMenu,
 currentQuizId,
 setQuizStates
}) => {
 const handleNewGame = React.useCallback(() => {
   if (!currentQuizId) {
     console.error('currentQuizId is missing in EndMessage');
     return;
   }
   resetQuizState(currentQuizId, setQuizStates);
   onNewGame();
 }, [currentQuizId, setQuizStates, onNewGame]);

 const handleMainMenu = React.useCallback(() => {
   if (!currentQuizId) {
     console.error('currentQuizId is missing in EndMessage');
     return;
   }
   resetQuizState(currentQuizId, setQuizStates);
   onMainMenu();
 }, [currentQuizId, setQuizStates, onMainMenu]);

 return (
   <div 
     id="end-message" 
     className={styles.endMessage}
     role="dialog"
     aria-label="Повідомлення про завершення вікторини"
   >
     <div className={styles.endMessageContent}>
       <div className={styles.greetings}>
         Вітаю, ви завершили вікторину!
       </div>
       <div 
         className={styles.awardIconContainer}
         role="img" 
         aria-label="Нагорода"
       >
         <FaAward className={styles.awardIcon} />
       </div>
       <div className={styles.buttons}>
         <Button 
           variant={BUTTON_VARIANTS.NEW_GAME}
           onClick={handleNewGame}
           ariaLabel="Почати нову гру"
         />
         <Button 
           variant={BUTTON_VARIANTS.MAIN_MENU}
           onClick={handleMainMenu}
           ariaLabel="Повернутися до головного меню"
         />
       </div>
     </div>
   </div>
 );
};

export default React.memo(EndMessage);