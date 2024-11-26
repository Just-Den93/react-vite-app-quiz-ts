// src/components/features/Game/Messages/WarningMessage/warningMessageConstants.ts
export const ARIA_LABELS = {
	WARNING_ICON: 'Попередження',
	TRY_AGAIN_BUTTON: 'Спробувати ще раз',
	CONTINUE_BUTTON: 'Продовжити',
	BUTTONS_GROUP: 'Дії попередження'
 } as const;
 
 export const DEFAULT_MESSAGE = 'Бажаєте пройти ще раз?' as const;
 
 export const ERROR_MESSAGES = {
	TRY_AGAIN: 'Error in handleTryAgain:',
	CONTINUE: 'Error in handleContinue:'
 } as const;