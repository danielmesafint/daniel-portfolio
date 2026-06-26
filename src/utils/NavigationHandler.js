/**
 * NavigationHandler - Utility class for handling navigation between Student Portal and main website
 */
class NavigationHandler {
  constructor() {
    this.tabSections = ['projects', 'teaching', 'services', 'resources'];
    this.tabMappings = {
      projects: ['featured', 'all', 'tools', 'demos'],
      teaching: ['courses', 'experience', 'supervision', 'workshops', 'achievements'],
      services: ['consulting', 'aiml', 'editing', 'advisory', 'analysis'],
      resources: ['course-materials', 'assignments', 'lab-materials', 'thesis-templates', 'article-templates', 'datasets', 'ai-code', 'student-uploads', 'ethics', 'blog', 'gallery', 'downloads']
    };
  }

  /**
   * Check if currently in Student Portal
   */
  isInStudentPortal() {
    return window.location.pathname.startsWith('/student');
  }

  /**
   * Extract section name from href (e.g., '#about-biography' -> 'about')
   */
  extractSectionFromHref(href) {
    if (!href || !href.startsWith('#')) return null;
    const parts = href.substring(1).split('-');
    return parts[0];
  }

  /**
   * Extract subsection from href (e.g., '#projects-featured' -> 'featured')
   */
  extractSubsectionFromHref(href) {
    if (!href || !href.startsWith('#')) return null;
    const parts = href.substring(1).split('-');
    return parts.length > 1 ? parts.slice(1).join('-') : null;
  }

  /**
   * Check if section requires special tab handling
   */
  isSpecialTabSection(section) {
    return this.tabSections.includes(section);
  }

  /**
   * Validate if tab is valid for given section
   */
  isValidTab(section, tab) {
    return this.tabMappings[section]?.includes(tab) || false;
  }

  /**
   * Store tab preference in localStorage
   */
  storeTabPreference(section, tab) {
    try {
      const key = `${section}Tab`;
      localStorage.setItem(key, tab);
      console.log(`✅ NavigationHandler: Stored ${key}:`, tab);
      return true;
    } catch (error) {
      console.error('NavigationHandler: Failed to store tab preference:', error);
      return false;
    }
  }

  /**
   * Handle dropdown navigation click
   */
  handleDropdownClick(subItem, setActiveDropdown, scrollToSection) {
    try {
      console.log('🔍 NavigationHandler: Dropdown clicked:', subItem.name, subItem.href);
      console.log('🔍 NavigationHandler: Current location:', window.location.pathname);

      const isInStudentPortal = this.isInStudentPortal();
      console.log('🔍 NavigationHandler: Is in Student Portal:', isInStudentPortal);

      if (isInStudentPortal) {
        this.handleStudentPortalNavigation(subItem);
      } else {
        this.handleMainWebsiteNavigation(subItem, scrollToSection);
      }

      // Close dropdown
      if (setActiveDropdown) {
        setActiveDropdown(null);
      }

      return true;
    } catch (error) {
      console.error('NavigationHandler: Error in handleDropdownClick:', error);
      this.handleNavigationError(error, subItem);
      return false;
    }
  }

  /**
   * Handle navigation from Student Portal
   */
  handleStudentPortalNavigation(subItem) {
    console.log('🎯 NavigationHandler: Student Portal navigation triggered');

    const section = this.extractSectionFromHref(subItem.href);
    const subsection = this.extractSubsectionFromHref(subItem.href);

    console.log('🎯 NavigationHandler: Section:', section, 'Subsection:', subsection);

    if (this.isSpecialTabSection(section) && subsection) {
      this.handleSpecialTabNavigation(section, subsection, subItem.href);
    } else {
      this.handleDirectNavigation(subItem.href);
    }
  }

  /**
   * Handle special tab navigation (Projects, Teaching, Services)
   */
  handleSpecialTabNavigation(section, subsection, originalHref) {
    console.log(`🎯 NavigationHandler: ${section} tab detected:`, subsection);

    if (this.isValidTab(section, subsection)) {
      // Store tab preference
      this.storeTabPreference(section, subsection);
      
      // Navigate to main section
      const targetUrl = `${window.location.origin}/#${section}`;
      console.log('🚀 NavigationHandler: Navigating to:', targetUrl);
      window.location.href = targetUrl;
    } else {
      console.warn(`NavigationHandler: Invalid tab "${subsection}" for section "${section}"`);
      // Fallback to direct navigation
      this.handleDirectNavigation(originalHref);
    }
  }

  /**
   * Handle direct navigation to main website
   */
  handleDirectNavigation(href) {
    const targetUrl = `${window.location.origin}${href}`;
    console.log('🚀 NavigationHandler: Direct navigation to:', targetUrl);
    window.location.href = targetUrl;
  }

  /**
   * Handle navigation on main website
   */
  handleMainWebsiteNavigation(subItem, scrollToSection) {
    console.log('🏠 NavigationHandler: Main website navigation');

    if (subItem.action) {
      console.log('NavigationHandler: Calling action for', subItem.name);
      subItem.action();
    } else if (scrollToSection) {
      scrollToSection(subItem.href);
    } else {
      console.warn('NavigationHandler: No action or scrollToSection provided for main website navigation');
    }
  }

  /**
   * Handle navigation errors
   */
  handleNavigationError(error, subItem, fallbackHref = null) {
    console.error('NavigationHandler: Navigation error:', error);
    
    const errorInfo = {
      timestamp: new Date().toISOString(),
      error: error.message,
      subItem: subItem,
      currentUrl: window.location.href,
      userAgent: navigator.userAgent
    };
    
    console.error('NavigationHandler: Error details:', errorInfo);

    // Attempt fallback navigation
    try {
      if (fallbackHref) {
        console.log('NavigationHandler: Attempting fallback navigation to:', fallbackHref);
        window.location.href = `${window.location.origin}${fallbackHref}`;
      } else if (subItem?.href) {
        console.log('NavigationHandler: Attempting fallback navigation to subItem href');
        window.location.href = `${window.location.origin}${subItem.href}`;
      } else {
        console.log('NavigationHandler: No fallback available, navigating to home');
        window.location.href = window.location.origin;
      }
    } catch (fallbackError) {
      console.error('NavigationHandler: Fallback navigation failed:', fallbackError);
      // Ultimate fallback - just navigate to home
      window.location.href = window.location.origin;
    }
  }
}

// Create singleton instance
const navigationHandler = new NavigationHandler();

export default navigationHandler;