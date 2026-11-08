import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Download, Share2, BookOpen, Mail, Github } from 'lucide-react';

const FloatingMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: Download,
      label: 'View My CV',
      action: () => {
        // Open CV in new tab using dedicated viewer
        window.open('/Dr_Daniel_Mesafint_CV.pdf', '_blank', 'noopener,noreferrer');
      },
      color: 'from-primary-400 to-primary-600'
    },
    {
      icon: BookOpen,
      label: 'Publications',
      action: () => {
        const element = document.querySelector('#publications');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'from-grido-purple to-grido-pink'
    },
    {
      icon: Mail,
      label: 'Contact',
      action: () => {
        const element = document.querySelector('#contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'from-accent-500 to-accent-400'
    },
    {
      icon: Share2,
      label: 'Share Profile',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Dr. Daniel Mesafint - AI Researcher',
            text: 'Check out Dr. Daniel Mesafint\'s research portfolio',
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Profile link copied to clipboard!');
        }
      },
      color: 'from-grido-blue to-primary-500'
    }
  ];

  return (
    <div className="fixed bottom-6 right-20 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={item.action}
                className={`flex items-center space-x-3 bg-gradient-to-r ${item.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary-500 to-grido-purple rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={24} className="text-white" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingMenu;