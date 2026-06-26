import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Clock,
  Award,
  Play,
  Download,
  MessageSquare,
  BarChart3,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

const CourseHub = ({ user }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemester, setFilterSemester] = useState('all');

  // Mock course data
  const courses = [
    {
      id: 1,
      code: 'CS401',
      name: 'Machine Learning',
      instructor: 'Dr. Daniel Mesafint',
      semester: 'Spring 2024',
      credits: 3,
      progress: 75,
      grade: 85.2,
      nextClass: '2024-01-22T10:00:00Z',
      assignments: 8,
      completedAssignments: 6,
      announcements: 3,
      materials: 15,
      students: 45,
      description: 'Introduction to machine learning algorithms and applications',
      schedule: 'Mon, Wed, Fri 10:00-11:30 AM',
      room: 'Room 205',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      code: 'CS301',
      name: 'Data Structures',
      instructor: 'Dr. Sarah Smith',
      semester: 'Spring 2024',
      credits: 4,
      progress: 90,
      grade: 92.1,
      nextClass: '2024-01-23T14:00:00Z',
      assignments: 6,
      completedAssignments: 6,
      announcements: 1,
      materials: 12,
      students: 38,
      description: 'Advanced data structures and algorithms',
      schedule: 'Tue, Thu 2:00-3:30 PM',
      room: 'Room 301',
      color: 'bg-green-600'
    },
    {
      id: 3,
      code: 'CS350',
      name: 'Database Systems',
      instructor: 'Dr. Mike Johnson',
      semester: 'Spring 2024',
      credits: 3,
      progress: 60,
      grade: 78.5,
      nextClass: '2024-01-24T16:00:00Z',
      assignments: 5,
      completedAssignments: 3,
      announcements: 2,
      materials: 10,
      students: 30,
      description: 'Database design and management systems',
      schedule: 'Wed 4:00-6:30 PM',
      room: 'Room 401',
      color: 'bg-purple-600'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = filterSemester === 'all' || course.semester === filterSemester;
    return matchesSearch && matchesSemester;
  });

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-400';
    if (grade >= 80) return 'text-blue-400';
    if (grade >= 70) return 'text-yellow-400';
    if (grade >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const formatNextClass = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Starting soon';
    if (diffInHours < 24) return `In ${diffInHours} hours`;
    return date.toLocaleDateString();
  };

  const CourseCard = ({ course }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{course.name}</h3>
            <p className="text-gray-400 text-sm">{course.code} • {course.instructor}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${getGradeColor(course.grade)}`}>{course.grade}%</p>
          <p className="text-gray-400 text-xs">Current Grade</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Progress</span>
          <span className="text-white text-sm">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="text-center">
          <p className="text-gray-400">Assignments</p>
          <p className="text-white font-medium">{course.completedAssignments}/{course.assignments}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Materials</p>
          <p className="text-white font-medium">{course.materials}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Credits</p>
          <p className="text-white font-medium">{course.credits}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Next: {formatNextClass(course.nextClass)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3" />
          <span>{course.students} students</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Link
          to={`/student/courses/${course.id}`}
          className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-white text-sm text-center transition-colors duration-200"
        >
          Enter Course
        </Link>
        <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200">
          <MessageSquare className="w-4 h-4" />
        </button>
        <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200">
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  const CourseListItem = ({ course }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{course.name}</h3>
            <p className="text-gray-400 text-sm">{course.code} • {course.instructor}</p>
            <p className="text-gray-500 text-xs">{course.schedule} • {course.room}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <p className="text-gray-400 text-xs">Progress</p>
            <p className="text-white font-medium">{course.progress}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs">Grade</p>
            <p className={`font-bold ${getGradeColor(course.grade)}`}>{course.grade}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs">Assignments</p>
            <p className="text-white font-medium">{course.completedAssignments}/{course.assignments}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to={`/student/courses/${course.id}`}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-sm transition-colors duration-200"
            >
              Enter Course
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Course Hub</h1>
          <p className="text-gray-400">Manage your enrolled courses and track progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Semesters</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Fall 2023">Fall 2023</option>
                <option value="Summer 2023">Summer 2023</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">{filteredCourses.length} courses</span>
          </div>
        </div>
      </div>

      {/* Course Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Enrolled Courses</p>
              <p className="text-2xl font-bold text-white">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Credits</p>
              <p className="text-2xl font-bold text-white">{courses.reduce((sum, c) => sum + c.credits, 0)}</p>
            </div>
            <Award className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Grade</p>
              <p className="text-2xl font-bold text-white">
                {(courses.reduce((sum, c) => sum + c.grade, 0) / courses.length).toFixed(1)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Assignments Due</p>
              <p className="text-2xl font-bold text-white">
                {courses.reduce((sum, c) => sum + (c.assignments - c.completedAssignments), 0)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Courses Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </motion.div>
  );
};

export default CourseHub;