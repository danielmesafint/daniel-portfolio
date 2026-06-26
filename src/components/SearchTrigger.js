import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Command } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

const SearchTrigger = ({ variant = 'navbar' }) => {
  const { t } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Escape to close search
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const NavbarSearchButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsSearchOpen(true)}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-lg transition-all duration-300 group"
      title="Search (Ctrl+K)"
    >
      <Search size={16} className="text-gray-400 group-hover:text-white transition-colors" />
      <span className="text-gray-400 group-hover:text-white text-sm hidden md:inline">
        Search...
      </span>
      <div className="hidden lg:flex items-center space-x-1 ml-2 px-2 py-1 bg-gray-700 rounded text-xs text-gray-400">
        <Command size={12} />
        <span>K</span>
      </div>
    </motion.button>
  );

  const FloatingSearchButton = () => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsSearchOpen(true)}
      className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      title="Search (Ctrl+K)"
    >
      <Search size={24} />
    </motion.button>
  );

  const CompactSearchButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsSearchOpen(true)}
      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
      title="Search (Ctrl+K)"
    >
      <Search size={20} className="text-gray-400 hover:text-white transition-colors" />
    </motion.button>
  );

  const renderSearchTrigger = () => {
    switch (variant) {
      case 'navbar':
        return <NavbarSearchButton />;
      case 'floating':
        return <FloatingSearchButton />;
      case 'compact':
        return <CompactSearchButton />;
      default:
        return <NavbarSearchButton />;
    }
  };

  return (
    <>
      {renderSearchTrigger()}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default SearchTrigger;