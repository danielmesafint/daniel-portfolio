import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  BookOpen, 
  FileText, 
  Award,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Analytics = ({ instructor }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalStudents: 156,
      totalCourses: 4,
      totalAssignments: 23,
      avgGrade: 82.5,
      studentGrowth: 12.5,
      assignmentCompletion: 89.3,
      forumActivity: 145,
      officeHourBookings: 34
    },
    coursePerformance: [
      { course: 'CS401 - Machine Learning', students: 45, avgGrade: 85.2, completion: 92, engagement: 88 },
      { course: 'CS301 - Data Structures', students: 38, avgGrade: 78.9, completion: 87, engagement: 82 },
      { course: 'CS501 - Advanced AI', students: 25, avgGrade: 88.1, completion: 94, engagement: 91 },
      { course: 'CS350 - Database Systems', students: 48, avgGrade: 76.3, completion: 85, engagement: 79 }
    ],
    gradeDistribution: [
      { range: 'A (90-100)', count: 45, percentage: 28.8 },
      { range: 'B (80-89)', count: 62, percentage: 39.7 },
      { range: 'C (70-79)', count: 35, percentage: 22.4 },
      { range: 'D (60-69)', count: 12, percentage: 7.7 },
      { range: 'F (0-59)', count: 2, percentage: 1.3 }
    ],
    weeklyActivity: [
      { week: 'Week 1', submissions: 45, forumPosts: 23, officeHours: 8 },
      { week: 'Week 2', submissions: 52, forumPosts: 31, officeHours: 12 },
      { week: 'Week 3', submissions: 48, forumPosts: 28, officeHours: 10 },
      { week: 'Week 4', submissions: 61, forumPosts: 35, officeHours: 15 }
    ],
    topPerformers: [
      { name: 'Sarah Smith', id: 'ST002', course: 'CS401', grade: 96.5, assignments: 8 },
      { name: 'Mike Johnson', id: 'ST003', course: 'CS501', grade: 94.2, assignments: 6 },
      { name: 'Emily Davis', id: 'ST004', course: 'CS301', grade: 92.8, assignments: 7 },
      { name: 'John Doe', id: 'ST001', course: 'CS401', grade: 91.3, assignments: 8 }
    ],
    strugglingStudents: [
      { name: 'Alex Wilson', id: 'ST005', course: 'CS301', grade: 58.2, assignments: 4, missing: 3 },
      { name: 'Lisa Brown', id: 'ST006', course: 'CS350', grade: 62.1, assignments: 5, missing: 2 },
      { name: 'Tom Garcia', id: 'ST007', course: 'CS401', grade: 65.4, assignments: 6, missing: 2 }
    ]
  };

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 1, name: 'CS401 - Machine Learning' },
    { id: 2, name: 'CS301 - Data Structures' },
    { id: 3, name: 'CS501 - Advanced AI' },
    { id: 4, name: 'CS350 - Database Systems' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <div className={`flex items-center space-x-1 text-sm ${
              change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
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
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400">Track student performance and course analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={analyticsData.overview.totalStudents}
          change={analyticsData.overview.studentGrowth}
          icon={Users}
          color="text-blue-400"
        />
        <StatCard
          title="Active Courses"
          value={analyticsData.overview.totalCourses}
          icon={BookOpen}
          color="text-green-400"
        />
        <StatCard
          title="Total Assignments"
          value={analyticsData.overview.totalAssignments}
          icon={FileText}
          color="text-purple-400"
        />
        <StatCard
          title="Average Grade"
          value={`${analyticsData.overview.avgGrade}%`}
          icon={Award}
          color="text-yellow-400"
        />
      </div>

      {/* Course Performance */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6">Course Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 text-sm font-medium pb-3">Course</th>
                <th className="text-left text-gray-400 text-sm font-medium pb-3">Students</th>
                <th className="text-left text-gray-400 text-sm font-medium pb-3">Avg Grade</th>
                <th className="text-left text-gray-400 text-sm font-medium pb-3">Completion Rate</th>
                <th className="text-left text-gray-400 text-sm font-medium pb-3">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.coursePerformance.map((course, index) => (
                <tr key={index} className="border-b border-gray-700/50">
                  <td className="py-4 text-white font-medium">{course.course}</td>
                  <td className="py-4 text-gray-300">{course.students}</td>
                  <td className="py-4">
                    <span className={`font-medium ${
                      course.avgGrade >= 85 ? 'text-green-400' :
                      course.avgGrade >= 75 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {course.avgGrade}%
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-300 text-sm">{course.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${course.engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-300 text-sm">{course.engagement}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Distribution and Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Grade Distribution</h3>
          <div className="space-y-4">
            {analyticsData.gradeDistribution.map((grade, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-300">{grade.range}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${grade.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{grade.count}</span>
                  <span className="text-gray-400 text-sm w-12 text-right">{grade.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity Trends</h3>
          <div className="space-y-4">
            {analyticsData.weeklyActivity.map((week, index) => (
              <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                <h4 className="text-white font-medium mb-3">{week.week}</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-400">Submissions</p>
                    <p className="text-blue-400 font-bold text-lg">{week.submissions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Forum Posts</p>
                    <p className="text-green-400 font-bold text-lg">{week.forumPosts}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Office Hours</p>
                    <p className="text-purple-400 font-bold text-lg">{week.officeHours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers and Struggling Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Top Performers
          </h3>
          <div className="space-y-4">
            {analyticsData.topPerformers.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div>
                  <p className="text-white font-medium">{student.name}</p>
                  <p className="text-gray-400 text-sm">{student.id} • {student.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">{student.grade}%</p>
                  <p className="text-gray-400 text-sm">{student.assignments} assignments</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Struggling Students */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-red-400" />
            Students Needing Support
          </h3>
          <div className="space-y-4">
            {analyticsData.strugglingStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div>
                  <p className="text-white font-medium">{student.name}</p>
                  <p className="text-gray-400 text-sm">{student.id} • {student.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-400 font-bold">{student.grade}%</p>
                  <p className="text-gray-400 text-sm">{student.missing} missing assignments</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;