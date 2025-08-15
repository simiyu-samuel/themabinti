import React from 'react';
import { cn } from '../../lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  variant = 'primary',
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-500',
    secondary: 'bg-gradient-to-r from-pink-500 to-purple-600',
    accent: 'bg-gradient-to-r from-yellow-400 to-pink-400',
  };

  return (
    <span
      className={cn(
        'bg-clip-text text-transparent font-bold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};