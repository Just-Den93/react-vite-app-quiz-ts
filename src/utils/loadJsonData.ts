import { QuizData } from '../types/quiz.types';
import mode2Data from '../data/mode2.json';

export function loadJsonDataByMode(mode: number): QuizData | null {
  try {
    console.log('Loading data for mode:', mode);
    
    if (mode === 2) {
      console.log('Mode2 data:', mode2Data);
      
      if (!mode2Data || !mode2Data.categories) {
        console.error('Invalid data structure in mode2.json');
        return null;
      }
      
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

export function loadUniqueUuids(): QuizData[] {
  try {
    console.log('Loading mode2 data:', mode2Data);

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