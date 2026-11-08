import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideNavbar from './components/SideNavbar';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';
import GlobalThemeSwitcher from './components/GlobalThemeSwitcher';
import Footer from './components/Footer';
import { isSectionVisible } from './config/sections';
// StudentModule removed for production clean version

import './utils/i18n';
import './utils/globalNavigation';
import './App.css';

// Complete 15-section website structure - lazy loaded
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Research = lazy(() => import('./components/Research'));
const Publications = lazy(() => import('./components/Publications'));
const Projects = lazy(() => import('./components/Projects'));
const Teaching = lazy(() => import('./components/Teaching'));
const Services = lazy(() => import('./components/Services'));
const Resources = lazy(() => import('./components/Resources'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const News = lazy(() => import('./components/News'));
const Awards = lazy(() => import('./components/Awards'));
const Gallery = lazy(() => import('./components/Gallery'));
const Contact = lazy(() => import('./components/Contact'));
const ChatBot = lazy(() => import('./components/ChatBot'));

// Simple loading fallback
const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [activeSection, setActiveSection] = useState('home');
  const [themeOpen, setThemeOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  // Theme definitions
  const themes = {
    default: {
      name: 'Default',
      description: 'Classic dark/light theme',
      colors: {
        primary: '#ec4899', // pink-500
        secondary: '#6b7280', // gray-500
        accent: '#3b82f6', // blue-500
        background: darkMode ? '#111827' : '#ffffff',
        surface: darkMode ? '#1f2937' : '#f9fafb',
        text: darkMode ? '#ffffff' : '#111827',
        textSecondary: darkMode ? '#d1d5db' : '#6b7280'
      },
      gradient: 'from-pink-500 to-blue-500',
      className: 'theme-default'
    },
    grido: {
      name: 'GRIDO',
      description: 'Blue/Purple gradient theme',
      colors: {
        primary: '#8b5cf6', // violet-500
        secondary: '#3b82f6', // blue-500
        accent: '#06b6d4', // cyan-500
        background: darkMode ? '#0f0f23' : '#f8fafc',
        surface: darkMode ? '#1e1b4b' : '#e0e7ff',
        text: darkMode ? '#ffffff' : '#1e1b4b',
        textSecondary: darkMode ? '#c4b5fd' : '#6366f1'
      },
      gradient: 'from-blue-600 via-purple-600 to-indigo-600',
      className: 'theme-grido'
    },
    cyber: {
      name: 'Cyber',
      description: 'Neon cyberpunk theme',
      colors: {
        primary: '#00ff88', // neon green
        secondary: '#ff0080', // neon pink
        accent: '#00d4ff', // neon cyan
        background: darkMode ? '#0a0a0a' : '#f0f0f0',
        surface: darkMode ? '#1a1a2e' : '#e8e8e8',
        text: darkMode ? '#00ff88' : '#1a1a2e',
        textSecondary: darkMode ? '#00d4ff' : '#ff0080'
      },
      gradient: 'from-green-400 via-cyan-400 to-pink-400',
      className: 'theme-cyber'
    },
    sunset: {
      name: 'Sunset',
      description: 'Warm sunset colors',
      colors: {
        primary: '#f97316', // orange-500
        secondary: '#ef4444', // red-500
        accent: '#eab308', // yellow-500
        background: darkMode ? '#1c1917' : '#fffbeb',
        surface: darkMode ? '#292524' : '#fef3c7',
        text: darkMode ? '#fed7aa' : '#1c1917',
        textSecondary: darkMode ? '#fdba74' : '#ea580c'
      },
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      className: 'theme-sunset'
    },
    ocean: {
      name: 'Ocean',
      description: 'Deep ocean blues',
      colors: {
        primary: '#0ea5e9', // sky-500
        secondary: '#0284c7', // sky-600
        accent: '#06b6d4', // cyan-500
        background: darkMode ? '#0c1426' : '#f0f9ff',
        surface: darkMode ? '#1e293b' : '#e0f2fe',
        text: darkMode ? '#7dd3fc' : '#0c1426',
        textSecondary: darkMode ? '#38bdf8' : '#0284c7'
      },
      gradient: 'from-blue-600 via-cyan-600 to-teal-600',
      className: 'theme-ocean'
    }
  };

  // Simple loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'research', 'publications', 'projects', 'teaching', 'services', 'resources', 'portfolio', 'testimonials', 'blog', 'news', 'awards', 'gallery', 'contact'].filter(isSectionVisible);
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection === 'hero' ? 'home' : currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      const root = document.documentElement;
      
      // Apply CSS custom properties
      root.style.setProperty('--theme-primary', theme.colors.primary);
      root.style.setProperty('--theme-secondary', theme.colors.secondary);
      root.style.setProperty('--theme-accent', theme.colors.accent);
      root.style.setProperty('--theme-background', theme.colors.background);
      root.style.setProperty('--theme-surface', theme.colors.surface);
      root.style.setProperty('--theme-text', theme.colors.text);
      root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
      
      // Remove all theme classes
      Object.values(themes).forEach(t => {
        root.classList.remove(t.className);
      });
      
      // Add current theme class
      root.classList.add(theme.className);
      
      // Apply dark mode
      if (darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // Store theme preference
      localStorage.setItem('preferred-theme', currentTheme);
    }
  }, [currentTheme, darkMode, themes]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div 
        className="min-h-screen transition-all duration-300"
        style={{
          backgroundColor: themes[currentTheme].colors.background,
          color: themes[currentTheme].colors.text
        }}
      >
        <Routes>
          {/* Main Portfolio Route */}
          <Route path="/*" element={
            <>
              {/* Top Navbar */}
              <Navbar 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode}
                currentTheme={currentTheme}
                changeTheme={changeTheme}
                themes={themes}
                onLanguageDropdownChange={setLanguageDropdownOpen}
              />

              {/* Side Navbar */}
              <SideNavbar 
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                activeSection={activeSection}
                onNavigate={setActiveSection}
              />

              {/* Main Content Area */}
              <div className="lg:ml-64 transition-all duration-300">
                <main className="w-full pt-16">
                  {/* Home Section - Contains Hero, Quick Intro, Featured Research, Latest Publications, Quick Links */}
                  <section id="hero">
                    <Home currentTheme={currentTheme} changeTheme={changeTheme} />
                  </section>

                  {/* Section 2: About */}
                  <section id="about">
                    <Suspense fallback={<ComponentFallback />}>
                      <About />
                    </Suspense>
                  </section>



                  {/* Section 4: Experience */}
                  <section id="experience">
                    <Suspense fallback={<ComponentFallback />}>
                      <Experience />
                    </Suspense>
                  </section>

                  {/* Section 5: Research */}
                  <section id="research">
                    <Suspense fallback={<ComponentFallback />}>
                      <Research />
                    </Suspense>
                  </section>

                  {/* Section 6: Publications */}
                  <section id="publications">
                    <Suspense fallback={<ComponentFallback />}>
                      <Publications />
                    </Suspense>
                  </section>

                  {/* Section 7: Projects */}
                  <section id="projects">
                    <Suspense fallback={<ComponentFallback />}>
                      <Projects />
                    </Suspense>
                  </section>

                  {/* Section 8: Teaching */}
                  <section id="teaching">
                    <Suspense fallback={<ComponentFallback />}>
                      <Teaching />
                    </Suspense>
                  </section>

                  {/* Section 9: Services */}
                  <section id="services">
                    <Suspense fallback={<ComponentFallback />}>
                      <Services />
                    </Suspense>
                  </section>

                  {/* Section 10: Resources */}
                  <section id="resources">
                    <Suspense fallback={<ComponentFallback />}>
                      <Resources />
                    </Suspense>
                  </section>

                  {/* Section 11: Portfolio */}
                  <section id="portfolio">
                    <Suspense fallback={<ComponentFallback />}>
                      <Portfolio />
                    </Suspense>
                  </section>

                  {/* Section 11: Testimonials */}
                  {isSectionVisible('testimonials') && (
                    <section id="testimonials">
                      <Suspense fallback={<ComponentFallback />}>
                        <Testimonials />
                      </Suspense>
                    </section>
                  )}

                  {/* Section 12: Blog */}
                  <section id="blog">
                    <Suspense fallback={<ComponentFallback />}>
                      <Blog />
                    </Suspense>
                  </section>

                  {/* Section 13: News */}
                  {isSectionVisible('news') && (
                    <section id="news">
                      <Suspense fallback={<ComponentFallback />}>
                        <News />
                      </Suspense>
                    </section>
                  )}

                  {/* Section 14: Awards */}
                  <section id="awards">
                    <Suspense fallback={<ComponentFallback />}>
                      <Awards />
                    </Suspense>
                  </section>

                  {/* Section 15: Gallery */}
                  {isSectionVisible('gallery') && (
                    <section id="gallery">
                      <Suspense fallback={<ComponentFallback />}>
                        <Gallery />
                      </Suspense>
                    </section>
                  )}

                  {/* Section 16: Contact */}
                  <section id="contact">
                    <Suspense fallback={<ComponentFallback />}>
                      <Contact />
                    </Suspense>
                  </section>
                </main>

                {/* Footer Section */}
                <Footer />

                <Suspense fallback={null}>
                  <ChatBot />
                </Suspense>
              </div>

              {/* Single Global Theme Switcher - Fixed position, follows user on all pages */}
              <div className="fixed top-16 right-4 z-50">
                <GlobalThemeSwitcher currentTheme={currentTheme} changeTheme={changeTheme} />
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;