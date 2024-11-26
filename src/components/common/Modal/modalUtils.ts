// Сброс состояния модального окна (таймер и ответ)
const resetModalState = (
	setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>,
	setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>,
	setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>
 ): void => {
	setTimerStarted(false);
	setShowAnswer(false);
	setTimerEnded(false);
 };
 
 // Функции для управления состоянием внутри модального окна
 const handleModalActions = {
	setTimerEnded: (setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>): void => {
	  setTimerEnded(true);
	},
	setShowAnswer: (setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>): void => {
	  setShowAnswer(true);
	},
	forceStop: (setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>): void => {
	  setTimerEnded(true);
	},
 };
 
 export { resetModalState, handleModalActions };