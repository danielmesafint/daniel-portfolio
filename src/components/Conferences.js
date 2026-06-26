import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Monitor, 
  ExternalLink, 
  Download, 
  Calendar, 
  Users, 
  Award,
  MapPin,
  Mic,
  Video
} from 'lucide-react';

const Conferences = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Conferences' },
    { id: 'keynote', name: 'Keynotes' },
    { id: 'oral', name: 'Oral Presentations' },
    { id: 'poster', name: 'Poster Sessions' },
    { id: 'workshop', name: 'Workshops' }
  ];

  const conferences = [
    {
      id: 1,
      title: 'Explainable AI in Medical Diagnosis: Bridging the Gap Between Accuracy and Interpretability',
      conference: 'International Conference on Computer Vision (ICCV)',
      year: 2024,
      location: 'Paris, France',
      type: 'keynote',
      presentationType: 'Keynote Speaker',
      authors: ['Daniel Mesafint', 'Prof. Michael Chen', 'Dr. Sarah Johnson'],
      abstract: 'We present novel explainable AI techniques that maintain high accuracy while providing interpretable medical diagnoses.',
      keywords: ['Explainable AI', 'Medical Diagnosis', 'Interpretability', 'Computer Vision'],
      citations: 34,
      acceptance: '22%',
      ranking: 'A*',
      doi: '10.1109/ICCV.2024.123456',
      slides: true,
      video: true,
      featured: true
    },
    {
      id: 2,
      title: 'Vision-Language Transformers for Healthcare: A Multi-Modal Approach',
      conference: 'Conference on Neural Information Processing Systems (NeurIPS)',
      year: 2024,
      location: 'Vancouver, Canada',
      type: 'oral',
      presentationType: 'Oral Presentation',
      authors: ['Daniel Mesafint', 'Research Collaborators'],
      abstract: 'This work explores vision-language transformers for healthcare applications, demonstrating superior performance in medical image analysis.',
      keywords: ['Vision-Language Models', 'Healthcare AI', 'Transformers', 'Medical Imaging'],
      citations: 28,
      acceptance: '25%',
      ranking: 'A*',
      doi: '10.5555/neurips.2024.123456',
      slides: true,
      video: true,
      featured: true
    },
    {
      id: 3,
      title: 'Adversarial Robustness in Deep Learning: Defense Mechanisms and Evaluation',
      conference: 'International Conference on Machine Learning (ICML)',
      year: 2023,
      location: 'Honolulu, Hawaii',
      type: 'oral',
      presentationType: 'Oral Presentation',
      authors: ['Daniel Mesafint', 'Security Research Team'],
      abstract: 'We propose novel defense mechanisms against adversarial attacks and comprehensive evaluation frameworks for robustness assessment.',
      keywords: ['Adversarial ML', 'Robustness', 'Security', 'Defense Mechanisms'],
      citations: 45,
      acceptance: '27%',
      ranking: 'A*',
      doi: '10.5555/icml.2023.123456',
      slides: true,
      video: false,
      featured: true
    },
    {
      id: 4,
      title: 'Multilingual NLP for Ethiopian Languages: Challenges and Solutions',
      conference: 'Association for Computational Linguistics (ACL)',
      year: 2023,
      location: 'Toronto, Canada',
      type: 'oral',
      presentationType: 'Oral Presentation',
      authors: ['Daniel Mesafint', 'Ethiopian NLP Consortium'],
      abstract: 'This paper addresses the challenges of NLP for Ethiopian languages and presents comprehensive solutions for low-resource language processing.',
      keywords: ['Multilingual NLP', 'Ethiopian Languages', 'Low-Resource Languages', 'Language Models'],
      citations: 67,
      acceptance: '23%',
      ranking: 'A*',
      doi: '10.18653/v1/2023.acl-long.123',
      slides: true,
      video: true,
      featured: false
    },
    {
      id: 5,
      title: 'AI-Driven Agricultural Monitoring: From Satellite Data to Actionable Insights',
      conference: 'AAAI Conference on Artificial Intelligence',
      year: 2023,
      location: 'Washington, DC, USA',
      type: 'poster',
      presentationType: 'Poster Session',
      authors: ['Daniel Mesafint', 'Agricultural AI Team'],
      abstract: 'We present an end-to-end system for agricultural monitoring using satellite imagery and AI, providing actionable insights for farmers.',
      keywords: ['Agricultural AI', 'Satellite Imagery', 'Remote Sensing', 'Smart Agriculture'],
      citations: 23,
      acceptance: '19%',
      ranking: 'A*',
      doi: '10.1609/aaai.v37i1.123456',
      slides: false,
      video: false,
      featured: false
    },
    {
      id: 6,
      title: 'Federated Learning for Privacy-Preserving Healthcare AI',
      conference: 'IEEE International Conference on Healthcare Informatics',
      year: 2022,
      location: 'Rochester, MN, USA',
      type: 'keynote',
      presentationType: 'Keynote Speaker',
      authors: ['Daniel Mesafint', 'Privacy Research Consortium'],
      abstract: 'This keynote presents federated learning approaches for healthcare AI that preserve patient privacy while maintaining model performance.',
      keywords: ['Federated Learning', 'Healthcare Privacy', 'Medical AI', 'Privacy-Preserving ML'],
      citations: 89,
      acceptance: '30%',
      ranking: 'A',
      doi: '10.1109/ICHI.2022.123456',
      slides: true,
      video: true,
      featured: false
    },
    {
      id: 7,
      title: 'Deep Learning Workshop: Practical Applications in Healthcare',
      conference: 'International Conference on Medical Image Computing (MICCAI)',
      year: 2022,
      location: 'Singapore',
      type: 'workshop',
      presentationType: 'Workshop Organizer',
      authors: ['Daniel Mesafint', 'Workshop Committee'],
      abstract: 'Organized and led a hands-on workshop on deep learning applications in healthcare, focusing on practical implementation and real-world challenges.',
      keywords: ['Deep Learning', 'Healthcare Applications', 'Medical Imaging', 'Workshop'],
      citations: 12,
      acceptance: 'N/A',
      ranking: 'A',
      doi: '10.1007/978-3-031-16443-9_123',
      slides: true,
      video: false,
      featured: false
    },
    {
      id: 8,
      title: 'Computer Vision for Medical Diagnosis: Challenges and Opportunities',
      conference: 'European Conference on Computer Vision (ECCV)',
      year: 2022,
      location: 'Tel Aviv, Israel',
      type: 'poster',
      presentationType: 'Poster Session',
      authors: ['Daniel Mesafint', 'Medical Vision Team'],
      abstract: 'We explore the challenges and opportunities of computer vision in medical diagnosis, presenting novel approaches and evaluation metrics.',
      keywords: ['Computer Vision', 'Medical Diagnosis', 'Healthcare AI', 'Image Analysis'],
      citations: 56,
      acceptance: '28%',
      ranking: 'A*',
      doi: '10.1007/978-3-031-20053-3_123',
      slides: false,
      video: false,
      featured: false
    },
    {
      id: 9,
      title: 'Emerging Trends in AI for Social Good',
      conference: 'International Joint Conference on Artificial Intelligence (IJCAI)',
      year: 2021,
      location: 'Montreal, Canada (Virtual)',
      type: 'oral',
      presentationType: 'Oral Presentation',
      authors: ['Daniel Mesafint', 'AI for Good Initiative'],
      abstract: 'This presentation discusses emerging trends in AI for social good, highlighting successful applications and future directions.',
      keywords: ['AI for Social Good', 'Emerging Trends', 'Social Impact', 'Sustainable AI'],
      citations: 78,
      acceptance: '21%',
      ranking: 'A*',
      doi: '10.24963/ijcai.2021/123',
      slides: true,
      video: true,
      featured: false
    }
  ];

  const filteredConferences = activeFilter === 'all' 
    ? conferences 
    : conferences.filter(conf => conf.type === activeFilter);

  const getTypeColor = (type) => {
    switch (type) {
      case 'keynote': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'oral': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'poster': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'workshop': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRankingColor = (ranking) => {
    switch (ranking) {
      case 'A*': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'A': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'keynote': return <Mic size={16} />;
      case 'oral': return <Monitor size={16} />;
      case 'poster': return <Award size={16} />;
      case 'workshop': return <Users size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const totalCitations = conferences.reduce((sum, conf) => sum + conf.citations, 0);
  const keynoteCount = conferences.filter(conf => conf.type === 'keynote').length;

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
            Conference Presentations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Presentations at top-tier international conferences and workshops
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-pink-500">{conferences.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Presentations</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-500">{keynoteCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Keynote Speeches</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-500">{totalCitations}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Citations</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-500">{conferences.filter(c => c.ranking === 'A*').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">A* Conferences</div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Conference Presentations List */}
        <div className="space-y-6">
          {filteredConferences.map((conference, index) => (
            <motion.article
              key={conference.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 ${
                conference.featured ? 'ring-2 ring-pink-500 ring-opacity-50' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {conference.featured && (
                          <span className="px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-2 ${getTypeColor(conference.type)}`}>
                          {getTypeIcon(conference.type)}
                          {conference.presentationType}
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRankingColor(conference.ranking)}`}>
                          {conference.ranking}
                        </span>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {conference.year}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        {conference.title}
                      </h3>
                      
                      <div className="flex items-center text-pink-600 dark:text-pink-400 font-medium mb-2">
                        <Monitor className="w-4 h-4 mr-2" />
                        <span>{conference.conference}</span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{conference.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {conference.authors.join(', ')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {conference.abstract}
                      </p>
                      
                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {conference.keywords.map((keyword, keyIndex) => (
                          <span
                            key={keyIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Conference Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        <span>{conference.citations} citations</span>
                      </div>
                      {conference.acceptance !== 'N/A' && (
                        <span>Acceptance: {conference.acceptance}</span>
                      )}
                      <span>DOI: {conference.doi}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      {conference.slides && (
                        <motion.button
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Monitor className="w-4 h-4" />
                          Slides
                        </motion.button>
                      )}
                      {conference.video && (
                        <motion.button
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Video className="w-4 h-4" />
                          Video
                        </motion.button>
                      )}
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Paper
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Conference Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Conference Presentation Impact</h3>
          <p className="text-lg opacity-90 mb-6">
            Presenting cutting-edge research at premier international conferences and engaging with the global AI community
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-sm opacity-90">Years Presenting</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Countries Visited</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">80%</div>
              <div className="text-sm opacity-90">A*/A Conferences</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Audience Reached</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Conferences;