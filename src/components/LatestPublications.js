import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, ExternalLink, Calendar, Users, Award } from 'lucide-react';

const LatestPublications = () => {
  const { t } = useTranslation();

  const publications = [
    {
      title: "Deep Learning Approaches for Educational Data Mining in Ethiopian Higher Education",
      authors: "Daniel Mesafint, et al.",
      journal: "International Journal of Educational Technology",
      year: "2024",
      type: "Journal Article",
      citations: 15,
      impact: "Q1",
      abstract: "This study explores the application of deep learning techniques for mining educational data in Ethiopian universities...",
      link: "#publications",
      featured: true
    },
    {
      title: "Machine Learning for Crop Yield Prediction: A Case Study in Ethiopian Agriculture",
      authors: "Daniel Mesafint, A. Smith, B. Johnson",
      journal: "Agricultural AI Conference",
      year: "2024",
      type: "Conference Paper",
      citations: 8,
      impact: "Core A",
      abstract: "We present a comprehensive machine learning framework for predicting crop yields using satellite imagery and weather data...",
      link: "#publications",
      featured: false
    },
    {
      title: "Natural Language Processing for Low-Resource Languages: Amharic Text Classification",
      authors: "Daniel Mesafint, C. Williams",
      journal: "Computational Linguistics Review",
      year: "2023",
      type: "Journal Article",
      citations: 23,
      impact: "Q2",
      abstract: "This paper addresses the challenges of NLP for low-resource languages, specifically focusing on Amharic text classification...",
      link: "#publications",
      featured: true
    }
  ];

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
            {t('latestPublications.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('latestPublications.description')}
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                pub.featured ? 'border-pink-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${pub.featured ? 'bg-pink-100 dark:bg-pink-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <FileText size={20} className={pub.featured ? 'text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-400'} />
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pub.type === 'Journal Article' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {pub.type}
                        </span>
                        {pub.featured && (
                          <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-pink-500 transition-colors cursor-pointer">
                    {pub.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    {pub.authors}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {pub.abstract}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{pub.journal}, {pub.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{pub.citations} citations</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={14} />
                      <span>{pub.impact}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors"
                  >
                    <span>Read More</span>
                    <ExternalLink size={16} />
                  </button>
                </div>

                <div className="lg:w-48 flex lg:flex-col gap-2">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{pub.citations}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Citations</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{pub.impact}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Impact</div>
                  </div>
                </div>
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
            onClick={() => document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            <span>{t('latestPublications.viewAll')}</span>
            <ExternalLink size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestPublications;