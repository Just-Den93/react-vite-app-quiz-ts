import { QuizState } from '../../../../types/quiz.types';

// Функция для проверки, был ли блок уже использован
export function checkIfUsed(
  quizStates: { [key: string]: QuizState },
  currentQuizId: string | null,
  categoryId: string,
  blockId: number
): boolean {
  if (!currentQuizId) return false;
  return quizStates[currentQuizId]?.usedBlocks?.[categoryId]?.includes(blockId) || false;
}

// Функция для обработки клика по блоку
export function handleBlockClick(
  block: { id: number; question: string; text: string }, 
  categoryId: string,
  onBlockSelect: (blockData: { id: number; question: string; text: string; categoryId: string }) => void
): void {
  onBlockSelect({ ...block, categoryId });
}
