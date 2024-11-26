// src/layout/ContentContainer/contentContainerUtils.ts
import React from 'react';
import { Category, QuizBlock } from '../../../types/quiz.types';
import CategoryRow from '../../features/Quiz/CategoryRow/CategoryRow';

/**
 * Renders category rows based on the provided data
 * @param data Array of quiz categories
 * @param onBlockSelect Callback function when a block is selected
 * @returns Array of rendered CategoryRow components
 */
export function renderCategoryRows(
  data: Category[],
  onBlockSelect: (block: QuizBlock & { categoryId: string }) => void // Обновляем тип
): React.ReactElement[] {
  return data.map((category: Category) => (
    <CategoryRow
      key={category.id}
      category={category}
      onBlockSelect={onBlockSelect}
      usedBlocks={[]}
    />
  ));
}

/**
 * Interface for category row rendering options
 */
export interface CategoryRowRenderOptions {
  showCategoryNames?: boolean;
  highlightUsedBlocks?: boolean;
}

/**
 * Enhanced version of renderCategoryRows with additional options
 * @param data Array of quiz categories
 * @param onBlockSelect Callback function when a block is selected
 * @param options Additional rendering options
 * @returns Array of rendered CategoryRow components
 */

export function renderCategoryRowsWithOptions(
  data: Category[],
  onBlockSelect: (block: QuizBlock & { categoryId: string }) => void, // Обновляем тип
  options: CategoryRowRenderOptions = {}
): React.ReactElement[] {
  const {
    showCategoryNames = true,
    highlightUsedBlocks = true
  } = options;

  return data.map((category: Category) => (
    <CategoryRow
      key={category.id}
      category={{
        ...category,
        name: showCategoryNames ? category.name : ''
      }}
      onBlockSelect={onBlockSelect}
      usedBlocks={[]}
    />
  ));
}