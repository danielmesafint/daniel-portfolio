import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight, Tag, ExternalLink } from 'lucide-react';

const News = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      title: 'Portfolio Website Relaunched',
      excerpt: 'The portfolio has been refreshed with an updated research overview, publications, projects and teaching resources.',
      date: '2026-11-08',
      readTime: '2 min read',
      category: 'Announcement',
      image: '/og-image.jpg',
      link: '#about',
      featured: true
    },
    {
      id: 2,
      title: 'Research Profiles Now Linked',
      excerpt: 'Publications and citations can now be followed through Google Scholar and ORCID, linked from the contact and footer sections.',
      date: '2026-11-01',
      readTime: '1 min read',
      category: 'Research',
      image: '/all_research_images/research_methodology_in-datascience.jpg',
      link: '#publications',
      featured: false
    },
    {
      id: 3,
      title: 'Ongoing Work on Vision-Language Models',
      excerpt: 'Research continues on vision-language transformers and explainable AI, with applications in healthcare and agriculture.',
      date: '2026-10-20',
      readTime: '3 min read',
      category: 'Research',
      image: '/all_project_images/vision_language_transformer.jpg',
      link: '#research',
      featured: true
    },
    {
      id: 4,
      title: 'Open to Student Supervision and Collaboration',
      excerpt: 'MSc students and research partners interested in applied AI are welcome to get in touch to discuss projects.',
      date: '2026-10-05',
      readTime: '2 min read',
      category: 'Teaching',
      image: '/all_research_images/agri_resilience.jpg',
      link: '#contact',
      featured: false
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Speaking': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Funding': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Collaboration': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Awards': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Teaching': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

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
            Latest News & Updates
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with my latest research, publications, speaking engagements, and academic achievements
          </p>
        </motion.div>

        {/* Featured News */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured News
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item, index) => (
              <motion.article
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(item.date)}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <motion.a
                    href={item.link}
                    className="inline-flex items-center text-pink-600 dark:text-pink-400 font-medium hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Regular News */}
        <div>
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Recent Updates
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item, index) => (
              <motion.article
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(item.date)}</span>
                    <Clock className="w-3 h-3 ml-3 mr-1" />
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {item.excerpt}
                  </p>

                  <motion.a
                    href={item.link}
                    className="inline-flex items-center text-pink-600 dark:text-pink-400 font-medium text-sm hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    Read More
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View All News Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default News;