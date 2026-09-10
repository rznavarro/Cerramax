import React from 'react';

export interface TextLinkProps {
  id?: string;
  label: string;
  href: string;
  variant?: 'on-light' | 'on-dark';
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({
  id,
  label,
  href,
  variant = 'on-light',
  external = false,
  onClick,
  className = '',
  children
}) => {
  const colorClass = variant === 'on-dark'
    ? 'text-white hover:text-[#FFC400] focus-visible:outline-[#FFC400]'
    : 'text-[#1C1E22] hover:text-[#15171A] focus-visible:outline-[#1C1E22]';

  return (
    <a
      id={id}
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center text-[0.9375rem] font-semibold underline underline-offset-[3px] decoration-1 hover:decoration-2 transition-[text-decoration-thickness,color] duration-150 ${colorClass} ${className}`}
    >
      {children || label}
      {external && (
        <span className="sr-only"> (se abre en una nueva pestaña)</span>
      )}
    </a>
  );
};
