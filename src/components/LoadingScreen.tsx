import React from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  isReady: boolean;
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isReady, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isReady ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="portfolio-loader fixed inset-0 z-[120] flex items-center justify-center"
      style={{ pointerEvents: isReady ? 'none' : 'auto' }}
      aria-hidden={isReady}
    >
      <div className="portfolio-loader__backdrop" />

      <div className="portfolio-loader__content">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="portfolio-loader__title"
        >
          MY PORTFOLIO
        </motion.h1>

        <div className="portfolio-loader__track">
          <motion.div
            className="portfolio-loader__bar"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
