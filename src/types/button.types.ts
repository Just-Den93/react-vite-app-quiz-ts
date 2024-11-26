export interface ButtonProps {
    variant: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    ariaLabel?: string;
    iconOnly?: boolean;
  }