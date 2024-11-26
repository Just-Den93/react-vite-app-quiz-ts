import { QuizBlock, Category } from '../../../../types/quiz.types'; // Импортируем типы из вашего файла типов

// Функция для обработки выбора блока и категории
export function handleBlockSelection(
  blockData: QuizBlock & { categoryId: string },
  onBlockSelect: (blockData: QuizBlock & { categoryId: string }) => void
): void {
  onBlockSelect(blockData);
}
