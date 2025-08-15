import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Heart } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Loading...',
  fullScreen = false,
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50 bg-gradient-to-br from-purple-50/95 to-pink-50/95 backdrop-blur-sm'
    : 'absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl';

  return (
    <motion.div
      className={`${containerClass} flex items-center justify-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center space-y-4">
        {/* Animated logo */}
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Loading spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-purple-600 mx-auto" />
        </motion.div>
        
        {/* Message */}
        <motion.p
          className="text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};