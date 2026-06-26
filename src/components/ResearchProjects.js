import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Target, 
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Github,
  FileText
} from 'lucide-react';

const ResearchProjects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'planning', name: 'Planning' }
  ];

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Healthcare Diagnostics Platform',
      description: 'Developing an integrated AI system for medical image analysis and diagnostic support in Ethiopian healthcare facilities.',
      status: 'active',
      startDate: '2023-01-15',
      endDate: '2025-12-31',
      funding: '$250,000',
      teamSize: 8,
      progress: 65,
      category: 'Healthcare AI',
      objectives: [
        'Develop CNN models for medical image classification',
        'Create user-friendly diagnostic interface',
        'Validate system in clinical settings',
        'Train healthcare professionals on AI tools'
      ],
      achievements: [
        'Achieved 94% accuracy in chest X-ray analysis',
        'Deployed pilot system in 3 hospitals',
        'Trained 50+ healthcare professionals',
        'Published 3 research papers'
      ],
      technologies: ['Python', 'TensorFlow', 'React', 'Docker', 'AWS'],
      collaborators: ['Black Lion Hospital', 'Addis Ababa University', 'MIT CSAIL'],
      publications: 3,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Multilingual NLP for Ethiopian Languages',
      description: 'Building comprehensive natural language processing tools for Amharic, Oromo, and Tigrigna languages.',
      status: 'active',
      startDate: '2022-09-01',
      endDate: '2024-08-31',
      funding: '$180,000',
      teamSize: 6,
      progress: 80,
      category: 'Natural Language Processing',
      objectives: [
        'Create large-scale corpora for Ethiopian languages',
        'Develop transformer-based language models',
        'Build sentiment analysis and NER systems',
        'Deploy language processing APIs'
      ],
      achievements: [
        'Collected 10M+ sentences in 3 languages',
        'Trained BERT models for each language',
        'Achieved SOTA results on benchmark tasks',
        'Released open-source language models'
      ],
      technologies: ['Python', 'Transformers', 'PyTorch', 'FastAPI', 'MongoDB'],
      collaborators: ['Ethiopian AI Institute', 'University of Oxford', 'Google Research'],
      publications: 5,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Vision-Language Models for Agricultural Monitoring',
      description: 'Developing multimodal AI systems for crop monitoring and agricultural decision support using satellite imagery and text data.',
      status: 'completed',
      startDate: '2021-03-01',
      endDate: '2023-02-28',
      funding: '$320,000',
      teamSize: 10,
      progress: 100,
      category: 'Agricultural AI',
      objectives: [
        'Integrate satellite imagery with weather data',
        'Develop crop yield prediction models',
        'Create farmer-friendly mobile application',
        'Validate system across different regions'
      ],
      achievements: [
        'Improved yield prediction accuracy by 35%',
        'Deployed system across 5 regions',
        'Served 1000+ farmers',
        'Won Best Innovation Award 2023'
      ],
      technologies: ['Python', 'Computer Vision', 'GIS', 'Mobile Development', 'Cloud Computing'],
      collaborators: ['Ministry of Agriculture', 'FAO', 'Stanford University'],
      publications: 7,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Explainable AI for Financial Risk Assessment',
      description: 'Creating interpretable machine learning models for credit scoring and financial risk evaluation in Ethiopian banking sector.',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      funding: '$200,000',
      teamSize: 5,
      progress: 40,
      category: 'Financial AI',
      objectives: [
        'Develop interpretable credit scoring models',
        'Create explanation interfaces for loan officers',
        'Ensure regulatory compliance and fairness',
        'Deploy system in partner banks'
      ],
      achievements: [
        'Completed data collection from 3 banks',
        'Developed prototype XAI models',
        'Conducted stakeholder workshops',
        'Filed 2 patent applications'
      ],
      technologies: ['Python', 'SHAP', 'LIME', 'Scikit-learn', 'Dash', 'PostgreSQL'],
      collaborators: ['Commercial Bank of Ethiopia', 'National Bank of Ethiopia', 'MIT Sloan'],
      publications: 2,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 5,
      title: 'Adversarial Robustness in Deep Learning Systems',
      description: 'Research project focused on improving the security and reliability of deep learning models against adversarial attacks.',
      status: 'planning',
      startDate: '2024-01-01',
      endDate: '2026-12-31',
      funding: '$150,000',
      teamSize: 4,
      progress: 15,
      category: 'AI Security',
      objectives: [
        'Develop novel adversarial defense mechanisms',
        'Create robustness evaluation frameworks',
        'Study real-world attack scenarios',
        'Publish findings in top-tier venues'
      ],
      achievements: [
        'Secured research funding',
        'Assembled research team',
        'Completed literature review',
        'Established collaboration agreements'
      ],
      technologies: ['Python', 'PyTorch', 'Adversarial Libraries', 'Security Tools'],
      collaborators: ['Carnegie Mellon University', 'Google DeepMind', 'Microsoft Research'],
      publications: 0,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 6,
      title: 'AI-Enhanced 3D Printing for Medical Devices',
      description: 'Integrating artificial intelligence with 3D printing technology to create personalized medical devices and prosthetics.',
      status: 'completed',
      startDate: '2020-01-01',
      endDate: '2022-12-31',
      funding: '$280,000',
      teamSize: 7,
      progress: 100,
      category: 'Medical Technology',
      objectives: [
        'Develop AI-optimized printing parameters',
        'Create personalized prosthetic designs',
        'Validate biocompatibility and safety',
        'Establish manufacturing protocols'
      ],
      achievements: [
        'Created 50+ personalized prosthetics',
        'Reduced manufacturing time by 60%',
        'Established quality control protocols',
        'Licensed technology to 2 companies'
      ],
      technologies: ['CAD Software', 'Machine Learning', '3D Printing', 'Materials Science'],
      collaborators: ['Addis Ababa University', 'Johns Hopkins University', 'Local Hospitals'],
      publications: 6,
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'planning': return <AlertCircle size={16} />;
      default: return <Target size={16} />;
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('researchProjects.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('researchProjects.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                        <DollarSign size={14} />
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">{project.funding}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Funding</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                        <Users size={14} />
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">{project.teamSize}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Team</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                        <FileText size={14} />
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">{project.publications}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Papers</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Research Projects Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-sm opacity-90">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$1.38M</div>
              <div className="text-sm opacity-90">Total Funding</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">40+</div>
              <div className="text-sm opacity-90">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">23</div>
              <div className="text-sm opacity-90">Publications</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-2 bg-gradient-to-r ${selectedProject.color}`}></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {selectedProject.startDate} - {selectedProject.endDate}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(selectedProject.status)}`}>
                        {getStatusIcon(selectedProject.status)}
                        {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Project Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedProject.description}</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Objectives</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Target size={16} className="text-pink-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Collaborators</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.collaborators.map((collaborator, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Users size={16} className="text-blue-500" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{collaborator}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-pink-500">{selectedProject.progress}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-500">{selectedProject.publications}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Publications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ResearchProjects;