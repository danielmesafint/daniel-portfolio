import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Award, Download, Filter, Calendar, Eye, FileText } from 'lucide-react';

const GradesViewer = ({ user }) => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('list');

  // Mock grades data
  const gradesData = {
    overall: { gpa: 3.75, credits: 87, rank: 15 },
    current: { gpa: 3.85, credits: 18 },
    grades: [
      {
        id: 1,
        course: 'Machine Learning',
        courseCode: 'CS401',
        assignment: 'Midterm Exam',
        grade: 85,
        maxGrade: 100,
        percentage: 85,
        letterGrade: 'B+',
        date: '2024-01-10',
        feedback: 'Good understanding of concepts, improve on mathematical derivations.',
        weight: 30
      },
      {
        id: 2,
        course: 'Data Structures',
        courseCode: 'CS301',
        assignment: 'Homework 5',
        grade: 95,
        maxGrade: 100,
        percentage: 95,
        letterGrade: 'A',
        date: '2024-01-08',
        feedback: 'Excellent implementation and clean code structure.',
        weight: 15
      },
      {
        id: 3,
        course: 'Database Systems',
        courseCode: 'CS350',
        assignment: 'Project 2',
        grade: 78,
        maxGrade: 100,
        percentage: 78,
        letterGrade: 'B-',
        date: '2024-01-05',
        feedback: 'Good database design, but normalization could be improved.',
        weight: 25
      },
      {
        id: 4,
        course: 'Machine Learning',
        courseCode: 'CS401',
        assignment: 'Assignment 3',
        grade: 92,
        maxGrade: 100,
        percentage: 92,
        letterGrade: 'A-',
        date: '2024-01-03',
        feedback: 'Excellent neural network implementation.',
        weight: 20
      },
      {
        id: 5,
        course: 'Algorithms',
        courseCode: 'CS402',
        assignment: 'Final Project',
        grade: 88,
        maxGrade: 100,
        percentage: 88,
        letterGrade: 'B+',
        date: '2023-12-15',
        feedback: 'Good algorithm analysis and implementation.',
        weight: 40
      }
    ]
  };

  const courses = [...new Set(gradesData.grades.map(grade => grade.course))];
  
  const filteredGrades = gradesData.grades.filter(grade => {
    if (selectedCourse === 'all') return true;
    return grade.course === selectedCourse;
  });

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const exportGrades = (format) => {
    if (format === 'pdf') {
      alert('Exporting grades as PDF...');
    } else if (format === 'csv') {
      alert('Exporting grades as CSV...');
    }
  };

  const viewGradeDetails = (grade) => {
    alert(`Grade Details:\n\nCourse: ${grade.course}\nAssignment: ${grade.assignment}\nGrade: ${grade.grade}/${grade.maxGrade} (${grade.percentage}%)\nLetter Grade: ${grade.letterGrade}\nFeedback: ${grade.feedback}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with Controls */}
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Grades Viewer</h1>
              <p className="text-gray-400">Track your academic performance</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="current">Current Semester</option>
              <option value="fall2023">Fall 2023</option>
              <option value="spring2023">Spring 2023</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => exportGrades('pdf')}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={() => exportGrades('csv')}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* GPA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Overall GPA</p>
                <p className="text-3xl font-bold">{gradesData.overall.gpa}</p>
              </div>
              <Award className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Semester GPA</p>
                <p className="text-3xl font-bold">{gradesData.current.gpa}</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Credits Earned</p>
                <p className="text-3xl font-bold">{gradesData.overall.credits}</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Class Rank</p>
                <p className="text-3xl font-bold">#{gradesData.overall.rank}</p>
              </div>
              <Award className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
        
        {/* Detailed Grades Table */}
        <div className="bg-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Grade Details</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                  viewMode === 'chart' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Chart
              </button>
            </div>
          </div>
          
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Course</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Assignment</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Grade</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Percentage</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Letter</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.map((grade) => (
                    <motion.tr
                      key={grade.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-gray-700/50 hover:bg-gray-600/30 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-medium">{grade.course}</p>
                          <p className="text-gray-400 text-sm">{grade.courseCode}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{grade.assignment}</td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold ${getGradeColor(grade.percentage)}`}>
                          {grade.grade}/{grade.maxGrade}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold ${getGradeColor(grade.percentage)}`}>
                          {grade.percentage}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.percentage)} bg-current bg-opacity-10`}>
                          {grade.letterGrade}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{grade.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewGradeDetails(grade)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                          <button
                            onClick={() => alert(`Downloading feedback for ${grade.assignment}...`)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                            title="Download Feedback"
                          >
                            <FileText className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-600/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Grade Chart View</p>
                <p className="text-gray-500 text-sm">Interactive charts coming soon!</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Grade Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4">Course Performance</h4>
            <div className="space-y-3">
              {courses.map(course => {
                const courseGrades = gradesData.grades.filter(g => g.course === course);
                const avgGrade = courseGrades.reduce((sum, g) => sum + g.percentage, 0) / courseGrades.length;
                return (
                  <div key={course} className="flex items-center justify-between">
                    <span className="text-gray-300">{course}</span>
                    <span className={`font-semibold ${getGradeColor(avgGrade)}`}>
                      {avgGrade.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4">Grade Distribution</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">A (90-100%)</span>
                <span className="text-green-400 font-semibold">
                  {filteredGrades.filter(g => g.percentage >= 90).length} assignments
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">B (80-89%)</span>
                <span className="text-blue-400 font-semibold">
                  {filteredGrades.filter(g => g.percentage >= 80 && g.percentage < 90).length} assignments
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">C (70-79%)</span>
                <span className="text-yellow-400 font-semibold">
                  {filteredGrades.filter(g => g.percentage >= 70 && g.percentage < 80).length} assignments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GradesViewer;