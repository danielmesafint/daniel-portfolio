import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, FileText, BarChart3, Users, Calendar, MessageSquare, Bot, Award, Microscope } from 'lucide-react';
import contentManager from '../../utils/StudentPortalContentManager';
import StudentPortalNavigationManager from '../../utils/StudentPortalNavigationManager';
import Navbar from '../Navbar';
import SideNavbar from '../SideNavbar';

// Import Student Module components
import StudentLogin from './Authentication/StudentLogin';
import StudentRegister from './Authentication/StudentRegister';
import InstructorRegister from './Authentication/InstructorRegister';
import RegistrationSuccess from './Authentication/RegistrationSuccess';
import InstructorLogin from './Authentication/InstructorLogin';
import InstructorDashboard from './Admin/InstructorDashboard';

const StudentModule = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginType, setLoginType] = useState('student'); // 'student' or 'instructor'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'success'
  const [registrationData, setRegistrationData] = useState(null);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);

  // State for content management
  const [currentContent, setCurrentContent] = useState(null);
  const [navigationManager, setNavigationManager] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(['Dashboard']);

  // Check authentication status and load pending registrations on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('portalToken');
      const userData = localStorage.getItem('portalUser');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setCurrentUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('portalToken');
          localStorage.removeItem('portalUser');
        }
      }
      
      // Load pending registrations from localStorage
      const storedRegistrations = localStorage.getItem('pendingRegistrations');
      if (storedRegistrations) {
        try {
          const registrations = JSON.parse(storedRegistrations);
          setPendingRegistrations(registrations);
        } catch (error) {
          console.error('Error parsing pending registrations:', error);
        }
      }
      
      // Load approved students from localStorage
      const storedStudents = localStorage.getItem('approvedStudents');
      if (storedStudents) {
        try {
          const students = JSON.parse(storedStudents);
          setApprovedStudents(students);
        } catch (error) {
          console.error('Error parsing approved students:', error);
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('portalToken', token);
    localStorage.setItem('portalUser', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('portalToken');
    localStorage.removeItem('portalUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const handleRegister = (registrationData) => {
    // Create a new registration entry with unique ID
    const newRegistration = {
      id: Date.now(), // Simple ID generation
      ...registrationData,
      registrationDate: new Date().toISOString(),
      status: 'pending',
      approvalStatus: 'waiting_for_instructor'
    };
    
    // Update pending registrations state and localStorage
    const updatedRegistrations = [...pendingRegistrations, newRegistration];
    setPendingRegistrations(updatedRegistrations);
    localStorage.setItem('pendingRegistrations', JSON.stringify(updatedRegistrations));
    
    // Store registration data and show success page
    setRegistrationData(registrationData);
    setAuthMode('success');
    
    // Simulate sending email notification to instructor
    console.log('Email notification sent to instructor:', {
      to: 'daniel@university.edu',
      subject: 'New Student Registration Pending Approval',
      student: `${registrationData.firstName} ${registrationData.lastName}`,
      email: registrationData.email,
      program: registrationData.program
    });
    
    // Simulate sending confirmation email to student
    console.log('Confirmation email sent to student:', {
      to: registrationData.email,
      subject: 'Registration Submitted - Awaiting Approval',
      message: 'Your registration has been submitted and is pending instructor approval.'
    });
  };

  const handleBackToLogin = () => {
    setAuthMode('login');
    setRegistrationData(null);
  };

  // Initialize navigation manager when user is authenticated as student
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === 'student') {
      const navManager = new StudentPortalNavigationManager(contentManager, setCurrentContent);
      navManager.initialize();
      setNavigationManager(navManager);

      // Load initial content
      const initialContent = contentManager.getCurrentContent();
      setCurrentContent(initialContent);
      setBreadcrumbs(contentManager.getBreadcrumbs());

      return () => {
        navManager.destroy();
      };
    }
  }, [isAuthenticated, currentUser]);

  // Handle navigation clicks
  const handleNavigation = (contentId, event) => {
    if (navigationManager) {
      navigationManager.handleMenuClick(contentId, event);
      setBreadcrumbs(contentManager.getBreadcrumbs());
    }
  };

  // Get icon component by name
  const getIconComponent = (iconName, size = 14) => {
    const icons = {
      BarChart3: BarChart3,
      BookOpen: BookOpen,
      FileText: FileText,
      Award: Award,
      Users: Users,
      Calendar: Calendar,
      Microscope: Microscope,
      MessageSquare: MessageSquare,
      Bot: Bot
    };
    const IconComponent = icons[iconName] || BarChart3;
    return <IconComponent size={size} />;
  };





  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading Student Portal...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show appropriate login page with main navigation
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Include main website navigation */}
        <Navbar 
          darkMode={true} 
          toggleDarkMode={() => {}} 
          currentTheme="default"
          changeTheme={() => {}}
          themes={{}}
          onLanguageDropdownChange={() => {}}
        />
        <SideNavbar 
          darkMode={true}
          toggleDarkMode={() => {}}
          activeSection="student-portal"
          onNavigate={() => {}}
        />

        {/* Main content with proper spacing for navigation */}
        <div className="lg:ml-64 pt-16">
          {/* Show appropriate authentication form */}
          {authMode === 'success' ? (
            <RegistrationSuccess 
              registrationData={registrationData}
              onBackToLogin={handleBackToLogin}
            />
          ) : authMode === 'register' ? (
            loginType === 'student' ? (
              <StudentRegister 
                onRegister={handleRegister}
                switchToLogin={() => setAuthMode('login')}
              />
            ) : (
              <InstructorRegister 
                onRegister={handleRegister}
                switchToLogin={() => setAuthMode('login')}
              />
            )
          ) : loginType === 'student' ? (
            <StudentLogin 
              onLogin={handleLogin} 
              switchToInstructor={() => setLoginType('instructor')}
              switchToRegister={() => setAuthMode('register')}
            />
          ) : (
            <InstructorLogin 
              onLogin={handleLogin} 
              switchToStudent={() => setLoginType('student')}
              switchToRegister={() => setAuthMode('register')}
            />
          )}
        </div>
      </div>
    );
  }

  // If user is an instructor, show instructor dashboard with main navigation
  if (currentUser?.role === 'instructor') {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Include main website navigation */}
        <Navbar 
          darkMode={true} 
          toggleDarkMode={() => {}} 
          currentTheme="default"
          changeTheme={() => {}}
          themes={{}}
          onLanguageDropdownChange={() => {}}
        />
        <SideNavbar 
          darkMode={true}
          toggleDarkMode={() => {}}
          activeSection="student-portal"
          onNavigate={() => {}}
        />

        {/* Instructor Dashboard with proper spacing for navigation */}
        <div className="lg:ml-64 pt-16">
          <InstructorDashboard 
            user={currentUser} 
            onLogout={handleLogout} 
            pendingRegistrations={pendingRegistrations} 
            setPendingRegistrations={setPendingRegistrations} 
            approvedStudents={approvedStudents} 
            setApprovedStudents={setApprovedStudents} 
          />
        </div>
      </div>
    );
  }



  // Main Student Module Interface with integrated navigation
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Include main website navigation */}
      <Navbar 
        darkMode={true} 
        toggleDarkMode={() => {}} 
        currentTheme="default"
        changeTheme={() => {}}
        themes={{}}
        onLanguageDropdownChange={() => {}}
      />
      <SideNavbar 
        darkMode={true}
        toggleDarkMode={() => {}}
        activeSection="student-portal"
        onNavigate={() => {}}
      />

      {/* Student Module Content with proper spacing for navigation */}
      <div className="lg:ml-64 pt-16">
        {/* Student Module Header */}
        <header className="bg-gray-800 border-b border-gray-700 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-xl font-bold text-white">Student Portal</h1>
                  <p className="text-sm text-gray-400">Welcome, {currentUser?.firstName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 1 && (
              <div className="px-4 py-2 bg-gray-700/30">
                <nav className="flex items-center space-x-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="text-gray-500">/</span>}
                      <span className={index === breadcrumbs.length - 1 ? 'text-blue-400 font-medium' : 'text-gray-300'}>
                        {crumb}
                      </span>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            )}
            
            {/* Student Portal Navigation Menu */}
            <div className="border-t border-gray-700">
              <nav className="flex flex-wrap gap-2 py-3">
                {contentManager.getStudentFeatures().map((feature) => (
                  <button
                    key={feature.id}
                    onClick={(e) => handleNavigation(feature.id, e)}
                    className={`flex items-center space-x-1 px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                      currentContent?.contentId === feature.id
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50'
                    }`}
                  >
                    {getIconComponent(feature.icon)}
                    <span>{feature.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Student Module Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentContent ? (
            <div className="space-y-6">
              {/* Content Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-white">{currentContent.title}</h2>
                  {currentContent.isEmbedded && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                      Instructor Portfolio
                    </span>
                  )}
                </div>
                
                {navigationManager?.canNavigateBack() && (
                  <button
                    onClick={() => {
                      navigationManager.navigateBack();
                      setBreadcrumbs(contentManager.getBreadcrumbs());
                    }}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-200"
                  >
                    <span>← Back</span>
                  </button>
                )}
              </div>

              {/* Dynamic Content Area */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                {React.createElement(currentContent.component, {
                  user: currentUser,
                  embedded: currentContent.isEmbedded,
                  onNavigate: handleNavigation
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300">Loading content...</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Access Navigation */}
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-blue-600 rounded-full p-4 shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
            onClick={(e) => handleNavigation('ai-assistant', e)}
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentModule;