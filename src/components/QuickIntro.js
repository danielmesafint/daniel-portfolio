import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Award, Globe } from 'lucide-react';

const QuickIntro = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: BookOpen,
      number: '25+',
      label: t('quickIntro.publications'),
      color: 'text-blue-500'
    },
    {
      icon: Users,
      number: '500+',
      label: t('quickIntro.students'),
      color: 'text-green-500'
    },
    {
      icon: Award,
      number: '10+',
      label: t('quickIntro.awards'),
      color: 'text-purple-500'
    },
    {
      icon: Globe,
      number: '15+',
      label: t('quickIntro.projects'),
      color: 'text-orange-500'
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
            {t('quickIntro.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('quickIntro.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg mb-4 ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {item.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('quickIntro.expertise.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('quickIntro.expertise.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI/ML', 'Data Science', 'Research', 'Teaching', 'Consulting'].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 p-1">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">5+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickIntro;