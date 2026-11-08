import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon, ChevronDown, Search, Globe, Settings } from 'lucide-react';
import { isSectionVisible } from '../config/sections';
import { useTranslation } from 'react-i18next';
import navigationHandler from '../utils/NavigationHandler';

const Navbar = ({ darkMode, toggleDarkMode, currentTheme, changeTheme, themes, onLanguageDropdownChange }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'am', name: 'አም', fullName: 'Amharic' },
    { code: 'or', name: 'OR', fullName: 'Oromifa' },
    { code: 'ti', name: 'ትግ', fullName: 'Tigrigna' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Enhanced active section detection with subsections
      const allSections = [
        // Main sections
        { id: 'hero', mainSection: 'home' },
        { id: 'about', mainSection: 'about' },
        { id: 'research', mainSection: 'research' },
        { id: 'publications', mainSection: 'publications' },
        { id: 'projects', mainSection: 'projects' },
        { id: 'teaching', mainSection: 'teaching' },
        { id: 'resources', mainSection: 'resources' },
        { id: 'contact', mainSection: 'contact' },
        
        // Research subsections
        { id: 'research-interests', mainSection: 'research' },
        { id: 'research-projects', mainSection: 'research' },
        { id: 'research-funding', mainSection: 'research' },
        { id: 'research-collaborations', mainSection: 'research' },
        { id: 'research-timeline', mainSection: 'research' },
        
        // Publications subsections
        { id: 'publications-journal', mainSection: 'publications' },
        { id: 'publications-conferences', mainSection: 'publications' },
        { id: 'publications-books', mainSection: 'publications' },
        { id: 'publications-search', mainSection: 'publications' },
        { id: 'publications-citations', mainSection: 'publications' },
        
        // Projects subsections
        { id: 'projects-featured', mainSection: 'projects' },
        { id: 'projects-all', mainSection: 'projects' },
        { id: 'projects-tools', mainSection: 'projects' },
        { id: 'projects-demos', mainSection: 'projects' },
        
        // Teaching subsections
        { id: 'teaching-courses', mainSection: 'teaching' },
        { id: 'teaching-experience', mainSection: 'teaching' },
        { id: 'teaching-supervision', mainSection: 'teaching' },
        { id: 'teaching-workshops', mainSection: 'teaching' },
        { id: 'teaching-achievements', mainSection: 'teaching' },
        
        // Resources subsections
        { id: 'resources-course-materials', mainSection: 'resources' },
        { id: 'resources-assignments', mainSection: 'resources' },
        { id: 'resources-lab-materials', mainSection: 'resources' },
        { id: 'resources-thesis-templates', mainSection: 'resources' },
        { id: 'resources-article-templates', mainSection: 'resources' },
        { id: 'resources-datasets', mainSection: 'resources' },
        { id: 'resources-ai-code', mainSection: 'resources' },
        { id: 'resources-student-uploads', mainSection: 'resources' },
        { id: 'resources-ethics', mainSection: 'resources' },
        { id: 'resources-blog', mainSection: 'resources' },
        { id: 'resources-gallery', mainSection: 'resources' },
        { id: 'resources-downloads', mainSection: 'resources' },
        
        // About subsections
        { id: 'about-biography', mainSection: 'about' },
        { id: 'about-skills', mainSection: 'about' },
        { id: 'about-timeline', mainSection: 'about' },
        { id: 'about-experience', mainSection: 'about' },
        { id: 'about-editorial', mainSection: 'about' },
        { id: 'about-leadership', mainSection: 'about' },
        { id: 'about-gallery', mainSection: 'about' }
      ];
      
      // Find the currently visible section
      let currentSection = null;
      let currentSubsection = null;
      
      for (const section of allSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset for better UX)
          if (rect.top <= 150 && rect.bottom >= 50) {
            currentSection = section.mainSection;
            currentSubsection = section.id;
            break;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
        
        // Update global navigation states for subsections
        if (currentSubsection && currentSubsection.includes('-')) {
          if (currentSubsection.startsWith('projects-')) {
            const projectTab = currentSubsection.replace('projects-', '');
            if (['featured', 'all', 'tools', 'demos'].includes(projectTab)) {
              if (window.projectsNavigation && window.projectsNavigation.setActiveTab) {
                window.projectsNavigation.setActiveTab(projectTab);
              }
            }
          } else if (currentSubsection.startsWith('teaching-')) {
            const teachingTab = currentSubsection.replace('teaching-', '');
            if (['courses', 'experience', 'supervision', 'workshops', 'achievements'].includes(teachingTab)) {
              if (window.teachingNavigation && window.teachingNavigation.setActiveTab) {
                window.teachingNavigation.setActiveTab(teachingTab);
              }
            }
          } else if (currentSubsection.startsWith('services-')) {
            const servicesTab = currentSubsection.replace('services-', '');
            if (['consulting', 'aiml', 'editing', 'advisory', 'analysis'].includes(servicesTab)) {
              if (window.servicesNavigation && window.servicesNavigation.setActiveTab) {
                window.servicesNavigation.setActiveTab(servicesTab);
              }
            }
          } else if (currentSubsection.startsWith('resources-')) {
            const resourcesTab = currentSubsection.replace('resources-', '');
            if (['course-materials', 'assignments', 'lab-materials', 'thesis-templates', 'article-templates', 'datasets', 'ai-code', 'student-uploads', 'ethics', 'blog', 'gallery', 'downloads'].includes(resourcesTab)) {
              if (window.resourcesNavigation && window.resourcesNavigation.setActiveTab) {
                window.resourcesNavigation.setActiveTab(resourcesTab);
              }
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close any open dropdown when clicking outside the menu bar or pressing Escape
  const navRef = useRef(null);
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    const onKey = (e) => { if (e.key === 'Escape') setActiveDropdown(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const navItems = [
    { 
      name: 'Home', 
      href: '#hero',
      type: 'direct',
      id: 'home'
    },
    { 
      name: 'About', 
      type: 'dropdown',
      id: 'about',
      href: '#about',
      subItems: [
        { name: 'Biography', href: '#about-biography' },
        { name: 'Skills & Expertise', href: '#about-skills' },
        { name: 'Career Timeline', href: '#about-timeline' },
        { name: 'Professional Experience', href: '#about-experience' },
        { name: 'Editorial Roles', href: '#about-editorial' },
        { name: 'Leadership', href: '#about-leadership' },
        ...(isSectionVisible('gallery') ? [{ name: 'Gallery', href: '#about-gallery' }] : [])
      ]
    },
    { 
      name: 'Research', 
      type: 'dropdown',
      id: 'research',
      href: '#research',
      subItems: [
        { name: 'Research Interests', href: '#research-interests' },
        { name: 'Research Projects', href: '#research-projects' },
        { name: 'Research Funding', href: '#research-funding' },
        { name: 'Research Collaborations', href: '#research-collaborations' },
        { name: 'Research Timeline', href: '#research-timeline' }
      ]
    },
    { 
      name: 'Publications', 
      type: 'dropdown',
      id: 'publications',
      href: '#publications',
      subItems: [
        { name: 'Journal Papers', href: '#publications-journal' },
        { name: 'Conference Presentations', href: '#publications-conferences' },
        { name: 'Book Chapters', href: '#publications-books' },
        { name: 'Publication Search', href: '#publications-search' },
        { name: 'Citation Export', href: '#publications-citations' }
      ]
    },
    { 
      name: 'Projects', 
      type: 'dropdown',
      id: 'projects',
      subItems: [
        { name: 'Featured Projects', href: '#projects-featured', action: () => window.navigateToProjectTab('featured') },
        { name: 'All Projects', href: '#projects-all', action: () => window.navigateToProjectTab('all') },
        { name: 'Software Tools', href: '#projects-tools', action: () => window.navigateToProjectTab('tools') },
        { name: 'Demos', href: '#projects-demos', action: () => window.navigateToProjectTab('demos') }
      ]
    },
    { 
      name: 'Teaching', 
      type: 'dropdown',
      id: 'teaching',
      subItems: [
        { name: 'Courses', href: '#teaching-courses', action: () => window.navigateToTeachingTab('courses') },
        { name: 'Teaching Experience', href: '#teaching-experience', action: () => window.navigateToTeachingTab('experience') },
        { name: 'Supervision', href: '#teaching-supervision', action: () => window.navigateToTeachingTab('supervision') },
        { name: 'Workshops', href: '#teaching-workshops', action: () => window.navigateToTeachingTab('workshops') },
        { name: 'Achievements', href: '#teaching-achievements', action: () => window.navigateToTeachingTab('achievements') }
      ]
    },
    { 
      name: 'Services', 
      type: 'dropdown',
      id: 'services',
      subItems: [
        { name: 'Consulting', href: '#services-consulting', action: () => window.navigateToServicesTab('consulting') },
        { name: 'AI/ML Model Dev', href: '#services-aiml', action: () => window.navigateToServicesTab('aiml') },
        { name: 'Editing', href: '#services-editing', action: () => window.navigateToServicesTab('editing') },
        { name: 'Advisory', href: '#services-advisory', action: () => window.navigateToServicesTab('advisory') },
        { name: 'Data Analysis', href: '#services-analysis', action: () => window.navigateToServicesTab('analysis') }
      ]
    },
    { 
      name: 'Resources', 
      type: 'dropdown',
      id: 'resources',
      href: '#resources',
      subItems: [
        { name: 'Course Materials (PDF, slides)', href: '#resources-course-materials', action: () => window.navigateToResourcesTab('course-materials') },
        { name: 'Assignments (private access)', href: '#resources-assignments', action: () => window.navigateToResourcesTab('assignments') },
        { name: 'Lab Materials', href: '#resources-lab-materials', action: () => window.navigateToResourcesTab('lab-materials') },
        { name: 'Thesis Templates', href: '#resources-thesis-templates', action: () => window.navigateToResourcesTab('thesis-templates') },
        { name: 'Article Templates', href: '#resources-article-templates', action: () => window.navigateToResourcesTab('article-templates') },
        { name: 'Datasets', href: '#resources-datasets', action: () => window.navigateToResourcesTab('datasets') },
        { name: 'AI Project Code', href: '#resources-ai-code', action: () => window.navigateToResourcesTab('ai-code') },
        { name: 'Student Uploads', href: '#resources-student-uploads', action: () => window.navigateToResourcesTab('student-uploads') },
        { name: 'Ethics Documents', href: '#resources-ethics', action: () => window.navigateToResourcesTab('ethics') },
        { name: 'Blog & Articles', href: '#blog' },
        { name: 'Downloads & Tools', href: '#resources-downloads', action: () => window.navigateToResourcesTab('downloads') }
      ]
    },
    { 
      name: 'Contact', 
      href: '#contact',
      type: 'direct',
      id: 'contact'
    }
  ];

  const scrollToSection = (href) => {
    // Check if we're in the Student Portal
    const isInStudentPortal = window.location.pathname.startsWith('/student');
    
    if (isInStudentPortal) {
      // If in Student Portal, navigate to main website with the section
      window.location.href = `${window.location.origin}${href}`;
    } else {
      // If on main website, use smooth scrolling
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguageOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality here
      console.log('Searching for:', searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav ref={navRef} className={`fixed top-0 lg:left-64 left-0 right-0 z-[9999] transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-800/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
        : 'bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/30'
    }`}>
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Navigation */}
          <div className="flex items-center flex-1 max-w-4xl mr-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 flex-wrap">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.type === 'direct' ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`px-2 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                        activeSection === item.id
                          ? 'text-blue-400 bg-blue-500/10 rounded-md'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-md'
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <>
                      <button
                        className={`flex items-center px-2 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                          activeSection === item.id
                            ? 'text-blue-400 bg-blue-500/10 rounded-md'
                            : 'text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-md'
                        }`}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === item.name}
                        onClick={(e) => {
                          // Open the dropdown only; the "Overview" entry goes to the section
                          e.stopPropagation();
                          setActiveDropdown(item.name);
                        }}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 w-3 h-3" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-1 w-56 rounded-md shadow-xl transition-all duration-200 ${
                          activeDropdown === item.name 
                            ? 'opacity-100 visible transform translate-y-0' 
                            : 'opacity-0 invisible transform -translate-y-2'
                        } bg-slate-800/95 backdrop-blur-md border border-slate-700/50`}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        style={{ 
                          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          zIndex: 99999
                        }}
                      >
                        <div className="py-2">
                          <a
                            href={item.href || `#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveDropdown(null);
                              scrollToSection(item.href || `#${item.id}`);
                            }}
                            className="block px-4 py-2 text-sm font-semibold text-blue-300 hover:text-blue-400 hover:bg-slate-700 border-b border-slate-700/60 mb-1"
                          >
                            {item.name} overview
                          </a>
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                // Use NavigationHandler for all dropdown navigation
                                navigationHandler.handleDropdownClick(subItem, setActiveDropdown, scrollToSection);
                              }}
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-slate-700 transition-colors duration-200"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Search & Language */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-32 sm:w-40 lg:w-48 px-3 py-1.5 text-sm bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center px-3 py-1.5 text-sm text-gray-300 bg-slate-700/50 border border-slate-600 rounded-md hover:bg-slate-700 transition-colors duration-200"
              >
                <Search size={16} className="mr-2" />
                <span className="hidden sm:inline">Search</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center px-3 py-1.5 text-sm text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200"
                title="Language"
              >
                <Globe size={16} className="mr-1" />
                <span className="hidden sm:inline text-xs">
                  {languages.find(lang => lang.code === i18n.language)?.name || 'EN'}
                </span>
                <ChevronDown className="ml-1 w-3 h-3" />
              </button>
              
              {languageOpen && createPortal(
                <div 
                  className="fixed bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-md shadow-xl py-1 w-40"
                  style={{ 
                    zIndex: 2147483647,
                    top: '60px',
                    right: '16px',
                    position: 'fixed'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 ${
                        i18n.language === lang.code
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-slate-700'
                      }`}
                    >
                      {lang.name} - {lang.fullName}
                    </button>
                  ))}
                </div>,
                document.body
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className={`md:hidden ${
          darkMode 
            ? 'bg-gray-900/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        } border-t backdrop-blur-md max-h-96 overflow-y-auto`}>
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.type === 'direct' ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                      darkMode 
                        ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800/50' 
                        : 'text-gray-700 hover:text-pink-600 hover:bg-gray-100/50'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <div>
                    <button
                      aria-expanded={activeDropdown === item.name}
                      onClick={() => {
                        // Open or close the sub-menu only
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        darkMode 
                          ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800/50' 
                          : 'text-gray-700 hover:text-pink-600 hover:bg-gray-100/50'
                      }`}
                    >
                      {item.name}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Mobile Sub-menu */}
                    {activeDropdown === item.name && (
                      <div className="mt-1 ml-4 space-y-1">
                        <a
                          href={item.href || `#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveDropdown(null);
                            scrollToSection(item.href || `#${item.id}`);
                          }}
                          className={`block px-3 py-2 rounded-md text-sm font-semibold ${darkMode ? 'text-blue-300 hover:bg-gray-800/30' : 'text-blue-700 hover:bg-gray-100/30'}`}
                        >
                          {item.name} overview
                        </a>
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Use NavigationHandler for mobile dropdown navigation
                              navigationHandler.handleDropdownClick(subItem, setActiveDropdown, scrollToSection);
                            }}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                              darkMode 
                                ? 'text-gray-400 hover:text-pink-400 hover:bg-gray-800/30' 
                                : 'text-gray-600 hover:text-pink-600 hover:bg-gray-100/30'
                            }`}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;