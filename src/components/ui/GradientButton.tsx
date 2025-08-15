import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children: React.ReactNode;
  glow?: boolean;
  animated?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  glow = false,
  animated = true,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-500',
    secondary: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-pink-400',
    outline: 'border-2 border-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-border text-transparent hover:text-white hover:bg-clip-padding focus:ring-purple-500',
    ghost: 'text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 focus:ring-purple-500',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const glowClass = glow ? 'animate-pulse-glow' : '';

  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        glowClass,
        className
      )}
      disabled={disabled || isLoading}
      whileHover={animated ? { scale: 1.05 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Animated background overlay */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center">
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </span>
    </motion.button>
  );
};