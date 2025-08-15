import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: 'low' | 'medium' | 'high';
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  hover = false,
  blur = 'md',
  opacity = 'medium',
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  const opacityClasses = {
    low: 'bg-white/10',
    medium: 'bg-white/20',
    high: 'bg-white/30',
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-white/20 shadow-glass',
        blurClasses[blur],
        opacityClasses[opacity],
        hover && 'transition-all duration-300 hover:bg-white/30 hover:shadow-elegant hover:scale-105',
        className
      )}
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};