import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  X, 
  File,
  Calendar,
  User,
  Filter,
  Search
} from 'lucide-react';

const AssignmentManager = ({ user }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [submissionText, setSubmissionText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'Neural Networks Project',
      course: 'Machine Learning',
      courseCode: 'CS401',
      instructor: 'Dr. Daniel',
      dueDate: '2024-01-15',
      maxPoints: 100,
      description: 'Implement a neural network from scratch using Python. Include backpropagation algorithm and test on MNIST dataset.',
      status: 'pending',
      submissionType: 'file',
      allowedFileTypes: ['.py', '.ipynb', '.pdf'],
      maxFileSize: '10MB',
      daysLeft: 3,
      requirements: [
        'Python implementation of neural network',
        'Backpropagation algorithm',
        'MNIST dataset testing',
        'Documentation and results analysis'
      ]
    },
    {
      id: 2,
      title: 'Binary Tree Implementation',
      course: 'Data Structures',
      courseCode: 'CS301',
      instructor: 'Dr. Smith',
      dueDate: '2024-01-10',
      maxPoints: 100,
      description: 'Implement various binary tree operations including insertion, deletion, and traversal algorithms.',
      status: 'submitted',
      submissionType: 'file',
      grade: 95,
      feedback: 'Excellent implementation! Clean code and comprehensive test cases.',
      submittedAt: '2024-01-09',
      submittedFiles: ['binary_tree.py', 'test_cases.py', 'documentation.pdf']
    },
    {
      id: 3,
      title: 'Database Design Essay',
      course: 'Database Systems',
      courseCode: 'CS350',
      instructor: 'Dr. Johnson',
      dueDate: '2024-01-20',
      maxPoints: 50,
      description: 'Write a 2000-word essay on database normalization techniques and their practical applications.',
      status: 'pending',
      submissionType: 'both',
      allowedFileTypes: ['.pdf', '.docx'],
      maxFileSize: '5MB',
      daysLeft: 8
    },
    {
      id: 4,
      title: 'Algorithm Analysis Report',
      course: 'Algorithms',
      courseCode: 'CS402',
      instructor: 'Dr. Brown',
      dueDate: '2024-01-05',
      maxPoints: 75,
      description: 'Analyze time and space complexity of sorting algorithms.',
      status: 'graded',
      grade: 82,
      feedback: 'Good analysis, but could improve on space complexity discussion.',
      submittedAt: '2024-01-04'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmission = async () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update assignment status
    const updatedAssignments = assignments.map(assignment => 
      assignment.id === selectedAssignment.id 
        ? { ...assignment, status: 'submitted', submittedAt: new Date().toISOString().split('T')[0] }
        : assignment
    );
    
    setIsSubmitting(false);
    setSelectedAssignment(null);
    setUploadFiles([]);
    setSubmissionText('');
    
    // Show success message (you could add a toast notification here)
    alert('Assignment submitted successfully!');
  };

  const downloadFile = (fileName) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.click();
    alert(`Downloading ${fileName}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'submitted': return 'text-blue-400 bg-blue-400/10';
      case 'graded': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Assignment Manager</h1>
              <p className="text-gray-400">Upload, download, and track your assignments</p>
            </div>
          </div>
          
          {/* Filters and Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </div>

        {/* Assignment List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/70 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-400 mb-3">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{assignment.course} • {assignment.instructor}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </span>
                    {assignment.daysLeft && (
                      <span className={`flex items-center space-x-1 ${assignment.daysLeft <= 3 ? 'text-red-400' : 'text-yellow-400'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{assignment.daysLeft} days left</span>
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm">{assignment.description}</p>
                  
                  {assignment.grade && (
                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-medium">Grade: {assignment.grade}/{assignment.maxPoints}</span>
                        {assignment.feedback && (
                          <span className="text-xs text-gray-400">Feedback available</span>
                        )}
                      </div>
                      {assignment.feedback && (
                        <p className="text-sm text-gray-300 mt-2">{assignment.feedback}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  {assignment.status === 'pending' && (
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  )}
                  
                  {assignment.status === 'submitted' && assignment.submittedFiles && (
                    <button
                      onClick={() => downloadFile(assignment.submittedFiles[0])}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  )}
                  
                  {assignment.status === 'graded' && (
                    <button
                      onClick={() => downloadFile(`${assignment.title}_graded.pdf`)}
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>View Grade</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAssignment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Submit Assignment</h2>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{selectedAssignment.title}</h3>
                <p className="text-gray-400 mb-4">{selectedAssignment.description}</p>
                
                {selectedAssignment.requirements && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {selectedAssignment.requirements.map((req, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* File Upload */}
              {(selectedAssignment.submissionType === 'file' || selectedAssignment.submissionType === 'both') && (
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Upload Files</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition-colors duration-200">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      accept={selectedAssignment.allowedFileTypes?.join(',')}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 mb-1">Click to upload files</p>
                      <p className="text-xs text-gray-500">
                        Allowed: {selectedAssignment.allowedFileTypes?.join(', ')} • Max: {selectedAssignment.maxFileSize}
                      </p>
                    </label>
                  </div>
                  
                  {uploadFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <File className="w-4 h-4 text-blue-400" />
                            <span className="text-white text-sm">{file.name}</span>
                            <span className="text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Text Submission */}
              {(selectedAssignment.submissionType === 'text' || selectedAssignment.submissionType === 'both') && (
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Text Submission</label>
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Enter your submission text here..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              )}
              
              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmission}
                  disabled={isSubmitting || (uploadFiles.length === 0 && !submissionText.trim())}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Submit Assignment</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AssignmentManager;