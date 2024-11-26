import { SetStateAction, Dispatch } from 'react';

export const startQuizHandler = (
  mode: number,
  uuid: string,
  setSelectedMode: Dispatch<SetStateAction<number | null>>,
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>,
  setShowQuizPage: Dispatch<SetStateAction<boolean>>
): void => {
  // Используем функцию обновления состояния вместо прямого присваивания
  setSelectedMode(() => mode);
  setCurrentQuizId(() => uuid);
  setShowQuizPage(() => true);

  // Сохраняем значения в localStorage
  localStorage.setItem('selectedMode', mode.toString());
  localStorage.setItem('currentQuizId', uuid);
  localStorage.setItem('showQuizPage', 'true');
  localStorage.removeItem('menuVisible');
};