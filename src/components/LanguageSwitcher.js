import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Globe, 
  ChevronDown, 
  Check,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en',
      initial: 'EN',
      name: 'English'
    },
    {
      code: 'am',
      initial: 'AM',
      name: 'Amharic'
    },
    {
      code: 'or',
      initial: 'OR',
      name: 'Oromoo'
    },
    {
      code: 'ti',
      initial: 'TG',
      name: 'Tigrigna'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const formatTime = (timezone) => {
    try {
      return new Intl.DateTimeFormat(i18n.language, {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }).format(new Date());
    } catch (error) {
      return new Date().toLocaleTimeString();
    }
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      ETB: 'ብር',
      GBP: '£'
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800/70 hover:bg-gray-700/70 border border-gray-600 hover:border-pink-400 rounded-lg transition-all duration-300 group shadow-lg"
      >
        <Globe size={14} className="text-gray-400 group-hover:text-pink-400 transition-colors" />
        <span className="text-white group-hover:text-pink-400 text-sm font-medium">
          Cite Language
        </span>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 group-hover:text-pink-400 transition-all duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Language Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-40 bg-gray-800/95 border border-gray-600 rounded-lg shadow-2xl z-50 overflow-hidden backdrop-blur-sm"
          >
            {/* Language Options */}
            <div className="py-1">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full px-3 py-2 flex items-center justify-between hover:bg-pink-500/10 transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-xs">
                      {language.initial}
                    </span>
                    <span className="text-gray-300 text-xs">
                      {language.name}
                    </span>
                  </div>
                  {i18n.language === language.code && (
                    <Check size={12} className="text-pink-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;