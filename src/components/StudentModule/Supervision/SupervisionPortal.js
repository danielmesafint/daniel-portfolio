import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, CheckCircle } from 'lucide-react';

const SupervisionPortal = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <Users className="w-8 h-8 text-orange-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Supervision Portal</h1>
            <p className="text-gray-400">Manage your MSc/BSc projects and supervision</p>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Current Project</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium">AI-Powered Student Assistant Development</h4>
              <p className="text-gray-400 text-sm">MSc Thesis • Supervisor: Dr. Daniel Mesafint</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white text-sm">Next Meeting</p>
                  <p className="text-gray-400 text-xs">Jan 15, 2024 - 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white text-sm">Progress Report</p>
                  <p className="text-gray-400 text-xs">Due: Jan 20, 2024</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white text-sm">Completion</p>
                  <p className="text-gray-400 text-xs">65% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupervisionPortal;