import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassmorphic?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glassmorphic = false,
  hover = false,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 shadow-sm',
        glassmorphic && 'bg-white/30 backdrop-blur-md border-white/20',
        !glassmorphic && 'bg-white',
        hover && 'transition-all duration-300 hover:shadow-lg hover:scale-105',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('p-6 pb-4', className)}>{children}</div>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('px-6 pb-6', className)}>{children}</div>
);