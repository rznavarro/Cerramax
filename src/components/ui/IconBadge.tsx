import React from 'react';

export interface IconBadgeProps {
  icon: React.ReactNode;
  variant?: 'on-light' | 'on-accent';
  size?: 'sm' | 'md';
  className?: string;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  variant = 'on-light',
  size = 'md',
  className = ''
}) => {
  const sizeClass = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const colors = variant === 'on-accent'
    ? 'bg-[#1C1E22] text-[#FFC400]'
    : 'bg-[#F2F3F5] text-[#1C1E22]';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shrink-0 ${sizeClass} ${colors} ${className}`}
      aria-hidden="true"
    >
      {icon}
    </div>
  );
};
