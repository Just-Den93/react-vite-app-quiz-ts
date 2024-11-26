// src/components/features/Game/GameModes/SelectionMode/SelectionModeUtils.ts
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface Block {
  id: number;
  question: string;
  text: string;
  options: string[];
  'correct answer': string;
}

interface Styles {
  incorrectOption: string;
}

interface HighlightedOptions {
  [key: number]: string;
}

// Форматирование текста с подсветкой в бэктиках
export const formatTextWithHighlights = (text: string): React.ReactNode[] => {
  const regex = /`([^`]+)`/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
    }
    parts.push(
      <span 
        key={match.index} 
        style={{ backgroundColor: '#e21b3c', color: 'white', padding: '0 4px' }}
      >
        {match[1]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
  }

  return parts;
};

// Определение размера шрифта для опций
export const getOptionFontSize = (text: string): number => {
  const length = text.length;
  if (length <= 10) return 25;
  if (length <= 22) return 22;
  if (length >= 100) return 16;
  return 18;
};

// Определение размера шрифта для ответа
export const getAnswerFontSize = (text: string): number => {
  const length = text.length;
  if (length <= 90) return 22;
  if (length <= 110) return 20;
  return 18;
};

// Обработка завершения таймера
export const handleForceStopInternal = (
  handleForceStop: () => void,
  setForceStopped: Dispatch<SetStateAction<boolean>>
): void => {
  handleForceStop();
  setForceStopped(true);
};

// Обработка показа ответа
export const handleShowAnswerInternal = (
  block: Block,
  styles: Styles,
  handleShowAnswer: () => void,
  setAnswerShown: Dispatch<SetStateAction<boolean>>,
  setHighlightedOptions: Dispatch<SetStateAction<HighlightedOptions>>
): void => {
  handleShowAnswer();
  setAnswerShown(true);

  const correctAnswerIndex = block.options.findIndex(
    (option) => option === block['correct answer']
  );

  const updatedOptions = block.options.reduce((acc, _, index) => {
    if (index === correctAnswerIndex) {
      return acc;
    }
    return { ...acc, [index]: styles.incorrectOption };
  }, {} as HighlightedOptions);

  setHighlightedOptions(updatedOptions);
};

// Обработка подсказки
export const handleHintInternal = (
  block: Block,
  styles: Styles,
  setHintUsed: Dispatch<SetStateAction<boolean>>,
  setHighlightedOptions: Dispatch<SetStateAction<HighlightedOptions>>
): void => {
  setHintUsed(true);

  const correctAnswerIndex = block.options.findIndex(
    (option) => option === block['correct answer']
  );

  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * block.options.length);
  } while (randomIndex === correctAnswerIndex);

  const updatedOptions = block.options.reduce((acc, _, index) => {
    if (index === correctAnswerIndex || index === randomIndex) {
      return acc;
    }
    return { ...acc, [index]: styles.incorrectOption };
  }, {} as HighlightedOptions);

  setHighlightedOptions(updatedOptions);
};