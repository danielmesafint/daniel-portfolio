import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = ({ currentTheme, changeTheme }) => {
  // Get theme colors dynamically
  const getThemeColor = () => {
    const root = getComputedStyle(document.documentElement);
    return root.getPropertyValue('--theme-primary') || '#ec4899';
  };

  // Convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Get current theme color for animations
  const [themeColor, setThemeColor] = useState('#ec4899');
  
  useEffect(() => {
    const updateThemeColor = () => {
      const color = getThemeColor();
      setThemeColor(color);
    };
    
    updateThemeColor();
    // Update when theme changes
    const interval = setInterval(updateThemeColor, 100);
    
    return () => clearInterval(interval);
  }, [currentTheme]);
  const { t } = useTranslation();
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  // Memoized texts array with translations
  const texts = useMemo(() => [
    t('hero.titles.researcher'),
    t('hero.titles.professor'),
    t('hero.titles.coordinator'),
    t('hero.titles.expert'),
    t('hero.titles.specialist')
  ], [t]);

  // Accessibility: Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (reducedMotion) {
      setCurrentText(texts[0]);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        const targetText = texts[currentIndex] || '';
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts, reducedMotion]);

  // Memoized scroll function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }, [reducedMotion]);

  // Performance: Optimized social links data - NO CACHE BUSTING
  const socialLinks = useMemo(() => {
    const baseUrl = process.env.PUBLIC_URL || '';

    return [
      {
        iconSrc: `${baseUrl}/outlook.png`,
        href: 'mailto:danielmesafint1985@outlook.com',
        label: 'Outlook Contact',
        ariaLabel: 'Send email to Dr. Daniel Mesafint via Outlook',
        iconType: 'outlook'
      },
      {
        iconSrc: `${baseUrl}/email.png`,
        href: 'mailto:danielmesafint1985@gmail.com',
        label: 'Gmail Contact',
        ariaLabel: 'Send email to Dr. Daniel Mesafint via Gmail',
        iconType: 'email'
      },
      {
        iconSrc: `${baseUrl}/linkedin.png`,
        href: 'https://www.linkedin.com/in/danielmesafint',
        label: 'LinkedIn Profile - Opens in new tab',
        ariaLabel: 'Visit Dr. Daniel Mesafint\'s LinkedIn profile',
        iconType: 'linkedin'
      },
      {
        iconSrc: `${baseUrl}/github.png`,
        href: 'https://github.com/danielmesafint',
        label: 'GitHub Profile - Opens in new tab',
        ariaLabel: 'Visit Dr. Daniel Mesafint\'s GitHub profile',
        iconType: 'github'
      },
      {
        iconSrc: `${baseUrl}/researchgate.png`,
        href: 'https://www.researchgate.net/profile/Daniel-Belete',
        label: 'ResearchGate Profile - Opens in new tab',
        ariaLabel: 'Visit Dr. Daniel Mesafint\'s ResearchGate profile',
        iconType: 'researchgate'
      },
      {
        iconSrc: `${baseUrl}/googlescholar.png`,
        href: 'https://scholar.google.com/citations?user=hxLjZCAAAAAJ&hl=en',
        label: 'Google Scholar Profile - Opens in new tab',
        ariaLabel: 'Visit Dr. Daniel Mesafint\'s Google Scholar profile',
        iconType: 'scholar'
      },
      {
        iconSrc: `${baseUrl}/upwork.png`,
        href: 'https://www.upwork.com/freelancers/danielmesafint',
        label: 'Upwork Profile - Opens in new tab',
        ariaLabel: 'Visit Dr. Daniel Mesafint\'s Upwork profile',
        iconType: 'upwork'
      },
      {
        iconSrc: `${baseUrl}/telegram.png`,
        href: 'https://t.me/danielmesafint',
        label: 'Telegram Contact - Opens in new tab',
        ariaLabel: 'Contact Dr. Daniel Mesafint on Telegram',
        iconType: 'telegram'
      },
      {
        iconSrc: `${baseUrl}/whatsapp.png`,
        href: 'https://wa.me/251912023274',
        label: 'WhatsApp Contact - Opens in new tab',
        ariaLabel: 'Contact Dr. Daniel Mesafint on WhatsApp',
        iconType: 'whatsapp'
      },
      {
        iconSrc: `${baseUrl}/facebbok.png`,
        href: 'https://www.facebook.com/dmesafint',
        label: 'Facebook Profile - Opens in new tab',
        ariaLabel: 'Visit Dr. Daniel Mesafint\'s Facebook profile',
        iconType: 'facebook'
      }
    ];
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden" style={{ marginTop: '-64px', paddingTop: '64px', backgroundColor: '#1e293b', position: 'relative', zIndex: 1 }}>
      {/* Dotted Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundColor: '#1e293b',
        backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        backgroundPosition: '0 0, 30px 30px'
      }}>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            background-position: 0% 0%, 100% 100%, 50% 50%; 
            opacity: 0.3;
          }
          33% { 
            background-position: 100% 0%, 0% 100%, 25% 75%; 
            opacity: 0.5;
          }
          66% { 
            background-position: 0% 100%, 100% 0%, 75% 25%; 
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '20px', paddingBottom: '25px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">

          {/* Left Content */}
          <motion.div
            className="lg:col-span-2 order-2 lg:order-1 lg:pr-8"
            style={{ maxWidth: '100%' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Greeting */}
            <motion.div
              style={{ marginTop: '0px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg">{t('hero.greeting')}</p>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Dr. <span className="text-pink-500">Daniel</span> Mesafint
            </motion.h1>

            {/* Title with typing animation */}
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-pink-500 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span>{currentText}</span>
              {!reducedMotion && <span className="animate-pulse">|</span>}
            </motion.h2>

            {/* Description */}
            <motion.div
              className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p>
                {t('hero.description.main')}
              </p>
              <p className="hidden sm:block">
                {t('hero.description.secondary')}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button
                onClick={() => window.open('/Dr_Daniel_Mesafint_CV.pdf', '_blank', 'noopener,noreferrer')}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-center text-sm sm:text-base flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={16} className="sm:w-4 sm:h-4" />
                {t('hero.buttons.viewCV')}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.buttons.contact')}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="pt-4 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {socialLinks.map(({ iconSrc, href, label, ariaLabel, iconType }, index) => (
                  <motion.a
                    key={iconType}
                    href={href}
                    target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
                    rel={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                    className="p-2 border-2 border-gray-600 hover:border-pink-400 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/30 bg-gray-800/70 hover:bg-pink-500/10"
                    aria-label={ariaLabel}
                    title={label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={iconSrc}
                      alt={iconType}
                      width={20}
                      height={20}
                      className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-300 object-contain filter brightness-110 hover:brightness-125 contrast-125 hover:contrast-150"
                      style={{
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        minWidth: '20px',
                        minHeight: '20px',
                        maxWidth: '24px',
                        maxHeight: '24px'
                      }}
                      loading="eager"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Profile Image with perfectly matching dotted background */}
              <motion.div
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full relative overflow-hidden"
                style={{
                  backgroundColor: '#1e293b',
                  backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                  backgroundPosition: '0 0, 30px 30px'
                }}
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${hexToRgba(themeColor, 0.4)}`,
                    `0 0 0 20px ${hexToRgba(themeColor, 0)}`,
                    `0 0 0 0 ${hexToRgba(themeColor, 0)}`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Profile Image with no background */}
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/profile_photo.jpg"
                    alt="Dr. Daniel Mesafint"
                    className="w-full h-full object-contain"
                    style={{
                      objectPosition: 'center center',
                      transform: 'scale(1.0)',
                      transformOrigin: 'center center',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </motion.div>

              {/* Animated Decorative Elements */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-2 rounded-full"
                style={{ borderColor: themeColor }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 rounded-full"
                style={{ backgroundColor: themeColor }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Navigation Cards - Bottom Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {/* Research Card */}
          <motion.div
            onClick={() => scrollToSection('#research')}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-300 border border-gray-700 hover:border-pink-500"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-md flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-0.5 text-xs sm:text-sm">{t('nav.research')}</h3>
              <p className="text-gray-400 text-xs">AI & ML</p>
            </div>
          </motion.div>

          {/* Publications Card */}
          <motion.div
            onClick={() => scrollToSection('#publications')}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-300 border border-gray-700 hover:border-pink-500"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-md flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <FileText size={12} className="sm:w-4 sm:h-4 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-0.5 text-xs sm:text-sm">{t('nav.publications')}</h3>
              <p className="text-gray-400 text-xs">25+ Papers</p>
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div
            onClick={() => scrollToSection('#projects')}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-300 border border-gray-700 hover:border-pink-500"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-md flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-0.5 text-xs sm:text-sm">{t('nav.projects')}</h3>
              <p className="text-gray-400 text-xs">Portfolio</p>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            onClick={() => scrollToSection('#contact')}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-300 border border-gray-700 hover:border-pink-500"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-md flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <Mail size={12} className="sm:w-4 sm:h-4 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-0.5 text-xs sm:text-sm">{t('nav.contact')}</h3>
              <p className="text-gray-400 text-xs">{t('contact.title')}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;