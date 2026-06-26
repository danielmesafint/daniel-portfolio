import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Plus,
    Edit,
    Trash2,
    Calendar,
    Clock,
    Users,
    CheckCircle,
    AlertCircle,
    Search,
    Filter,
    Download,
    Upload,
    Eye,
    BarChart3
} from 'lucide-react';

const AssignmentsManagement = ({ instructor }) => {
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            title: 'Neural Networks Project',
            course: 'CS401 - Machine Learning',
            courseId: 1,
            type: 'project',
            dueDate: '2024-01-20',
            totalPoints: 100,
            submissions: 32,
            totalStudents: 45,
            status: 'active',
            description: 'Implement a neural network from scratch using Python',
            graded: 15,
            avgGrade: 85.2
        },
        {
            id: 2,
            title: 'Binary Tree Implementation',
            course: 'CS301 - Data Structures',
            courseId: 2,
            type: 'homework',
            dueDate: '2024-01-15',
            totalPoints: 50,
            submissions: 38,
            totalStudents: 38,
            status: 'closed',
            description: 'Implement various binary tree operations',
            graded: 38,
            avgGrade: 78.9
        },
        {
            id: 3,
            title: 'SQL Optimization Assignment',
            course: 'CS350 - Database Systems',
            courseId: 3,
            type: 'assignment',
            dueDate: '2024-01-25',
            totalPoints: 75,
            submissions: 12,
            totalStudents: 30,
            status: 'active',
            description: 'Optimize complex SQL queries for better performance',
            graded: 0,
            avgGrade: 0
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);

    const courses = [
        { id: 1, code: 'CS401', name: 'Machine Learning' },
        { id: 2, code: 'CS301', name: 'Data Structures' },
        { id: 3, code: 'CS350', name: 'Database Systems' }
    ];

    const filteredAssignments = assignments.filter(assignment => {
        const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
        const matchesType = filterType === 'all' || assignment.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });

    const handleAddAssignment = () => {
        setEditingAssignment(null);
        setShowAddModal(true);
    };

    const handleEditAssignment = (assignment) => {
        setEditingAssignment(assignment);
        setShowAddModal(true);
    };

    const handleDeleteAssignment = (assignmentId) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-400';
            case 'closed': return 'bg-red-500/10 text-red-400';
            case 'draft': return 'bg-yellow-500/10 text-yellow-400';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'project': return 'bg-purple-500/10 text-purple-400';
            case 'homework': return 'bg-blue-500/10 text-blue-400';
            case 'assignment': return 'bg-orange-500/10 text-orange-400';
            case 'exam': return 'bg-red-500/10 text-red-400';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    const AssignmentModal = () => {
        const [formData, setFormData] = useState(editingAssignment || {
            title: '',
            courseId: '',
            type: 'assignment',
            dueDate: '',
            totalPoints: 100,
            description: '',
            status: 'draft'
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            const selectedCourse = courses.find(c => c.id === parseInt(formData.courseId));
            const assignmentData = {
                ...formData,
                course: `${selectedCourse.code} - ${selectedCourse.name}`,
                submissions: 0,
                totalStudents: 45, // Mock data
                graded: 0,
                avgGrade: 0
            };

            if (editingAssignment) {
                setAssignments(assignments.map(assignment =>
                    assignment.id === editingAssignment.id ? { ...assignmentData, id: editingAssignment.id } : assignment
                ));
            } else {
                setAssignments([...assignments, { ...assignmentData, id: Date.now() }]);
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
                        {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Assignment Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Course</label>
                                <select
                                    value={formData.courseId}
                                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Course</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.code} - {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="assignment">Assignment</option>
                                    <option value="homework">Homework</option>
                                    <option value="project">Project</option>
                                    <option value="exam">Exam</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Due Date</label>
                                <input
                                    type="datetime-local"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Total Points</label>
                                <input
                                    type="number"
                                    value={formData.totalPoints}
                                    onChange={(e) => setFormData({ ...formData, totalPoints: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="4"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Assignment instructions and requirements..."
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="closed">Closed</option>
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
                                {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
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
                    <h2 className="text-2xl font-bold text-white">Assignments Management</h2>
                    <p className="text-gray-400">Create, manage, and track student assignments</p>
                </div>
                <button
                    onClick={handleAddAssignment}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Assignment</span>
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
                                placeholder="Search assignments..."
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
                                <option value="closed">Closed</option>
                                <option value="draft">Draft</option>
                            </select>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="assignment">Assignment</option>
                                <option value="homework">Homework</option>
                                <option value="project">Project</option>
                                <option value="exam">Exam</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
                {filteredAssignments.map((assignment) => (
                    <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                        {assignment.status}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(assignment.type)}`}>
                                        {assignment.type}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">{assignment.course}</p>
                                <p className="text-gray-300 text-sm">{assignment.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleEditAssignment(assignment)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                >
                                    <Edit className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                                    <Eye className="w-4 h-4 text-gray-400" />
                                </button>
                                <button
                                    onClick={() => handleDeleteAssignment(assignment.id)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                            <div className="text-center">
                                <p className="text-gray-400 text-xs">Due Date</p>
                                <p className="text-white font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-xs">Points</p>
                                <p className="text-white font-medium">{assignment.totalPoints}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-xs">Submissions</p>
                                <p className="text-white font-medium">{assignment.submissions}/{assignment.totalStudents}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-xs">Graded</p>
                                <p className="text-white font-medium">{assignment.graded}/{assignment.submissions}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-xs">Avg Grade</p>
                                <p className="text-green-400 font-medium">{assignment.avgGrade}%</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-400">
                                        {Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-400">{assignment.totalStudents} students</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors duration-200">
                                    Grade Submissions
                                </button>
                                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors duration-200 flex items-center space-x-1">
                                    <BarChart3 className="w-3 h-3" />
                                    <span>Analytics</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredAssignments.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No assignments found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Add/Edit Assignment Modal */}
            {showAddModal && <AssignmentModal />}
        </motion.div>
    );
};

export default AssignmentsManagement;