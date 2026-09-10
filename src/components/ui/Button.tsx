import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps {
  id?: string;
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: 'primary' | 'secondary-dark' | 'secondary-light';
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  ariaLabel
}) => {
  const isLg = size === 'lg';
  const heightClass = isLg ? 'h-14 px-8' : 'h-12 px-6';

  let variantClass = '';
  if (variant === 'primary') {
    variantClass = 'bg-[#FFC400] text-[#1C1E22] hover:bg-[#E6B000] active:bg-[#CC9C00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1E22]';
  } else if (variant === 'secondary-dark') {
    variantClass = 'border-[1.5px] border-white text-white bg-transparent hover:bg-white hover:text-[#1C1E22] active:bg-[#F2F3F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC400]';
  } else if (variant === 'secondary-light') {
    variantClass = 'border-[1.5px] border-[#1C1E22] text-[#1C1E22] bg-transparent hover:bg-[#1C1E22] hover:text-white active:bg-[#26292E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1E22]';
  }

  const disabledClass = disabled || loading
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer transition-colors duration-150 ease-in-out';

  const baseClasses = `inline-flex items-center justify-center font-semibold text-[0.9375rem] leading-[1.2] rounded-[2px] tracking-normal whitespace-nowrap select-none ${heightClass} ${variantClass} ${disabledClass} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
      ) : (
        icon && <span className="mr-2 inline-flex items-center shrink-0" aria-hidden="true">{icon}</span>
      )}
      <span>{label}</span>
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <a
        id={id}
        href={href}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel || label}
      className={baseClasses}
    >
      {content}
    </button>
  );
};
