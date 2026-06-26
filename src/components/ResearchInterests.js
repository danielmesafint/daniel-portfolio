import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  Eye, 
  Shield, 
  Layers, 
  Heart, 
  Cpu,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const ResearchInterests = () => {
  const { t } = useTranslation();
  const [selectedResearch, setSelectedResearch] = useState(null);

  const researchAreas = [
    {
      id: 1,
      icon: Brain,
      title: 'Large Language Models (LLMs)',
      description: 'Advanced research in transformer architectures, fine-tuning methodologies, and efficient training techniques for multilingual applications.',
      details: [
        'Multilingual LLM development for Ethiopian languages',
        'Parameter-efficient fine-tuning techniques',
        'Cross-lingual transfer learning',
        'Ethical AI and bias mitigation in LLMs'
      ],
      publications: 8,
      projects: 3,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      icon: Eye,
      title: 'Vision-Language Transformers',
      description: 'Exploring multimodal AI systems that understand and generate content across visual and textual domains.',
      details: [
        'Adversarial robustness in vision-language models',
        'Cross-modal attention mechanisms',
        'Visual question answering systems',
        'Image captioning and description generation'
      ],
      publications: 12,
      projects: 5,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      icon: Shield,
      title: 'Explainable AI (XAI)',
      description: 'Developing interpretable AI systems that provide transparent decision-making processes for critical applications.',
      details: [
        'Model interpretability techniques',
        'Attention visualization methods',
        'Counterfactual explanations',
        'Trust and transparency in AI systems'
      ],
      publications: 6,
      projects: 4,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      icon: Layers,
      title: 'Adversarial Robustness',
      description: 'Enhancing AI model security against adversarial attacks and improving model reliability in real-world scenarios.',
      details: [
        'Adversarial training methodologies',
        'Robustness evaluation frameworks',
        'Defense mechanisms against attacks',
        'Certified robustness techniques'
      ],
      publications: 7,
      projects: 2,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 5,
      icon: Cpu,
      title: '3D Printing & AI-driven Materials Science',
      description: 'Integrating AI with materials science for innovative 3D printing applications and smart material design.',
      details: [
        'AI-optimized printing parameters',
        'Material property prediction',
        'Generative design for 3D structures',
        'Quality control using computer vision'
      ],
      publications: 4,
      projects: 3,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      icon: Heart,
      title: 'AI for Healthcare',
      description: 'Applying AI technologies to solve healthcare challenges, from diagnostic systems to treatment optimization.',
      details: [
        'Medical image analysis and diagnosis',
        'Predictive modeling for patient outcomes',
        'Drug discovery and development',
        'Personalized treatment recommendations'
      ],
      publications: 9,
      projects: 6,
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Research Interests
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Exploring the frontiers of artificial intelligence through innovative research and practical applications
          </p>
        </motion.div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedResearch(area)}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 cursor-pointer group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-pink-500 text-sm font-medium">• {area.publications} Publications</span>
                <ChevronRight 
                  size={16} 
                  className="text-gray-400 group-hover:text-pink-500 transition-colors" 
                />
              </div>
              
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4`}>
                  <area.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {area.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{area.projects} Active Projects</span>
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Research Impact Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">46</div>
              <div className="text-sm opacity-90">Total Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">23</div>
              <div className="text-sm opacity-90">Active Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-sm opacity-90">Research Areas</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Citations</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Research Detail Modal */}
      <AnimatePresence>
        {selectedResearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedResearch(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedResearch.color}`}>
                  <selectedResearch.icon size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedResearch.title}
                  </h3>
                  <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>{selectedResearch.publications} Publications</span>
                    <span>{selectedResearch.projects} Active Projects</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {selectedResearch.description}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Research Areas:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedResearch.details.map((detail, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedResearch(null);
                    document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300"
                >
                  <ExternalLink size={16} />
                  <span>View Publications</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedResearch(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ResearchInterests;