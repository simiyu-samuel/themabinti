import React from 'react';
import { motion } from 'framer-motion';

export const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating shape */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Medium floating shape */}
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-lg"
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 0.8, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Small floating shapes */}
      <motion.div
        className="absolute bottom-32 left-1/3 w-16 h-16 bg-gradient-to-br from-purple-300/15 to-pink-300/15 rounded-full blur-md"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-pink-300/25 to-purple-300/25 rounded-full blur-lg"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* Tiny accent shapes */}
      <motion.div
        className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-sm"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-10 w-12 h-12 bg-gradient-to-br from-pink-500/15 to-purple-500/15 rounded-full blur-sm"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
};