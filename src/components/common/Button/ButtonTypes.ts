// src/components/common/Button/ButtonTypes.ts
import { IconType } from 'react-icons';
import { LuTimer } from 'react-icons/lu';

export interface ButtonVariants {
  PRIMARY: 'primary';
  SECONDARY: 'secondary';
  WARNING: 'warning';
  TIMER: 'timer';
  START_TIMER: 'startTimer';
  HINT: 'hint';
  CONTINUE: 'continue';
  NEW_GAME: 'newGame';
  MAIN_MENU: 'mainMenu';
  SETTINGS: 'settings';
  SHOW_ANSWER: 'showAnswer';
  SELECT_CATEGORY: 'selectCategory';
  TRY_AGAIN: 'tryAgain';
}

export interface ButtonSizes {
  SMALL: 'small';
  MEDIUM: 'medium';
  LARGE: 'large';
}

// Объект с вариантами кнопок
export const BUTTON_VARIANTS: ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary', 
  WARNING: 'warning',
  TIMER: 'timer',
  START_TIMER: 'startTimer',
  HINT: 'hint',
  CONTINUE: 'continue',
  NEW_GAME: 'newGame',
  MAIN_MENU: 'mainMenu',
  SETTINGS: 'settings',
  SHOW_ANSWER: 'showAnswer',
  SELECT_CATEGORY: 'selectCategory',
  TRY_AGAIN: 'tryAgain'
} as const;

// Объект с размерами кнопок
export const BUTTON_SIZES: ButtonSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
} as const;

// Тип для ключей BUTTON_VARIANTS
export type ButtonVariantType = keyof typeof BUTTON_VARIANTS;

// Тип для ключей BUTTON_SIZES
export type ButtonSizeType = keyof typeof BUTTON_SIZES;

// Интерфейс для текстов кнопок
export interface ButtonTexts {
  [key: string]: string;
}

// Объект с текстами кнопок
export const BUTTON_TEXTS: ButtonTexts = {
  [BUTTON_VARIANTS.CONTINUE]: 'Продовжити',
  [BUTTON_VARIANTS.NEW_GAME]: 'Нова гра',
  [BUTTON_VARIANTS.MAIN_MENU]: 'Головне меню',
  [BUTTON_VARIANTS.SETTINGS]: 'Налаштування',
  [BUTTON_VARIANTS.SHOW_ANSWER]: 'Показати відповідь',
  [BUTTON_VARIANTS.SELECT_CATEGORY]: 'Обрати категорію',
  [BUTTON_VARIANTS.TRY_AGAIN]: 'ПОВТОРИТИ',
  [BUTTON_VARIANTS.HINT]: 'Підказка',
  [BUTTON_VARIANTS.TIMER]: 'Таймер', 
  [BUTTON_VARIANTS.START_TIMER]: ''
} as const;

// Интерфейс для иконок кнопок
export interface ButtonIcons {
  [key: string]: IconType | undefined;
}

// Объект с иконками кнопок
export const BUTTON_ICONS: ButtonIcons = {
  [BUTTON_VARIANTS.START_TIMER]: LuTimer
} as const;

// Замораживаем объекты чтобы предотвратить их изменение
Object.freeze(BUTTON_VARIANTS);
Object.freeze(BUTTON_SIZES);
Object.freeze(BUTTON_TEXTS);
Object.freeze(BUTTON_ICONS);

// Экспортируем все типы и константы
export type {
  ButtonTexts as ButtonTextsType,
  ButtonIcons as ButtonIconsType
};