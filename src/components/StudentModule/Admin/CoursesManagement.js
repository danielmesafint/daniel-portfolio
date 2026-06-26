import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  FileText, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Settings,
  Download,
  Upload
} from 'lucide-react';

const CoursesManagement = ({ instructor }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'CS401',
      name: 'Machine Learning',
      semester: 'Spring 2024',
      students: 45,
      assignments: 8,
      avgGrade: 85.2,
      status: 'active',
      schedule: 'Mon, Wed, Fri 10:00-11:30 AM',
      room: 'Room 205',
      credits: 3,
      description: 'Introduction to machine learning algorithms and applications'
    },
    {
      id: 2,
      code: 'CS301',
      name: 'Data Structures',
      semester: 'Spring 2024',
      students: 38,
      assignments: 6,
      avgGrade: 78.9,
      status: 'active',
      schedule: 'Tue, Thu 2:00-3:30 PM',
      room: 'Room 301',
      credits: 4,
      description: 'Advanced data structures and algorithms'
    },
    {
      id: 3,
      code: 'CS501',
      name: 'Advanced AI',
      semester: 'Spring 2024',
      students: 25,
      assignments: 4,
      avgGrade: 88.1,
      status: 'active',
      schedule: 'Wed 6:00-9:00 PM',
      room: 'Room 401',
      credits: 3,
      description: 'Advanced artificial intelligence concepts and research'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowAddModal(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowAddModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const CourseModal = () => {
    const [formData, setFormData] = useState(editingCourse || {
      code: '',
      name: '',
      semester: 'Spring 2024',
      schedule: '',
      room: '',
      credits: 3,
      description: '',
      status: 'active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingCourse) {
        setCourses(courses.map(course => 
          course.id === editingCourse.id ? { ...formData, id: editingCourse.id } : course
        ));
      } else {
        setCourses([...courses, { ...formData, id: Date.now(), students: 0, assignments: 0, avgGrade: 0 }]);
      }
      setShowAddModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Course Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Credits</label>
                <input
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="6"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Course Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Spring 2024">Spring 2024</option>
                  <option value="Summer 2024">Summer 2024</option>
                  <option value="Fall 2024">Fall 2024</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Room</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Schedule</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                placeholder="e.g., Mon, Wed, Fri 10:00-11:30 AM"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                {editingCourse ? 'Update Course' : 'Add Course'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Courses Management</h2>
          <p className="text-gray-400">Manage your courses, schedules, and course information</p>
        </div>
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{course.code}</h3>
                <p className="text-gray-400 text-sm">{course.name}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  course.status === 'active' ? 'bg-green-500/10 text-green-400' :
                  course.status === 'inactive' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-gray-500/10 text-gray-400'
                }`}>
                  {course.status}
                </span>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Students</span>
                <span className="text-white font-medium">{course.students}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Assignments</span>
                <span className="text-white font-medium">{course.assignments}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Avg Grade</span>
                <span className="text-green-400 font-medium">{course.avgGrade}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Credits</span>
                <span className="text-white font-medium">{course.credits}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-1">Schedule</p>
              <p className="text-white text-sm">{course.schedule}</p>
              <p className="text-gray-400 text-xs">{course.room}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditCourse(course)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-white text-sm transition-colors duration-200 flex items-center justify-center space-x-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200">
                <Eye className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add/Edit Course Modal */}
      {showAddModal && <CourseModal />}
    </motion.div>
  );
};

export default CoursesManagement;