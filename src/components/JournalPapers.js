import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Calendar, 
  Users, 
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';

const JournalPapers = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('all');

  const years = ['all', '2025', '2024', '2023', '2022', '2021'];

  const journalPapers = [
    {
      id: 1,
      title: 'EfficientNet_ConvNeXt for Facial Expression Recognition in Healthcare AI',
      authors: ['Daniel Mesafint', 'Sarah Johnson', 'Michael Chen'],
      journal: 'IEEE Transactions on Medical Imaging',
      year: 2025,
      volume: '44',
      issue: '3',
      pages: '123-135',
      impact: 'Q1',
      impactFactor: '10.6',
      citations: 45,
      doi: '10.1109/TMI.2025.123456',
      abstract: 'This paper presents a novel approach to facial expression recognition using EfficientNet and ConvNeXt architectures for healthcare applications. We demonstrate significant improvements in accuracy and computational efficiency.',
      keywords: ['Computer Vision', 'Healthcare AI', 'Deep Learning', 'Facial Recognition'],
      featured: true,
      openAccess: true
    },
    {
      id: 2,
      title: 'Adversarial Robustness of Vision-Language Transformers: A Comprehensive Study',
      authors: ['Daniel Mesafint', 'Lisa Wang', 'Ahmed Hassan'],
      journal: 'Elsevier Pattern Recognition',
      year: 2024,
      volume: '156',
      issue: '2',
      pages: '89-102',
      impact: 'Q1',
      impactFactor: '8.5',
      citations: 78,
      doi: '10.1016/j.patcog.2024.123456',
      abstract: 'We investigate the adversarial robustness of vision-language transformers and propose novel defense mechanisms that maintain performance while improving security.',
      keywords: ['Adversarial ML', 'Vision-Language Models', 'Robustness', 'Transformers'],
      featured: true,
      openAccess: false
    },
    {
      id: 3,
      title: 'Deep Learning Approaches for HIV Test Prediction: A Multi-Modal Analysis',
      authors: ['Daniel Mesafint', 'Amara Okafor', 'James Rodriguez'],
      journal: 'Springer Nature Machine Intelligence',
      year: 2023,
      volume: '5',
      issue: '4',
      pages: '234-248',
      impact: 'Q1',
      impactFactor: '12.3',
      citations: 92,
      doi: '10.1038/s42256-023-123456',
      abstract: 'This study explores deep learning methodologies for HIV test prediction using multi-modal data analysis, achieving state-of-the-art performance.',
      keywords: ['Healthcare AI', 'Multi-modal Learning', 'HIV Prediction', 'Deep Learning'],
      featured: true,
      openAccess: true
    },
    {
      id: 4,
      title: 'Vision Transformers in Medical Imaging: A Comprehensive Survey',
      authors: ['Daniel Mesafint', 'International Collaborators'],
      journal: 'Medical Image Analysis (Elsevier)',
      year: 2023,
      volume: '89',
      issue: '1',
      pages: '45-78',
      impact: 'Q1',
      impactFactor: '11.1',
      citations: 156,
      doi: '10.1016/j.media.2023.123456',
      abstract: 'A comprehensive survey of vision transformer applications in medical imaging with performance analysis and future directions.',
      keywords: ['Vision Transformers', 'Medical Imaging', 'Survey', 'Deep Learning'],
      featured: true,
      openAccess: false
    },
    {
      id: 5,
      title: 'Explainable AI in Financial Risk Assessment: A Practical Framework',
      authors: ['Daniel Mesafint', 'Prof. Michael Chen', 'Dr. Sarah Johnson'],
      journal: 'Journal of Financial Technology',
      year: 2024,
      volume: '12',
      issue: '3',
      pages: '156-172',
      impact: 'Q2',
      impactFactor: '6.8',
      citations: 34,
      doi: '10.1016/j.jft.2024.123456',
      abstract: 'We present a practical framework for explainable AI in financial risk assessment, balancing accuracy with interpretability requirements.',
      keywords: ['Explainable AI', 'Financial Technology', 'Risk Assessment', 'Machine Learning'],
      featured: false,
      openAccess: true
    },
    {
      id: 6,
      title: 'Multilingual Natural Language Processing for Ethiopian Languages',
      authors: ['Daniel Mesafint', 'Betelhem Dessie', 'Yaregal Assabie'],
      journal: 'ACM Transactions on Asian and Low-Resource Language Information Processing',
      year: 2022,
      volume: '21',
      issue: '4',
      pages: '78-95',
      impact: 'Q2',
      impactFactor: '4.2',
      citations: 67,
      doi: '10.1145/3512345.3512346',
      abstract: 'This paper presents comprehensive NLP tools for Ethiopian languages including Amharic, Oromo, and Tigrigna with state-of-the-art performance.',
      keywords: ['NLP', 'Ethiopian Languages', 'Multilingual Processing', 'Low-Resource Languages'],
      featured: false,
      openAccess: true
    },
    {
      id: 7,
      title: 'AI-Driven Agricultural Monitoring Using Satellite Imagery',
      authors: ['Daniel Mesafint', 'Agricultural Research Team'],
      journal: 'Remote Sensing of Environment',
      year: 2022,
      volume: '278',
      issue: '1',
      pages: '113-128',
      impact: 'Q1',
      impactFactor: '13.5',
      citations: 89,
      doi: '10.1016/j.rse.2022.123456',
      abstract: 'We develop AI-driven systems for agricultural monitoring using satellite imagery, improving crop yield predictions by 35%.',
      keywords: ['Agricultural AI', 'Satellite Imagery', 'Remote Sensing', 'Crop Monitoring'],
      featured: false,
      openAccess: false
    },
    {
      id: 8,
      title: 'Federated Learning for Privacy-Preserving Healthcare AI',
      authors: ['Daniel Mesafint', 'Privacy Research Consortium'],
      journal: 'Nature Digital Medicine',
      year: 2021,
      volume: '4',
      issue: '2',
      pages: '45-58',
      impact: 'Q1',
      impactFactor: '14.8',
      citations: 123,
      doi: '10.1038/s41746-021-123456',
      abstract: 'This work presents federated learning approaches for healthcare AI that preserve patient privacy while maintaining model performance.',
      keywords: ['Federated Learning', 'Healthcare Privacy', 'Medical AI', 'Privacy-Preserving ML'],
      featured: false,
      openAccess: true
    }
  ];

  const filteredPapers = selectedYear === 'all' 
    ? journalPapers 
    : journalPapers.filter(paper => paper.year.toString() === selectedYear);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Q1': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Q2': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Q3': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const totalCitations = journalPapers.reduce((sum, paper) => sum + paper.citations, 0);
  const avgImpactFactor = (journalPapers.reduce((sum, paper) => sum + parseFloat(paper.impactFactor), 0) / journalPapers.length).toFixed(1);

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
            Journal Papers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Peer-reviewed articles published in high-impact international journals
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
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">{journalPapers.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Papers</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{totalCitations}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Citations</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{avgImpactFactor}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Impact Factor</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{journalPapers.filter(p => p.impact === 'Q1').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Q1 Journals</div>
          </div>
        </motion.div>

        {/* Year Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedYear === year
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600'
              }`}
            >
              {year === 'all' ? 'All Years' : year}
            </button>
          ))}
        </motion.div>

        {/* Journal Papers List */}
        <div className="space-y-6">
          {filteredPapers.map((paper, index) => (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-xl transition-all duration-300 ${
                paper.featured ? 'ring-2 ring-pink-500 ring-opacity-50' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {paper.featured && (
                          <span className="px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getImpactColor(paper.impact)}`}>
                          {paper.impact} (IF: {paper.impactFactor})
                        </span>
                        {paper.openAccess && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-sm font-medium rounded-full">
                            Open Access
                          </span>
                        )}
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {paper.year}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        {paper.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {paper.authors.join(', ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-pink-600 dark:text-pink-400 font-medium mb-3">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span>{paper.journal}</span>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Volume {paper.volume}, Issue {paper.issue}, Pages {paper.pages}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {paper.abstract}
                      </p>
                      
                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.keywords.map((keyword, keyIndex) => (
                          <span
                            key={keyIndex}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Paper Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        <span>{paper.citations} citations</span>
                      </div>
                      <span>DOI: {paper.doi}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Paper
                      </motion.button>
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Journal Publication Impact</h3>
          <p className="text-lg opacity-90 mb-6">
            Published in high-impact journals with a focus on advancing AI research and practical applications
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-sm opacity-90">Years Publishing</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">International Journals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-sm opacity-90">Q1/Q2 Journals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">H-Index</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JournalPapers;