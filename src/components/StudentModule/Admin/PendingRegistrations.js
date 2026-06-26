import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  BookOpen,
  FileText,
  Download,
  AlertCircle,
  User,
  GraduationCap
} from 'lucide-react';
import notificationService from '../services/notificationService';

const PendingRegistrations = ({ instructor, pendingRegistrations, setPendingRegistrations, approvedStudents, setApprovedStudents }) => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Use the real pending registrations data passed from parent
  const registrations = pendingRegistrations || [];

  const filteredRegistrations = registrations.filter(reg => {
    if (filter === 'all') return true;
    return reg.status === filter;
  });

  const handleApprove = async (registrationId) => {
    if (window.confirm('Are you sure you want to approve this registration?')) {
      const registration = registrations.find(r => r.id === registrationId);
      
      try {
        // Update registration status
        const updatedRegistrations = registrations.map(reg => 
          reg.id === registrationId 
            ? { ...reg, status: 'approved', approvedDate: new Date().toISOString() }
            : reg
        );
        
        // Convert approved registration to student record
        const newStudent = {
          id: registration.id,
          studentId: registration.studentId,
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          program: registration.program,
          year: registration.year,
          gpa: 0.0, // Initial GPA
          enrolledCourses: [], // No courses initially
          status: 'active',
          lastActive: new Date().toISOString().split('T')[0],
          totalAssignments: 0,
          submittedAssignments: 0,
          avgGrade: 0,
          dateOfBirth: registration.dateOfBirth,
          expectedGraduation: registration.expectedGraduation,
          previousInstitution: registration.previousInstitution || '',
          approvedDate: new Date().toISOString()
        };
        
        // Add to approved students list
        const updatedStudents = [...(approvedStudents || []), newStudent];
        
        // Update states and localStorage
        setPendingRegistrations(updatedRegistrations);
        setApprovedStudents(updatedStudents);
        localStorage.setItem('pendingRegistrations', JSON.stringify(updatedRegistrations));
        localStorage.setItem('approvedStudents', JSON.stringify(updatedStudents));
        
        // Send approval email notification
        await notificationService.sendApprovalNotification(newStudent);
        
        setSelectedRegistration(null);
      } catch (error) {
        console.error('Error approving registration:', error);
        alert('Error approving registration. Please try again.');
      }
    }
  };

  const handleReject = async (registrationId) => {
    const reason = window.prompt('Please provide a reason for rejection (optional):');
    if (reason !== null) { // User didn't cancel
      const registration = registrations.find(r => r.id === registrationId);
      
      try {
        const updatedRegistrations = registrations.map(reg => 
          reg.id === registrationId 
            ? { ...reg, status: 'rejected', rejectedDate: new Date().toISOString(), rejectionReason: reason }
            : reg
        );
        
        setPendingRegistrations(updatedRegistrations);
        localStorage.setItem('pendingRegistrations', JSON.stringify(updatedRegistrations));
        
        // Send rejection email notification
        await notificationService.sendRejectionNotification(registration, reason);
        
        setSelectedRegistration(null);
      } catch (error) {
        console.error('Error rejecting registration:', error);
        alert('Error rejecting registration. Please try again.');
      }
    }
  };

  const sendEmail = (email, subject = 'Regarding your registration') => {
    // Simulate opening email client
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
  };

  const downloadDocument = (filename) => {
    // Simulate document download
    alert(`Downloading ${filename}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'approved': return 'text-green-400 bg-green-400/10';
      case 'rejected': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <Clock className="w-8 h-8 text-orange-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Pending Registrations</h1>
              <p className="text-gray-400">Review and approve student registration requests</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Registrations</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-white">{registrations.length}</p>
              </div>
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-white">{registrations.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-white">{registrations.filter(r => r.status === 'approved').length}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-white">{registrations.filter(r => r.status === 'rejected').length}</p>
              </div>
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        {/* Registrations List */}
        <div className="space-y-4">
          {filteredRegistrations.length > 0 ? (
            filteredRegistrations.map((registration) => (
              <motion.div
                key={registration.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/70 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {registration.firstName[0]}{registration.lastName[0]}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold">
                        {registration.firstName} {registration.lastName}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{registration.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <GraduationCap className="w-3 h-3" />
                          <span>{registration.studentId}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{registration.program}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        {formatDate(registration.registrationDate)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedRegistration(registration)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      
                      <button
                        onClick={() => sendEmail(registration.email)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      
                      {registration.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(registration.id)}
                            className="p-2 hover:bg-green-600 rounded-lg transition-colors duration-200"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 hover:text-white" />
                          </button>
                          
                          <button
                            onClick={() => handleReject(registration.id)}
                            className="p-2 hover:bg-red-600 rounded-lg transition-colors duration-200"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-400 hover:text-white" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No registrations found</h3>
              <p className="text-gray-400">No registration requests match your current filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Details Modal */}
      <AnimatePresence>
        {selectedRegistration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRegistration(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Registration Details</h2>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <XCircle className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Full Name:</p>
                    <p className="text-white font-medium">{selectedRegistration.firstName} {selectedRegistration.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p className="text-white font-medium">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                    <p className="text-white font-medium">{selectedRegistration.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Date of Birth:</p>
                    <p className="text-white font-medium">{selectedRegistration.dateOfBirth}</p>
                  </div>
                </div>
              </div>
              
              {/* Academic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Student ID:</p>
                    <p className="text-white font-medium">{selectedRegistration.studentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Program:</p>
                    <p className="text-white font-medium">{selectedRegistration.program}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Academic Year:</p>
                    <p className="text-white font-medium">Year {selectedRegistration.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Expected Graduation:</p>
                    <p className="text-white font-medium">{selectedRegistration.expectedGraduation}</p>
                  </div>
                  {selectedRegistration.previousInstitution && (
                    <div className="md:col-span-2">
                      <p className="text-gray-400">Previous Institution:</p>
                      <p className="text-white font-medium">{selectedRegistration.previousInstitution}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Documents */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Submitted Documents
                </h3>
                <div className="space-y-2">
                  {selectedRegistration.transcripts ? (
                    <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm">Academic Transcripts</span>
                      </div>
                      <button
                        onClick={() => downloadDocument(selectedRegistration.transcripts.name || 'transcripts.pdf')}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors duration-200 flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 bg-gray-700/30 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-400 text-sm">No transcripts submitted</span>
                    </div>
                  )}
                  
                  {selectedRegistration.idDocument ? (
                    <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">ID Document</span>
                      </div>
                      <button
                        onClick={() => downloadDocument(selectedRegistration.idDocument.name || 'id_document.pdf')}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors duration-200 flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 bg-gray-700/30 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-400 text-sm">No ID document submitted</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Registration Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Registration Status</h3>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRegistration.status)}`}>
                      {selectedRegistration.status.charAt(0).toUpperCase() + selectedRegistration.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Submitted:</span>
                    <span className="text-white text-sm">{formatDate(selectedRegistration.registrationDate)}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              {selectedRegistration.status === 'pending' && (
                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() => sendEmail(selectedRegistration.email, 'Registration Update Required')}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </button>
                  
                  <button
                    onClick={() => handleReject(selectedRegistration.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  
                  <button
                    onClick={() => handleApprove(selectedRegistration.id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PendingRegistrations;