import React from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Star, ExternalLink } from 'lucide-react';

const CollaborationHub = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <Search className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Research Collaboration Hub</h1>
            <p className="text-gray-400">Discover research opportunities and collaborate</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              Featured Opportunities
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-600/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">AI Ethics Research Project</h4>
                <p className="text-gray-400 text-sm mb-3">Investigating bias in machine learning algorithms</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-xs">Dr. Daniel Mesafint</span>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-600/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Natural Language Processing</h4>
                <p className="text-gray-400 text-sm mb-3">Developing multilingual chatbots</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs">Dr. Smith</span>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 text-purple-400 mr-2" />
              My Research Projects
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg">
                <h4 className="text-white font-medium mb-2">AI Student Assistant</h4>
                <p className="text-gray-400 text-sm mb-3">MSc Thesis Project - 65% Complete</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-xs">Active</span>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollaborationHub;