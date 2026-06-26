import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Settings as SettingsIcon,
  Award,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import PendingRegistrations from './PendingRegistrations';
import StudentManagement from './StudentManagement';
import CoursesManagement from './CoursesManagement';
import AssignmentsManagement from './AssignmentsManagement';
import GradesManagement from './GradesManagement';
import OfficeHoursManagement from './OfficeHoursManagement';
import ForumManagement from './ForumManagement';
import Analytics from './Analytics';
import Settings from './Settings';

const InstructorDashboard = ({ user, onLogout, pendingRegistrations, setPendingRegistrations, approvedStudents, setApprovedStudents }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock instructor data
  const instructorData = {
    profile: {
      name: 'Dr. Daniel Mesafint',
      title: 'Assistant Professor',
      department: 'Computer Science',
      email: 'daniel.mesafint@university.edu',
      officeHours: 'Mon, Wed, Fri 2:00-4:00 PM',
      office: 'Room 301'
    },
    stats: {
      totalStudents: 156,
      activeCourses: 4,
      pendingAssignments: 23,
      officeHourBookings: 8,
      forumQuestions: 12,
      avgGrade: 82.5
    },
    courses: [
      {
        id: 1,
        code: 'CS401',
        name: 'Machine Learning',
        semester: 'Spring 2024',
        students: 45,
        assignments: 8,
        avgGrade: 85.2,
        status: 'active'
      },
      {
        id: 2,
        code: 'CS301',
        name: 'Data Structures',
        semester: 'Spring 2024',
        students: 38,
        assignments: 6,
        avgGrade: 78.9,
        status: 'active'
      },
      {
        id: 3,
        code: 'CS501',
        name: 'Advanced AI',
        semester: 'Spring 2024',
        students: 25,
        assignments: 4,
        avgGrade: 88.1,
        status: 'active'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'submission',
        message: 'John Doe submitted Neural Networks Project',
        course: 'CS401',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'question',
        message: 'New forum question in Data Structures',
        course: 'CS301',
        time: '4 hours ago'
      },
      {
        id: 3,
        type: 'booking',
        message: 'Sarah Smith booked office hours',
        time: '1 day ago'
      }
    ],
    pendingTasks: [
      {
        id: 1,
        task: 'Grade Neural Networks Projects',
        course: 'CS401',
        count: 12,
        priority: 'high',
        dueDate: '2024-01-20'
      },
      {
        id: 2,
        task: 'Review Forum Questions',
        course: 'CS301',
        count: 5,
        priority: 'medium',
        dueDate: '2024-01-18'
      },
      {
        id: 3,
        task: 'Prepare Lecture Materials',
        course: 'CS501',
        count: 1,
        priority: 'low',
        dueDate: '2024-01-22'
      }
    ]
  };

  const tabItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'registrations', name: 'Registrations', icon: Clock },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'grades', name: 'Grades', icon: Award },
    { id: 'office-hours', name: 'Office Hours', icon: Calendar },
    { id: 'forum', name: 'Forum', icon: MessageSquare },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: SettingsIcon }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Instructor Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome, {instructorData.profile.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                ← Back to Portfolio
              </a>
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-t border-gray-700">
            <nav className="flex flex-wrap gap-2 py-3">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon size={14} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Students</p>
                    <p className="text-2xl font-bold text-white">{instructorData.stats.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Courses</p>
                    <p className="text-2xl font-bold text-white">{instructorData.stats.activeCourses}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Grading</p>
                    <p className="text-2xl font-bold text-white">{instructorData.stats.pendingAssignments}</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Office Hours</p>
                    <p className="text-2xl font-bold text-white">{instructorData.stats.officeHourBookings}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Forum Questions</p>
                    <p className="text-2xl font-bold text-white">{instructorData.stats.forumQuestions}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Grade</p>
                    <p className="text-2xl font-bold text-white">{instructorData.stats.avgGrade}%</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses Overview */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">My Courses</h3>
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Course</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {instructorData.courses.map((course) => (
                      <div key={course.id} className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold">{course.code} - {course.name}</h4>
                            <p className="text-gray-400 text-sm">{course.semester}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200">
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Students</p>
                            <p className="text-white font-medium">{course.students}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Assignments</p>
                            <p className="text-white font-medium">{course.assignments}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Avg Grade</p>
                            <p className="text-green-400 font-medium">{course.avgGrade}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Pending Tasks */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    Pending Tasks
                  </h3>
                  <div className="space-y-3">
                    {instructorData.pendingTasks.map((task) => (
                      <div key={task.id} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white text-sm font-medium">{task.task}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{task.course} • {task.count} items</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {instructorData.recentActivity.map((activity) => (
                      <div key={activity.id} className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-white text-sm">{activity.message}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                          {activity.course && <span>{activity.course}</span>}
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <PendingRegistrations 
            instructor={user} 
            pendingRegistrations={pendingRegistrations}
            setPendingRegistrations={setPendingRegistrations}
            approvedStudents={approvedStudents}
            setApprovedStudents={setApprovedStudents}
          />
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <StudentManagement instructor={user} approvedStudents={approvedStudents} setApprovedStudents={setApprovedStudents} />
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <CoursesManagement instructor={user} />
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <AssignmentsManagement instructor={user} />
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <GradesManagement instructor={user} />
        )}

        {/* Office Hours Tab */}
        {activeTab === 'office-hours' && (
          <OfficeHoursManagement instructor={user} />
        )}

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <ForumManagement instructor={user} />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Analytics instructor={user} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Settings instructor={user} />
        )}

        {/* Other tab content - placeholder for future development */}
        {!['overview', 'registrations', 'students', 'courses', 'assignments', 'grades', 'office-hours', 'forum', 'analytics', 'settings'].includes(activeTab) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center"
          >
            <div className="mb-4">
              {tabItems.find(tab => tab.id === activeTab)?.icon && 
                React.createElement(tabItems.find(tab => tab.id === activeTab).icon, { 
                  className: "w-16 h-16 text-gray-400 mx-auto mb-4" 
                })
              }
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {tabItems.find(tab => tab.id === activeTab)?.name} Management
            </h2>
            <p className="text-gray-400 mb-6">
              This section is under development. Full functionality coming soon!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200">
              Coming Soon
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;