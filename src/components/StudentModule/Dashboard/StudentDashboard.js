import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  BarChart3, 
  Users, 
  Calendar, 
  MessageSquare, 
  Bot,
  Clock,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';

const StudentDashboard = ({ user }) => {
  // Mock data - replace with actual API calls
  const dashboardData = {
    courses: [
      { id: 1, name: 'Machine Learning', code: 'CS401', progress: 75, nextAssignment: 'Neural Networks Project' },
      { id: 2, name: 'Data Structures', code: 'CS301', progress: 90, nextAssignment: 'Binary Tree Implementation' },
      { id: 3, name: 'Database Systems', code: 'CS350', progress: 60, nextAssignment: 'SQL Optimization' }
    ],
    recentGrades: [
      { course: 'Machine Learning', assignment: 'Midterm Exam', grade: 85, maxGrade: 100 },
      { course: 'Data Structures', assignment: 'Homework 5', grade: 95, maxGrade: 100 },
      { course: 'Database Systems', assignment: 'Project 2', grade: 78, maxGrade: 100 }
    ],
    upcomingDeadlines: [
      { course: 'Machine Learning', assignment: 'Neural Networks Project', dueDate: '2024-01-15', daysLeft: 3 },
      { course: 'Database Systems', assignment: 'Final Project', dueDate: '2024-01-20', daysLeft: 8 }
    ],
    notifications: [
      { id: 1, type: 'grade', message: 'New grade posted for Machine Learning Midterm', time: '2 hours ago' },
      { id: 2, type: 'assignment', message: 'Reminder: Neural Networks Project due in 3 days', time: '1 day ago' }
    ]
  };

  const quickActions = [
    { name: 'My Courses', icon: BookOpen, path: '/student/courses', color: 'bg-blue-600' },
    { name: 'Assignments', icon: FileText, path: '/student/assignments', color: 'bg-green-600' },
    { name: 'Grades', icon: BarChart3, path: '/student/grades', color: 'bg-purple-600' },
    { name: 'Supervision', icon: Users, path: '/student/supervision', color: 'bg-orange-600' },
    { name: 'Office Hours', icon: Calendar, path: '/student/office-hours', color: 'bg-red-600' },
    { name: 'Forum', icon: MessageSquare, path: '/student/forum', color: 'bg-indigo-600' },
    { name: 'AI Assistant', icon: Bot, path: '/student/ai-assistant', color: 'bg-cyan-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
        <p className="text-blue-100 mb-4">
          {user?.program} • Year {user?.year} • Student ID: {user?.studentId}
        </p>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>{dashboardData.courses.length} Active Courses</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{dashboardData.upcomingDeadlines.length} Upcoming Deadlines</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>{dashboardData.notifications.length} New Notifications</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.name}
              to={action.path}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-center transition-all duration-200 border border-gray-700 hover:border-gray-600"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-300 text-sm font-medium">{action.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h3 className="text-xl font-bold text-white mb-6">Course Progress</h3>
          <div className="space-y-4">
            {dashboardData.courses.map((course) => (
              <div key={course.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{course.name}</h4>
                    <p className="text-gray-400 text-sm">{course.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{course.progress}%</p>
                    <p className="text-gray-400 text-sm">Complete</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Next: {course.nextAssignment}</span>
                  <Link 
                    to={`/student/courses/${course.id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Recent Grades */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Recent Grades
            </h4>
            <div className="space-y-3">
              {dashboardData.recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{grade.assignment}</p>
                    <p className="text-gray-400 text-xs">{grade.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">{grade.grade}/{grade.maxGrade}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/student/grades"
              className="block mt-4 text-center text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
            >
              View All Grades →
            </Link>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-red-400" />
              Upcoming Deadlines
            </h4>
            <div className="space-y-3">
              {dashboardData.upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="border-l-4 border-red-400 pl-4">
                  <p className="text-white text-sm font-medium">{deadline.assignment}</p>
                  <p className="text-gray-400 text-xs">{deadline.course}</p>
                  <p className="text-red-400 text-xs font-medium">{deadline.daysLeft} days left</p>
                </div>
              ))}
            </div>
            <Link 
              to="/student/assignments"
              className="block mt-4 text-center text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
            >
              View All Assignments →
            </Link>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-400" />
              Notifications
            </h4>
            <div className="space-y-3">
              {dashboardData.notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-white text-sm">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;