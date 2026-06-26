import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Clock, User, ArrowLeft } from 'lucide-react';

const RegistrationSuccess = ({ registrationData, onBackToLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-white mb-4">Registration Submitted!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for registering, {registrationData?.firstName}! Your application has been submitted successfully.
            </p>
          </motion.div>

          {/* Registration Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-700/50 rounded-lg p-6 mb-6 text-left"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Registration Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{registrationData?.firstName} {registrationData?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{registrationData?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Student ID:</span>
                <span className="text-white">{registrationData?.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Program:</span>
                <span className="text-white">{registrationData?.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-yellow-400 font-medium">Pending Approval</span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-6"
          >
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h4 className="text-blue-400 font-medium mb-2">What happens next?</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Your registration will be reviewed by Dr. Daniel Mesafint</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>You'll receive an email notification once approved (typically 1-2 business days)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>After approval, you can log in and access your courses</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Email Notification Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <p className="text-green-400 font-medium text-sm">Email Notifications Sent</p>
                <p className="text-gray-300 text-xs">
                  Confirmation sent to {registrationData?.email} and notification sent to instructor
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-4"
          >
            <button
              onClick={onBackToLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
            
            <a
              href="/"
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
            >
              Return to Portfolio
            </a>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 pt-6 border-t border-gray-600"
          >
            <p className="text-gray-400 text-xs">
              Questions about your registration? Contact{' '}
              <a href="mailto:daniel@university.edu" className="text-blue-400 hover:text-blue-300">
                daniel@university.edu
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;