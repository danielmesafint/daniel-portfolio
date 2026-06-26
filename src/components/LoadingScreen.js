import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { announceToScreenReader } from '../utils/accessibility';

const LoadingScreen = () => {
  const { t } = useTranslation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Accessibility: Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Performance: Simulate realistic loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          announceToScreenReader('Portfolio loaded successfully', 'assertive');
        }
        
        return newProgress;
      });
    }, 100);

    // Announce loading start
    announceToScreenReader('Loading Dr. Daniel Mesafint\'s portfolio', 'polite');

    return () => clearInterval(interval);
  }, []);

  // Performance: Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reducedMotion ? { duration: 0 } : {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: reducedMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: reducedMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const logoVariants = {
    hidden: { scale: reducedMotion ? 1 : 0, rotate: reducedMotion ? 0 : -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: reducedMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grido-dark via-neutral-900 to-grido-card flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * (window.innerWidth || 1920),
              y: Math.random() * (window.innerHeight || 1080),
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10"
      >
        {/* Animated Logo/Icon */}
        <motion.div
          variants={logoVariants}
          className="relative mb-8"
        >
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-primary-500/30 border-t-primary-500 rounded-full"
            />
            
            {/* Inner pulsing circle */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-4 bg-gradient-to-br from-primary-400 to-grido-purple rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">DM</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold bg-gradient-to-r from-white via-primary-400 to-grido-purple bg-clip-text text-transparent mb-4"
        >
          Dr. Daniel Mesafint
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 mb-8"
        >
          AI Researcher & Assistant Professor
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          variants={itemVariants}
          className="w-64 h-2 bg-neutral-700 rounded-full mx-auto mb-4 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary-400 to-grido-purple rounded-full"
          />
        </motion.div>

        {/* Loading Status */}
        <motion.div
          variants={itemVariants}
          className="text-sm text-gray-500"
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading portfolio...
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-grido-dark/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default LoadingScreen;