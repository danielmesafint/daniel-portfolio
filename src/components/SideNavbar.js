import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Search, 
  FileText, 
  Code, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  FolderOpen, 
  Mail,
  Sun,
  Moon,
  Eye,
  ChevronRight,
  BarChart3,
  Calendar,
  Award,
  Camera,
  MessageSquare,
  Newspaper,
  Star,
  TrendingUp,
  Users,
  Download,
  Upload,
  Database,
  Shield,
  Presentation,
  Sheet,
  Folder,
  Lock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import navigationHandler from '../utils/NavigationHandler';
import { STUDENT_PORTAL_ENABLED, isSectionVisible } from '../config/sections';

const SideNavbar = ({ darkMode, toggleDarkMode, activeSection, onNavigate }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [currentActiveSection, setCurrentActiveSection] = useState('home');
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [userClickedMenu, setUserClickedMenu] = useState(false);

  const navigationItems = [
    { 
      id: 'home', 
      name: 'Home', 
      icon: Home, 
      href: '#hero',
      color: 'text-blue-400',
      type: 'direct'
    },
    { 
      id: 'about', 
      name: 'About', 
      icon: User, 
      href: '#about',
      color: 'text-purple-400',
      subItems: [
        { name: 'Biography', href: '#about-biography', icon: User },
        { name: 'Skills & Expertise', href: '#about-skills', icon: TrendingUp },
        { name: 'Career Timeline', href: '#about-timeline', icon: Calendar },
        { name: 'Professional Experience', href: '#about-experience', icon: Briefcase },
        { name: 'Editorial Roles', href: '#about-editorial', icon: BookOpen },
        { name: 'Leadership', href: '#about-leadership', icon: Award },
        ...(isSectionVisible('gallery') ? [{ name: 'Gallery', href: '#about-gallery', icon: Camera }] : [])
      ]
    },
    { 
      id: 'research', 
      name: 'Research', 
      icon: Search, 
      href: '#research',
      color: 'text-cyan-400',
      subItems: [
        { name: 'Research Interests', href: '#research-interests', icon: Search },
        { name: 'Research Projects', href: '#research-projects', icon: Code },
        { name: 'Research Funding', href: '#research-funding', icon: Award },
        { name: 'Research Collaborations', href: '#research-collaborations', icon: Users },
        { name: 'Research Timeline', href: '#research-timeline', icon: Calendar }
      ]
    },
    { 
      id: 'publications', 
      name: 'Publications', 
      icon: FileText, 
      href: '#publications',
      color: 'text-green-400',
      subItems: [
        { name: 'Journal Papers', href: '#publications-journal', icon: FileText },
        { name: 'Conference Presentations', href: '#publications-conferences', icon: Award },
        { name: 'Book Chapters', href: '#publications-books', icon: BookOpen },
        { name: 'Publication Search', href: '#publications-search', icon: Search },
        { name: 'Citation Export', href: '#publications-citations', icon: BarChart3 }
      ]
    },
    { 
      id: 'projects', 
      name: 'Projects', 
      icon: Code, 
      href: '#projects',
      color: 'text-orange-400',
      subItems: [
        { name: 'Featured Projects', href: '#projects-featured', icon: Star, action: () => window.navigateToProjectTab('featured') },
        { name: 'All Projects', href: '#projects-all', icon: Code, action: () => window.navigateToProjectTab('all') },
        { name: 'Software Tools', href: '#projects-tools', icon: TrendingUp, action: () => window.navigateToProjectTab('tools') },
        { name: 'Demos', href: '#projects-demos', icon: BarChart3, action: () => window.navigateToProjectTab('demos') }
      ]
    },
    { 
      id: 'teaching', 
      name: 'Teaching', 
      icon: GraduationCap, 
      href: '#teaching',
      color: 'text-pink-400',
      subItems: [
        { name: 'Courses', href: '#teaching-courses', icon: BookOpen, action: () => window.navigateToTeachingTab('courses') },
        { name: 'Teaching Experience', href: '#teaching-experience', icon: GraduationCap, action: () => window.navigateToTeachingTab('experience') },
        { name: 'Supervision', href: '#teaching-supervision', icon: Users, action: () => window.navigateToTeachingTab('supervision') },
        { name: 'Workshops', href: '#teaching-workshops', icon: TrendingUp, action: () => window.navigateToTeachingTab('workshops') },
        { name: 'Achievements', href: '#teaching-achievements', icon: Award, action: () => window.navigateToTeachingTab('achievements') }
      ]
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: Briefcase, 
      href: '#services',
      color: 'text-yellow-400',
      subItems: [
        { name: 'Consulting', href: '#services-consulting', icon: Briefcase, action: () => window.navigateToServicesTab('consulting') },
        { name: 'AI/ML Model Dev', href: '#services-aiml', icon: TrendingUp, action: () => window.navigateToServicesTab('aiml') },
        { name: 'Editing', href: '#services-editing', icon: FileText, action: () => window.navigateToServicesTab('editing') },
        { name: 'Advisory', href: '#services-advisory', icon: Users, action: () => window.navigateToServicesTab('advisory') },
        { name: 'Data Analysis', href: '#services-analysis', icon: BarChart3, action: () => window.navigateToServicesTab('analysis') }
      ]
    },
    { 
      id: 'resources', 
      name: 'Resources', 
      icon: FolderOpen, 
      href: '#resources',
      color: 'text-indigo-400',
      subItems: [
        { name: 'Course Materials (PDF, slides)', href: '#resources-course-materials', icon: Presentation, action: () => window.navigateToResourcesTab('course-materials') },
        { name: 'Assignments (private access)', href: '#resources-assignments', icon: Lock, action: () => window.navigateToResourcesTab('assignments') },
        { name: 'Lab Materials', href: '#resources-lab-materials', icon: Sheet, action: () => window.navigateToResourcesTab('lab-materials') },
        { name: 'Thesis Templates', href: '#resources-thesis-templates', icon: FileText, action: () => window.navigateToResourcesTab('thesis-templates') },
        { name: 'Article Templates', href: '#resources-article-templates', icon: BookOpen, action: () => window.navigateToResourcesTab('article-templates') },
        { name: 'Datasets', href: '#resources-datasets', icon: Database, action: () => window.navigateToResourcesTab('datasets') },
        { name: 'AI Project Code', href: '#resources-ai-code', icon: Code, action: () => window.navigateToResourcesTab('ai-code') },
        { name: 'Student Uploads', href: '#resources-student-uploads', icon: Upload, action: () => window.navigateToResourcesTab('student-uploads') },
        { name: 'Ethics Documents', href: '#resources-ethics', icon: Shield, action: () => window.navigateToResourcesTab('ethics') },
        { name: 'Blog & Articles', href: '#resources-blog', icon: BookOpen, action: () => window.navigateToResourcesTab('blog') },
        { name: 'Media Gallery', href: '#resources-gallery', icon: Camera, action: () => window.navigateToResourcesTab('gallery') },
        { name: 'Downloads & Tools', href: '#resources-downloads', icon: Download, action: () => window.navigateToResourcesTab('downloads') }
      ]
    },
    { 
      id: 'student-portal', 
      name: 'Academic Portal', 
      icon: GraduationCap, 
      href: '/student',
      color: 'text-emerald-400',
      type: 'direct',
      isExternal: true
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      icon: Mail, 
      href: '#contact',
      color: 'text-red-500',
      type: 'direct'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
      
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
      let activeMainSection = null;
      let activeSubsectionId = null;
      
      for (const section of allSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset for better UX)
          if (rect.top <= 150 && rect.bottom >= 50) {
            activeMainSection = section.mainSection;
            activeSubsectionId = section.id;
            break;
          }
        }
      }
      
      if (activeMainSection) {
        setCurrentActiveSection(activeMainSection);
        setCurrentSubsection(activeSubsectionId);
        
        // DO NOT auto-expand menu when scrolling - only expand on user click
        // This prevents interference with smooth scrolling
        
        // Update global navigation states for subsections
        if (activeSubsectionId && activeSubsectionId.includes('-')) {
          if (activeSubsectionId.startsWith('projects-')) {
            const projectTab = activeSubsectionId.replace('projects-', '');
            if (['featured', 'all', 'tools', 'demos'].includes(projectTab)) {
              if (window.projectsNavigation && window.projectsNavigation.setActiveTab) {
                window.projectsNavigation.setActiveTab(projectTab);
              }
            }
          } else if (activeSubsectionId.startsWith('teaching-')) {
            const teachingTab = activeSubsectionId.replace('teaching-', '');
            if (['courses', 'experience', 'supervision', 'workshops', 'achievements'].includes(teachingTab)) {
              if (window.teachingNavigation && window.teachingNavigation.setActiveTab) {
                window.teachingNavigation.setActiveTab(teachingTab);
              }
            }
          } else if (activeSubsectionId.startsWith('services-')) {
            const servicesTab = activeSubsectionId.replace('services-', '');
            if (['consulting', 'aiml', 'editing', 'advisory', 'analysis'].includes(servicesTab)) {
              if (window.servicesNavigation && window.servicesNavigation.setActiveTab) {
                window.servicesNavigation.setActiveTab(servicesTab);
              }
            }
          } else if (activeSubsectionId.startsWith('resources-')) {
            const resourcesTab = activeSubsectionId.replace('resources-', '');
            if (['course-materials', 'assignments', 'lab-materials', 'thesis-templates', 'article-templates', 'datasets', 'ai-code', 'student-uploads', 'ethics', 'blog', 'gallery', 'downloads'].includes(resourcesTab)) {
              if (window.resourcesNavigation && window.resourcesNavigation.setActiveTab) {
                window.resourcesNavigation.setActiveTab(resourcesTab);
              }
            }
          }
        }
        
        // Call onNavigate if provided
        if (onNavigate) {
          onNavigate(activeMainSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onNavigate]);

  const handleNavigation = (href, id, isExternal = false) => {
    if (isExternal || href.startsWith('/')) {
      // Handle external links or routes
      window.location.href = href;
    } else {
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
    }
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const handleViewCV = () => {
    // Open CV in new tab
    window.open('/Dr_Daniel_Mesafint_CV.pdf', '_blank');
  };

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-700/50 z-[9998] flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-6 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
        {/* Portfolio Title */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-400 mb-1">Dr. Daniel Portfolio</h2>
        </div>
        
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-md transition-colors duration-200 text-sm text-gray-300"
          >
            {darkMode ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
          
          <button
            onClick={handleViewCV}
            className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 text-sm text-white font-medium whitespace-nowrap"
          >
            <Eye size={16} className="mr-2" />
            View My CV
          </button>
        </div>
      </div>

      {/* Blue Scroll Progress Indicator */}
      <div className="absolute right-0 top-0 w-1 h-full bg-slate-700/30">
        <div 
          className="w-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Scrollable Navigation Menu */}
      <div 
        className="overflow-y-auto p-3 sidebar-scroll relative"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#475569 #1e293b',
          height: 'calc(100vh - 220px)' // Fixed height to enable scrolling
        }}
      >

        
        <nav className="space-y-0.5 pb-8">
          {navigationItems.filter((item) => item.href !== '/student' || STUDENT_PORTAL_ENABLED).map((item) => {
            const Icon = item.icon;
            const isActive = currentActiveSection === item.id || 
              (item.id === 'home' && currentActiveSection === 'hero') ||
              (item.id === 'projects' && currentActiveSection === 'portfolio') ||
              (item.id === 'academic' && (currentActiveSection === 'teaching' || currentActiveSection === 'awards')) ||
              (item.id === 'resources' && currentActiveSection === 'services');
            
            // Check if any subsection of this item is currently active
            const hasActiveSubsection = item.subItems && item.subItems.some(subItem => {
              const subId = subItem.href.replace('#', '');
              return currentSubsection === subId;
            });

            // Show visual indicator for active subsection even when menu is collapsed
            const activeSubsectionName = item.subItems && item.subItems.find(subItem => {
              const subId = subItem.href.replace('#', '');
              return currentSubsection === subId;
            })?.name;
            
            const isExpanded = expandedMenu === item.id;

            return (
              <div key={item.id} className="space-y-1">
                {/* Main Menu Item */}
                <button
                  onClick={() => {
                    setUserClickedMenu(true);
                    if (item.type === 'direct') {
                      // Direct navigation for Home, Contact, and Student Portal
                      handleNavigation(item.href, item.id, item.isExternal);
                      setExpandedMenu(null); // Close any open menus
                    } else {
                      // Dropdown items only open or close their sub-menu
                      setExpandedMenu(isExpanded ? null : item.id);
                    }
                    // Reset user click flag after a short delay
                    setTimeout(() => setUserClickedMenu(false), 500);
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-all duration-200 group relative ${
                    isActive || hasActiveSubsection
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 flex-shrink-0 ${isActive || hasActiveSubsection ? 'text-white' : item.color}`}
                  />
                  <div className="flex-1 text-left">
                    <span className="font-medium">{item.name}</span>
                    {/* Show active subsection indicator when menu is collapsed */}
                    {hasActiveSubsection && !isExpanded && activeSubsectionName && (
                      <div className="text-xs text-blue-200 mt-0.5 truncate">
                        → {activeSubsectionName}
                      </div>
                    )}
                  </div>
                  {item.type !== 'direct' && (
                    <ChevronRight 
                      size={16} 
                      className={`ml-auto flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      } ${isActive || hasActiveSubsection ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}
                    />
                  )}
                </button>

                {/* Dropdown Submenu - Only show for non-direct items */}
                {isExpanded && item.type !== 'direct' && item.subItems && (
                  <div className="ml-6 space-y-0 animate-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => handleNavigation(item.href, item.id, item.isExternal)}
                      className="w-full flex items-start px-3 py-1.5 rounded-md text-xs font-semibold text-blue-300 hover:text-pink-400 min-h-[32px]"
                    >
                      {item.name} overview
                    </button>
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            // Use NavigationHandler for all SideNavbar submenu navigation
                            navigationHandler.handleDropdownClick(subItem, null, (href) => handleNavigation(href, item.id));
                          }}
                          className={`w-full flex items-start px-3 py-1.5 rounded-md text-xs transition-all duration-200 group min-h-[32px] ${
                            currentSubsection === subItem.href.replace('#', '')
                              ? 'text-pink-400 bg-pink-500/10'
                              : 'text-gray-400 hover:text-pink-400'
                          }`}
                        >
                          <SubIcon 
                            size={14} 
                            className="mr-2.5 text-gray-500 group-hover:text-pink-400 flex-shrink-0 mt-0.5" 
                          />
                          <span className="font-medium text-left leading-tight group-hover:text-pink-400">{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>


    </div>
  );
};

export default SideNavbar;