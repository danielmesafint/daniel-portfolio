import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Eye, Filter } from 'lucide-react';

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'research', name: 'Research' },
    { id: 'web', name: 'Web Development' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Vision-Language Transformer for Medical Imaging',
      category: 'research',
      image: '/api/placeholder/400/300',
      description: 'Advanced AI model for medical image analysis using vision-language transformers.',
      technologies: ['PyTorch', 'Transformers', 'Computer Vision', 'Healthcare AI'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'AI-Powered Academic Portfolio Website',
      category: 'web',
      image: '/api/placeholder/400/300',
      description: 'Modern, responsive portfolio website with AI chatbot integration.',
      technologies: ['React', 'Node.js', 'AI Integration', 'Responsive Design'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Explainable AI Dashboard',
      category: 'ai',
      image: '/api/placeholder/400/300',
      description: 'Interactive dashboard for explaining AI model decisions and predictions.',
      technologies: ['Python', 'Streamlit', 'XAI', 'Data Visualization'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Research Collaboration Platform',
      category: 'web',
      image: '/api/placeholder/400/300',
      description: 'Platform connecting researchers worldwide for collaborative projects.',
      technologies: ['React', 'Firebase', 'Real-time Chat', 'Cloud Functions'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Mobile Learning Assistant',
      category: 'mobile',
      image: '/api/placeholder/400/300',
      description: 'AI-powered mobile app for personalized learning experiences.',
      technologies: ['React Native', 'TensorFlow Lite', 'Mobile AI', 'Education'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Healthcare Prediction Model',
      category: 'ai',
      image: '/api/placeholder/400/300',
      description: 'Machine learning model for early disease prediction and diagnosis.',
      technologies: ['Python', 'Scikit-learn', 'Healthcare Data', 'Predictive Analytics'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Showcase
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my best work in research, development, and innovation
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === category.id
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600'
                }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-4">
                      <motion.a
                        href={item.liveUrl}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={item.githubUrl}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={item.liveUrl}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </motion.a>
                    <motion.a
                      href={item.githubUrl}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;