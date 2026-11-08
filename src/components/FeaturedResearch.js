import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Calendar, Users } from 'lucide-react';

const FeaturedResearch = () => {
  const { t } = useTranslation();

  const featuredResearch = [
    {
      title: "AI-Powered Educational Assessment Systems",
      description: "Developing intelligent systems for automated assessment and personalized learning pathways in higher education.",
      image: "/all_research_images/research_methodology_in-datascience.jpg",
      category: "AI in Education",
      date: "2024",
      collaborators: 3,
      status: "Ongoing",
      link: "#research"
    },
    {
      title: "Machine Learning for Agricultural Optimization",
      description: "Implementing ML algorithms to optimize crop yield prediction and resource management in Ethiopian agriculture.",
      image: "/all_research_images/agri_resilience.jpg",
      category: "Agricultural AI",
      date: "2023",
      collaborators: 5,
      status: "Published",
      link: "#research"
    },
    {
      title: "Natural Language Processing for Amharic Text",
      description: "Advancing NLP techniques for Ethiopian languages with focus on sentiment analysis and text classification.",
      image: "/all_project_images/ethiopian_nlp.jpg",
      category: "NLP",
      date: "2024",
      collaborators: 4,
      status: "In Review",
      link: "#research"
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
            {t('featuredResearch.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('featuredResearch.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResearch.map((research, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 bg-gradient-to-br from-pink-500 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 rounded-full text-xs font-medium">
                    {research.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    research.status === 'Published' ? 'bg-green-500 text-white' :
                    research.status === 'Ongoing' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {research.status}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <ExternalLink size={24} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-500 transition-colors">
                  {research.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {research.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{research.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{research.collaborators} collaborators</span>
                  </div>
                </div>

                <button
                  onClick={() => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <span>Learn More</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            {t('featuredResearch.viewAll')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedResearch;