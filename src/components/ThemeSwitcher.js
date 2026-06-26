import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sun, Moon } from 'lucide-react';

const ThemeSwitcher = ({ darkMode, toggleDarkMode, currentTheme, changeTheme, themes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  // Convert themes object to array for rendering
  const themeArray = Object.entries(themes).map(([id, theme]) => ({
    id,
    ...theme
  }));

  const currentThemeData = themes[currentTheme];

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all duration-300 ${
          darkMode 
            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Change Theme"
      >
        <div className="relative">
          <Palette size={20} />
          {currentTheme !== 'default' && (
            <div 
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${currentThemeData?.gradient}`}
            />
          )}
        </div>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme Panel */}
            <motion.div
              className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-2xl border z-50 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Choose Theme
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleDarkMode}
                      className={`p-1.5 rounded-md transition-colors ${
                        darkMode 
                          ? 'text-yellow-400 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Select your preferred color scheme
                </p>
              </div>

              {/* Theme Options */}
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {themeArray.map((theme) => (
                  <motion.div
                    key={theme.id}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      currentTheme === theme.id
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => handleThemeChange(theme.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {theme.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {theme.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Color Preview */}
                        <div className="flex gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                      </div>
                      
                      {/* Selected Indicator */}
                      {currentTheme === theme.id && (
                        <motion.div
                          className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={14} className="text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Current: {currentThemeData?.name}
                  </span>
                  <button
                    onClick={() => handleThemeChange('default')}
                    className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;