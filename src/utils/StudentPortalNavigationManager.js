class StudentPortalNavigationManager {
  constructor(contentManager, setCurrentContent) {
    this.contentManager = contentManager;
    this.setCurrentContent = setCurrentContent;
    this.navigationStack = [];
    this.currentContext = 'dashboard';
    this.breadcrumbs = [];
    this.listeners = [];
  }

  // Navigate to a specific content without page refresh
  navigateTo(contentId, options = {}) {
    try {
      console.log(`🚀 Navigating to: ${contentId}`);
      
      // Prevent default browser navigation
      if (options.event) {
        options.event.preventDefault();
        options.event.stopPropagation();
      }

      // Load content using content manager
      const contentData = this.contentManager.loadContent(contentId, options);
      
      // Update current content state
      if (this.setCurrentContent) {
        this.setCurrentContent(contentData);
      }

      // Update navigation state
      const navigationItem = {
        contentId,
        timestamp: Date.now(),
        context: this.currentContext,
        preserveState: options.preserveState || false,
        metadata: options.metadata || {}
      };

      this.navigationStack.push(navigationItem);
      this.updateBreadcrumbs(contentId);
      this.currentContext = contentId;

      // Notify listeners
      this.notifyNavigationChange(contentData);

      // Update URL without page refresh
      this.updateURL(contentId);

      console.log(`✅ Navigation successful to: ${contentId}`);
      return {
        success: true,
        contentId,
        contentData,
        breadcrumbs: this.breadcrumbs
      };

    } catch (error) {
      console.error(`❌ Navigation failed to: ${contentId}`, error);
      return this.handleNavigationError(error, contentId);
    }
  }

  // Navigate back in history
  navigateBack() {
    try {
      if (this.navigationStack.length > 1) {
        // Remove current item
        this.navigationStack.pop();
        
        // Get previous item
        const previousItem = this.navigationStack[this.navigationStack.length - 1];
        const contentData = this.contentManager.loadContent(previousItem.contentId);
        
        // Update state
        this.currentContext = previousItem.contentId;
        this.updateBreadcrumbs(previousItem.contentId);
        
        if (this.setCurrentContent) {
          this.setCurrentContent(contentData);
        }

        this.updateURL(previousItem.contentId);
        this.notifyNavigationChange(contentData);

        return { success: true, contentId: previousItem.contentId };
      } else {
        // Go to dashboard if no history
        return this.navigateTo('dashboard');
      }
    } catch (error) {
      console.error('❌ Back navigation failed:', error);
      return this.navigateTo('dashboard');
    }
  }

  // Navigate to dashboard (home)
  navigateToDashboard() {
    return this.navigateTo('dashboard', { clearHistory: true });
  }

  // Handle navigation menu clicks
  handleMenuClick(contentId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(`🔗 Menu click detected for: ${contentId}`);
    return this.navigateTo(contentId, { event });
  }

  // Update breadcrumbs based on content
  updateBreadcrumbs(contentId) {
    const contentConfig = this.contentManager.contentRegistry[contentId];
    if (contentConfig) {
      this.breadcrumbs = contentConfig.breadcrumbs || ['Dashboard'];
    } else {
      this.breadcrumbs = ['Dashboard'];
    }
  }

  // Update URL without page refresh
  updateURL(contentId) {
    try {
      const newURL = `/student/${contentId}`;
      window.history.pushState({ contentId }, '', newURL);
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  }

  // Handle browser back/forward buttons
  handlePopState(event) {
    if (event.state && event.state.contentId) {
      this.navigateTo(event.state.contentId, { fromPopState: true });
    } else {
      this.navigateTo('dashboard', { fromPopState: true });
    }
  }

  // Add navigation change listener
  addNavigationListener(listener) {
    this.listeners.push(listener);
  }

  // Remove navigation change listener
  removeNavigationListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Notify all listeners of navigation changes
  notifyNavigationChange(contentData) {
    this.listeners.forEach(listener => {
      try {
        listener(contentData);
      } catch (error) {
        console.error('Error in navigation listener:', error);
      }
    });
  }

  // Handle navigation errors
  handleNavigationError(error, contentId) {
    console.error(`Navigation error for ${contentId}:`, error);
    
    // Try to recover by going to dashboard
    try {
      const dashboardContent = this.contentManager.loadContent('dashboard');
      if (this.setCurrentContent) {
        this.setCurrentContent(dashboardContent);
      }
      return {
        success: false,
        error: error.message,
        recovered: true,
        contentId: 'dashboard'
      };
    } catch (recoveryError) {
      console.error('Recovery failed:', recoveryError);
      return {
        success: false,
        error: error.message,
        recovered: false
      };
    }
  }

  // Check if back navigation is possible
  canNavigateBack() {
    return this.navigationStack.length > 1;
  }

  // Get current navigation state
  getCurrentState() {
    return {
      currentContext: this.currentContext,
      breadcrumbs: this.breadcrumbs,
      navigationStack: this.navigationStack,
      canGoBack: this.navigationStack.length > 1
    };
  }

  // Initialize navigation manager
  initialize() {
    // Set up browser back/forward handling
    window.addEventListener('popstate', (event) => {
      this.handlePopState(event);
    });

    // Load initial content based on URL or saved state
    const initialContentId = this.contentManager.loadNavigationState();
    this.navigateTo(initialContentId, { initial: true });

    console.log('🎯 Student Portal Navigation Manager initialized');
  }

  // Cleanup
  destroy() {
    window.removeEventListener('popstate', this.handlePopState);
    this.listeners = [];
    this.contentManager.clearNavigationState();
  }

  // Create navigation handler for menu items
  createNavigationHandler(contentId) {
    return (event) => {
      return this.handleMenuClick(contentId, event);
    };
  }

  // Get navigation menu items with handlers
  getNavigationMenuItems() {
    const studentFeatures = this.contentManager.getStudentFeatures();
    return studentFeatures.map(feature => ({
      ...feature,
      onClick: this.createNavigationHandler(feature.id),
      isActive: this.currentContext === feature.id
    }));
  }

  // Get portfolio menu items with handlers
  getPortfolioMenuItems() {
    const portfolioSections = this.contentManager.getPortfolioSections();
    return portfolioSections.map(section => ({
      ...section,
      onClick: this.createNavigationHandler(section.id),
      isActive: this.currentContext === section.id
    }));
  }
}

export default StudentPortalNavigationManager;