import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit,
  Save,
  X,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const GradesManagement = ({ instructor }) => {
  const [grades, setGrades] = useState([
    {
      id: 1,
      studentId: 'ST001',
      studentName: 'John Doe',
      course: 'CS401 - Machine Learning',
      courseId: 1,
      assignment: 'Neural Networks Project',
      assignmentId: 1,
      grade: 85,
      maxGrade: 100,
      submissionDate: '2024-01-15',
      gradedDate: '2024-01-18',
      feedback: 'Good implementation, but could improve documentation.',
      status: 'graded'
    },
    {
      id: 2,
      studentId: 'ST002',
      studentName: 'Sarah Smith',
      course: 'CS301 - Data Structures',
      courseId: 2,
      assignment: 'Binary Tree Implementation',
      assignmentId: 2,
      grade: 92,
      maxGrade: 100,
      submissionDate: '2024-01-14',
      gradedDate: '2024-01-17',
      feedback: 'Excellent work! Clean code and thorough testing.',
      status: 'graded'
    },
    {
      id: 3,
      studentId: 'ST003',
      studentName: 'Mike Johnson',
      course: 'CS401 - Machine Learning',
      courseId: 1,
      assignment: 'Neural Networks Project',
      assignmentId: 1,
      grade: null,
      maxGrade: 100,
      submissionDate: '2024-01-16',
      gradedDate: null,
      feedback: '',
      status: 'pending'
    },
    {
      id: 4,
      studentId: 'ST004',
      studentName: 'Emily Davis',
      course: 'CS350 - Database Systems',
      courseId: 3,
      assignment: 'SQL Optimization',
      assignmentId: 3,
      grade: 78,
      maxGrade: 100,
      submissionDate: '2024-01-12',
      gradedDate: '2024-01-16',
      feedback: 'Good understanding of concepts, but some queries could be optimized further.',
      status: 'graded'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingGrade, setEditingGrade] = useState(null);
  const [bulkGrading, setBulkGrading] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState([]);

  const courses = [
    { id: 1, code: 'CS401', name: 'Machine Learning' },
    { id: 2, code: 'CS301', name: 'Data Structures' },
    { id: 3, code: 'CS350', name: 'Database Systems' }
  ];

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || grade.courseId === parseInt(filterCourse);
    const matchesStatus = filterStatus === 'all' || grade.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleGradeEdit = (gradeId) => {
    setEditingGrade(gradeId);
  };

  const handleGradeSave = (gradeId, newGrade, newFeedback) => {
    setGrades(grades.map(grade => 
      grade.id === gradeId 
        ? { 
            ...grade, 
            grade: newGrade, 
            feedback: newFeedback, 
            status: 'graded',
            gradedDate: new Date().toISOString().split('T')[0]
          }
        : grade
    ));
    setEditingGrade(null);
  };

  const handleBulkGrading = () => {
    setBulkGrading(!bulkGrading);
    setSelectedGrades([]);
  };

  const handleGradeSelection = (gradeId) => {
    setSelectedGrades(prev => 
      prev.includes(gradeId) 
        ? prev.filter(id => id !== gradeId)
        : [...prev, gradeId]
    );
  };

  const getGradeColor = (grade, maxGrade) => {
    if (!grade) return 'text-gray-400';
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return 'bg-green-500/10 text-green-400';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400';
      case 'late': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const calculateStats = () => {
    const totalGrades = grades.length;
    const gradedCount = grades.filter(g => g.status === 'graded').length;
    const pendingCount = grades.filter(g => g.status === 'pending').length;
    const avgGrade = grades.filter(g => g.grade !== null).reduce((sum, g) => sum + g.grade, 0) / grades.filter(g => g.grade !== null).length || 0;
    
    return { totalGrades, gradedCount, pendingCount, avgGrade };
  };

  const stats = calculateStats();

  const GradeEditRow = ({ grade }) => {
    const [tempGrade, setTempGrade] = useState(grade.grade || '');
    const [tempFeedback, setTempFeedback] = useState(grade.feedback || '');

    return (
      <tr className="bg-blue-500/5 border border-blue-500/20">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedGrades.includes(grade.id)}
              onChange={() => handleGradeSelection(grade.id)}
              className="mr-3"
            />
            <div>
              <div className="text-sm font-medium text-white">{grade.studentName}</div>
              <div className="text-sm text-gray-400">{grade.studentId}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-white">{grade.course}</div>
          <div className="text-sm text-gray-400">{grade.assignment}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="number"
            value={tempGrade}
            onChange={(e) => setTempGrade(e.target.value)}
            min="0"
            max={grade.maxGrade}
            className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400 ml-1">/{grade.maxGrade}</span>
        </td>
        <td className="px-6 py-4">
          <textarea
            value={tempFeedback}
            onChange={(e) => setTempFeedback(e.target.value)}
            rows="2"
            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter feedback..."
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => handleGradeSave(grade.id, parseFloat(tempGrade), tempFeedback)}
            className="text-green-400 hover:text-green-300 mr-3"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditingGrade(null)}
            className="text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </td>
      </tr>
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
          <h2 className="text-2xl font-bold text-white">Grades Management</h2>
          <p className="text-gray-400">Grade assignments and provide feedback to students</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBulkGrading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              bulkGrading 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            Bulk Grading
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Grades</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Submissions</p>
              <p className="text-2xl font-bold text-white">{stats.totalGrades}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Graded</p>
              <p className="text-2xl font-bold text-white">{stats.gradedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">{stats.pendingCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Grade</p>
              <p className="text-2xl font-bold text-white">{stats.avgGrade.toFixed(1)}%</p>
            </div>
            <Award className="w-8 h-8 text-purple-400" />
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
                placeholder="Search students or assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="graded">Graded</option>
                <option value="pending">Pending</option>
                <option value="late">Late</option>
              </select>
            </div>
          </div>
          {bulkGrading && selectedGrades.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{selectedGrades.length} selected</span>
              <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors duration-200">
                Grade Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {bulkGrading && (
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGrades(filteredGrades.map(g => g.id));
                        } else {
                          setSelectedGrades([]);
                        }
                      }}
                      className="mr-3"
                    />
                  )}
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Course & Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredGrades.map((grade) => (
                editingGrade === grade.id ? (
                  <GradeEditRow key={grade.id} grade={grade} />
                ) : (
                  <tr key={grade.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {bulkGrading && (
                          <input
                            type="checkbox"
                            checked={selectedGrades.includes(grade.id)}
                            onChange={() => handleGradeSelection(grade.id)}
                            className="mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">{grade.studentName}</div>
                          <div className="text-sm text-gray-400">{grade.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{grade.course}</div>
                      <div className="text-sm text-gray-400">{grade.assignment}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-lg font-bold ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                        {grade.grade !== null ? `${grade.grade}/${grade.maxGrade}` : 'Not Graded'}
                      </div>
                      {grade.grade !== null && (
                        <div className="text-sm text-gray-400">
                          {((grade.grade / grade.maxGrade) * 100).toFixed(1)}%
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-xs truncate">
                        {grade.feedback || 'No feedback provided'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(grade.status)}`}>
                        {grade.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleGradeEdit(grade.id)}
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredGrades.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No grades found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </motion.div>
  );
};

export default GradesManagement;