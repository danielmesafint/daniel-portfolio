import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  Award,
  BookOpen,
  FileText,
  MessageSquare,
  Download,
  Upload
} from 'lucide-react';

const StudentManagement = ({ instructor, approvedStudents, setApprovedStudents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);

  // Use the real approved students data passed from parent
  const students = approvedStudents || [];
  
  // Debug logging to check data flow
  console.log('StudentManagement - approvedStudents prop:', approvedStudents);
  console.log('StudentManagement - students array:', students);
  console.log('StudentManagement - students length:', students.length);
  console.log('StudentManagement - localStorage approvedStudents:', localStorage.getItem('approvedStudents'));
  
  // Also check if we need to reload from localStorage
  React.useEffect(() => {
    const storedStudents = localStorage.getItem('approvedStudents');
    if (storedStudents && (!approvedStudents || approvedStudents.length === 0)) {
      try {
        const parsedStudents = JSON.parse(storedStudents);
        console.log('StudentManagement - Loading from localStorage:', parsedStudents);
        setApprovedStudents(parsedStudents);
      } catch (error) {
        console.error('Error parsing stored students:', error);
      }
    }
  }, [approvedStudents, setApprovedStudents]);

  const courses = ['CS401', 'CS301', 'CS501'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = filterCourse === 'all' || (student.enrolledCourses && student.enrolledCourses.includes(filterCourse));
    
    return matchesSearch && matchesCourse;
  });

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const sendBulkMessage = () => {
    if (selectedStudents.length === 0) {
      alert('Please select students to message.');
      return;
    }
    alert(`Sending message to ${selectedStudents.length} selected students...`);
  };

  const exportStudentData = () => {
    alert('Exporting student data as CSV...');
  };

  const viewStudentDetails = (student) => {
    alert(`Student Details:\n\nName: ${student.firstName} ${student.lastName}\nID: ${student.studentId}\nEmail: ${student.email}\nGPA: ${student.gpa}\nProgram: ${student.program}\nYear: ${student.year}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-red-400 bg-red-400/10';
      case 'suspended': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Student Management</h1>
              <p className="text-gray-400">Manage your students and track their progress</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={exportStudentData}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddStudent(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          
          <button
            onClick={sendBulkMessage}
            disabled={selectedStudents.length === 0}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message ({selectedStudents.length})</span>
          </button>
        </div>

        {/* Student Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-white">{students.length}</p>
              </div>
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Students</p>
                <p className="text-2xl font-bold text-white">{students.filter(s => s.status === 'active').length}</p>
              </div>
              <Award className="w-6 h-6 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg GPA</p>
                <p className="text-2xl font-bold text-white">
                  {students.length > 0 ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2) : '0.00'}
                </p>
              </div>
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Assignment Rate</p>
                <p className="text-2xl font-bold text-white">
                  {students.length > 0 ? Math.round((students.reduce((sum, s) => sum + (s.submittedAssignments / s.totalAssignments), 0) / students.length) * 100) : 0}%
                </p>
              </div>
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Student</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Contact</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Program</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Courses</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Performance</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {student.firstName[0]}{student.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{student.firstName} {student.lastName}</p>
                        <p className="text-gray-400 text-sm">{student.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">{student.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-medium">{student.program}</p>
                      <p className="text-gray-400 text-sm">Year {student.year}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
                        student.enrolledCourses.map(course => (
                          <span key={course} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                            {course}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No courses enrolled</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">GPA:</span>
                        <span className="text-white font-medium">{student.gpa}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Avg:</span>
                        <span className="text-green-400 font-medium">{student.avgGrade}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Submitted:</span>
                        <span className="text-blue-400 font-medium">{student.submittedAssignments}/{student.totalAssignments}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">Last: {student.lastActive}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => viewStudentDetails(student)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      <button
                        onClick={() => alert(`Sending message to ${student.firstName} ${student.lastName}...`)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                        title="Send Message"
                      >
                        <MessageSquare className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      <button
                        onClick={() => alert(`Editing ${student.firstName} ${student.lastName}...`)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                        title="Edit Student"
                      >
                        <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No students found matching your criteria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentManagement;