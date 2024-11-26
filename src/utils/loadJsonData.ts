import { QuizData } from '../types/quiz.types';

// Импортируем JSON файл напрямую
import mode2Data from '../data/mode2.json';

/**
 * Загружает данные с уникальными UUID
 */
export function loadUniqueUuids(): QuizData[] {
  try {
    console.log('Loading mode2 data:', mode2Data);

    // Преобразуем данные в нужный формат
    const formattedData = {
      ...mode2Data,
      name: mode2Data["quiz name"] || 'Unnamed Quiz'
    };

    return [formattedData];
  } catch (error) {
    console.error('Error in loadUniqueUuids:', error);
    return [];
  }
}

/**
 * Загружает данные викторины по указанному режиму
 */
export function loadJsonDataByMode(mode: number): QuizData | null {
  try {
    // Для текущего случая у нас только mode2.json
    if (mode === 2) {
      return {
        ...mode2Data,
        name: mode2Data["quiz name"] || 'Unnamed Quiz'
      };
    }
    
    console.warn(`Quiz data for mode ${mode} not found`);
    return null;
  } catch (error) {
    console.error('Error in loadJsonDataByMode:', error);
    return null;
  }
}

/**
 * Загружает все файлы JSON с данными викторин
 */
export function loadJsonDataFiles(): QuizData[] {
  try {
    return [{
      ...mode2Data,
      name: mode2Data["quiz name"] || 'Unnamed Quiz'
    }];
  } catch (error) {
    console.error('Error in loadJsonDataFiles:', error);
    return [];
  }
}