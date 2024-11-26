import React from 'react';
import Item from '../Item/Item';
import styles from './CategoryRow.module.scss';
import { Category, QuizBlock } from '../../../../types/quiz.types';
import { handleBlockSelection } from './CategoryRowUtils';

interface CategoryRowProps {
  category: Category;
  // Изменим тип onBlockSelect
  onBlockSelect: (block: QuizBlock & { categoryId: string }) => void;
  usedBlocks: number[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, onBlockSelect, usedBlocks }) => {
  return (
    <div className={styles.categoryRow}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => {
          const blockWithCategory = { ...block, categoryId: category.id };
          return (
            <Item
              key={`${category.id}-${block.id}`}
              block={blockWithCategory}
              categoryId={category.id}
              onBlockSelect={onBlockSelect}
              isUsed={usedBlocks.includes(block.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryRow;
