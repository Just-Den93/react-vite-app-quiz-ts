// src/components/features/Game/Messages/WarningMessage/WarningMessage.tsx
import React from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import styles from './WarningMessage.module.scss';
import { IoWarning } from "react-icons/io5";

interface WarningMessageProps {
 onTryAgain: () => void;
 onContinue: () => void;
 message?: string;
}

const WarningMessage: React.FC<WarningMessageProps> = ({
 onTryAgain,
 onContinue,
 message = 'Бажаєте пройти ще раз?' // Значение по умолчанию
}) => {
 const handleTryAgain = React.useCallback(() => {
   try {
     onTryAgain();
   } catch (error) {
     console.error('Error in handleTryAgain:', error);
   }
 }, [onTryAgain]);

 const handleContinue = React.useCallback(() => {
   try {
     onContinue();
   } catch (error) {
     console.error('Error in handleContinue:', error);
   }
 }, [onContinue]);

 return (
   <div 
     className={styles.warningMessage}
     role="alert"
     aria-live="polite"
   >
     <div className={styles.warningMessageContent}>
       <div className={styles.warningText}>
         {message}
       </div>
       <div 
         className={styles.warningIconContainer}
         role="img" 
         aria-label="Попередження"
       >
         <IoWarning className={styles.warningIcon} />
       </div>
       <div className={styles.buttons}>
         <Button 
           variant={BUTTON_VARIANTS.TRY_AGAIN}
           onClick={handleTryAgain}
           ariaLabel="Спробувати ще раз"
         />
         <Button 
           variant={BUTTON_VARIANTS.CONTINUE}
           onClick={handleContinue}
           ariaLabel="Продовжити"
         />
       </div>
     </div>
   </div>
 );
};

export default React.memo(WarningMessage);