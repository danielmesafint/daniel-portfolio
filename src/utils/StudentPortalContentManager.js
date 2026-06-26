import React from 'react';

// Import Student Portal Components
import StudentDashboard from '../components/StudentModule/Dashboard/StudentDashboard';
import CourseHub from '../components/StudentModule/Courses/CourseHub';
import AssignmentManager from '../components/StudentModule/Assignments/AssignmentManager';
import GradesViewer from '../components/StudentModule/Grades/GradesViewer';
import SupervisionPortal from '../components/StudentModule/Supervision/SupervisionPortal';
import OfficeHours from '../components/StudentModule/OfficeHours/BookingSystem';
import ResearchCollaboration from '../components/StudentModule/Research/CollaborationHub';
import StudentForum from '../components/StudentModule/Forum/StudentForum';
import AIAssistant from '../components/StudentModule/AI/AIAssistant';

// Import Portfolio Components for embedded viewing
import About from '../components/About';
import Research from '../components/Research';
import Projects from '../components/Projects';
import Teaching from '../components/Teaching';
import Publications from '../components/Publications';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Contact from '../components/Contact';

class StudentPortalContentManager {
  constructor() {
    this.contentTypes = {
      STUDENT_DASHBOARD: 'student-dashboard',
      STUDENT_FEATURE: 'student-feature',
      PORTFOLIO_CONTENT: 'portfolio-content',
      EDUCATIONAL_CONTENT: 'educational-content',
      EXTERNAL_RESOURCE: 'external-resource'
    };
    
    this.navigationHistory = [];
    this.currentContext = null;
    this.breadcrumbs = [];
    
    // Define content registry
    this.contentRegistry = {
      // Student Portal Features
      'dashboard': {
        type: this.contentTypes.STUDENT_DASHBOARD,
        component: StudentDashboard,
        title: 'Dashboard',
        breadcrumbs: ['Dashboard']
      },
      'courses': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: CourseHub,
        title: 'Courses',
        breadcrumbs: ['Dashboard', 'Courses']
      },
      'assignments': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: AssignmentManager,
        title: 'Assignments',
        breadcrumbs: ['Dashboard', 'Assignments']
      },
      'grades': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: GradesViewer,
        title: 'Grades',
        breadcrumbs: ['Dashboard', 'Grades']
      },
      'supervision': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: SupervisionPortal,
        title: 'Supervision',
        breadcrumbs: ['Dashboard', 'Supervision']
      },
      'office-hours': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: OfficeHours,
        title: 'Office Hours',
        breadcrumbs: ['Dashboard', 'Office Hours']
      },
      'research': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: ResearchCollaboration,
        title: 'Research',
        breadcrumbs: ['Dashboard', 'Research']
      },
      'forum': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: StudentForum,
        title: 'Forum',
        breadcrumbs: ['Dashboard', 'Forum']
      },
      'ai-assistant': {
        type: this.contentTypes.STUDENT_FEATURE,
        component: AIAssistant,
        title: 'AI Assistant',
        breadcrumbs: ['Dashboard', 'AI Assistant']
      },
      
      // Portfolio Content (Embedded)
      'portfolio-about': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: About,
        title: 'About Dr. Daniel',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'About']
      },
      'portfolio-research': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Research,
        title: 'Research',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Research']
      },
      'portfolio-projects': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Projects,
        title: 'Projects',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Projects']
      },
      'portfolio-teaching': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Teaching,
        title: 'Teaching',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Teaching']
      },
      'portfolio-publications': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Publications,
        title: 'Publications',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Publications']
      },
      'portfolio-experience': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Experience,
        title: 'Experience',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Experience']
      },
      'portfolio-services': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Services,
        title: 'Services',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Services']
      },
      'portfolio-contact': {
        type: this.contentTypes.PORTFOLIO_CONTENT,
        component: Contact,
        title: 'Contact',
        breadcrumbs: ['Dashboard', 'Instructor Portfolio', 'Contact']
      }
    };
  }

  loadContent(contentId, options = {}) {
    const contentConfig = this.contentRegistry[contentId];
    
    if (!contentConfig) {
      console.error(`Content not found: ${contentId}`);
      return this.getErrorContent(contentId);
    }

    const navigationItem = {
      contentId,
      contentConfig,
      timestamp: Date.now(),
      preserveState: options.preserveState || false,
      parentContext: this.currentContext,
      metadata: options.metadata || {}
    };

    // Add to navigation history
    this.navigationHistory.push(navigationItem);
    this.currentContext = contentId;
    this.breadcrumbs = contentConfig.breadcrumbs;

    // Store navigation state
    this.saveNavigationState();

    return this.renderContent(navigationItem);
  }

  renderContent(navigationItem) {
    const { contentConfig } = navigationItem;
    const Component = contentConfig.component;
    
    return {
      component: Component,
      type: contentConfig.type,
      title: contentConfig.title,
      breadcrumbs: contentConfig.breadcrumbs,
      contentId: navigationItem.contentId,
      isEmbedded: contentConfig.type === this.contentTypes.PORTFOLIO_CONTENT
    };
  }

  navigateBack() {
    if (this.navigationHistory.length > 1) {
      // Remove current item
      this.navigationHistory.pop();
      
      // Get previous item
      const previousItem = this.navigationHistory[this.navigationHistory.length - 1];
      this.currentContext = previousItem.contentId;
      this.breadcrumbs = previousItem.contentConfig.breadcrumbs;
      
      this.saveNavigationState();
      return this.renderContent(previousItem);
    }
    
    // If no history, go to dashboard
    return this.loadContent('dashboard');
  }

  navigateToDashboard() {
    // Clear history and go to dashboard
    this.navigationHistory = [];
    return this.loadContent('dashboard');
  }

  getCurrentContent() {
    if (this.navigationHistory.length === 0) {
      return this.loadContent('dashboard');
    }
    
    const currentItem = this.navigationHistory[this.navigationHistory.length - 1];
    return this.renderContent(currentItem);
  }

  getBreadcrumbs() {
    return this.breadcrumbs;
  }

  canNavigateBack() {
    return this.navigationHistory.length > 1;
  }

  saveNavigationState() {
    try {
      const state = {
        currentContext: this.currentContext,
        breadcrumbs: this.breadcrumbs,
        timestamp: Date.now()
      };
      localStorage.setItem('studentPortalNavigation', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving navigation state:', error);
    }
  }

  loadNavigationState() {
    try {
      const state = localStorage.getItem('studentPortalNavigation');
      if (state) {
        const parsedState = JSON.parse(state);
        this.currentContext = parsedState.currentContext;
        this.breadcrumbs = parsedState.breadcrumbs;
        return parsedState.currentContext;
      }
    } catch (error) {
      console.error('Error loading navigation state:', error);
    }
    return 'dashboard';
  }

  clearNavigationState() {
    localStorage.removeItem('studentPortalNavigation');
    this.navigationHistory = [];
    this.currentContext = null;
    this.breadcrumbs = [];
  }

  getErrorContent(contentId) {
    return {
      component: () => (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Content Not Found</h2>
            <p className="text-gray-400 mb-4">
              The requested content "{contentId}" could not be loaded.
            </p>
            <button
              onClick={() => this.navigateToDashboard()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors duration-200"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      ),
      type: this.contentTypes.STUDENT_DASHBOARD,
      title: 'Error',
      breadcrumbs: ['Dashboard', 'Error'],
      contentId: 'error',
      isEmbedded: false
    };
  }

  // Get available content for navigation menus
  getStudentFeatures() {
    return [
      { id: 'dashboard', title: 'Dashboard', icon: 'BarChart3' },
      { id: 'courses', title: 'Courses', icon: 'BookOpen' },
      { id: 'assignments', title: 'Assignments', icon: 'FileText' },
      { id: 'grades', title: 'Grades', icon: 'Award' },
      { id: 'supervision', title: 'Supervision', icon: 'Users' },
      { id: 'office-hours', title: 'Office Hours', icon: 'Calendar' },
      { id: 'research', title: 'Research', icon: 'Microscope' },
      { id: 'forum', title: 'Forum', icon: 'MessageSquare' },
      { id: 'ai-assistant', title: 'AI Assistant', icon: 'Bot' }
    ];
  }

  getPortfolioSections() {
    return [
      { id: 'portfolio-about', title: 'About', icon: 'User' },
      { id: 'portfolio-research', title: 'Research', icon: 'Microscope' },
      { id: 'portfolio-projects', title: 'Projects', icon: 'FolderOpen' },
      { id: 'portfolio-teaching', title: 'Teaching', icon: 'GraduationCap' },
      { id: 'portfolio-publications', title: 'Publications', icon: 'BookOpen' },
      { id: 'portfolio-experience', title: 'Experience', icon: 'Briefcase' },
      { id: 'portfolio-services', title: 'Services', icon: 'Settings' },
      { id: 'portfolio-contact', title: 'Contact', icon: 'Mail' }
    ];
  }
}

// Create singleton instance
const contentManager = new StudentPortalContentManager();

export default contentManager;