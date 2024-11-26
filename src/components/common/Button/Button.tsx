// src/components/common/Button/Button.tsx
import React from 'react';
import { ButtonProps } from '../../../types/button.types';
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_TEXTS, BUTTON_ICONS } from './ButtonTypes';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  onClick,
  disabled = false,
  className = '',
  children,
  ariaLabel,
  iconOnly = false,
}) => {
  const baseClassName = styles.button;
  const variantClassName = styles[variant];
  const finalClassName = `${baseClassName} ${variantClassName} ${className}`.trim();

  const buttonText = !iconOnly && (children || BUTTON_TEXTS[variant]);
  const Icon = BUTTON_ICONS[variant];

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || buttonText?.toString()}
    >
      {Icon && (
        <span className={styles.icon}>
          <Icon size={24} />
        </span>
      )}
      {buttonText}
    </button>
  );
};

export { Button, BUTTON_VARIANTS };