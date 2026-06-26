import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Book, 
  ExternalLink, 
  Download, 
  Calendar, 
  Users, 
  Award,
  BookOpen,
  Edit
} from 'lucide-react';

const BookChapters = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Chapters' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'healthcare', name: 'Healthcare Technology' },
    { id: 'ethics', name: 'AI Ethics' },
    { id: 'education', name: 'Educational Technology' }
  ];

  const bookChapters = [
    {
      id: 1,
      title: 'Vision-Language Transformers: Architectures and Applications',
      authors: ['Daniel Mesafint'],
      bookTitle: 'Advances in Multimodal AI Systems',
      editors: ['Prof. Sarah Chen', 'Dr. Michael Rodriguez'],
      publisher: 'Springer Nature',
      year: 2024,
      chapter: '7',
      pages: '145-178',
      isbn: '978-3-031-12345-6',
      category: 'ai',
      citations: 23,
      doi: '10.1007/978-3-031-12345-6_7',
      abstract: 'This chapter provides a comprehensive overview of vision-language transformer architectures and their applications in various domains including healthcare, autonomous systems, and content generation.',
      keywords: ['Vision-Language Models', 'Transformers', 'Multimodal AI', 'Deep Learning'],
      featured: true,
      openAccess: false
    },
    {
      id: 2,
      title: 'AI Ethics in Healthcare: Principles and Practical Implementation',
      authors: ['Daniel Mesafint'],
      bookTitle: 'Ethical AI in Medical Practice',
      editors: ['Prof. Lisa Wang', 'Dr. Ahmed Hassan'],
      publisher: 'MIT Press',
      year: 2024,
      chapter: '12',
      pages: '289-315',
      isbn: '978-0-262-12345-7',
      category: 'ethics',
      citations: 18,
      doi: '10.7551/mitpress/12345.003.0012',
      abstract: 'This chapter explores the ethical considerations of AI implementation in healthcare settings, providing practical frameworks for responsible AI deployment in medical environments.',
      keywords: ['AI Ethics', 'Healthcare AI', 'Medical Ethics', 'Responsible AI'],
      featured: true,
      openAccess: true
    },
    {
      id: 3,
      title: 'Federated Learning for Privacy-Preserving Medical AI',
      authors: ['Daniel Mesafint', 'Privacy Research Consortium'],
      bookTitle: 'Privacy-Preserving Machine Learning in Healthcare',
      editors: ['Dr. Jennifer Liu', 'Prof. Robert Kim'],
      publisher: 'Academic Press (Elsevier)',
      year: 2023,
      chapter: '8',
      pages: '187-210',
      isbn: '978-0-12-812345-8',
      category: 'healthcare',
      citations: 34,
      doi: '10.1016/B978-0-12-812345-8.00008-7',
      abstract: 'This chapter presents federated learning approaches for medical AI that preserve patient privacy while enabling collaborative model training across healthcare institutions.',
      keywords: ['Federated Learning', 'Healthcare Privacy', 'Medical AI', 'Collaborative Learning'],
      featured: true,
      openAccess: false
    },
    {
      id: 4,
      title: 'Deep Learning in Medical Image Analysis: Current Trends and Future Directions',
      authors: ['Daniel Mesafint', 'Medical Imaging Consortium'],
      bookTitle: 'Handbook of Medical Image Computing and Computer Assisted Intervention',
      editors: ['Prof. Xiaoxiao Li', 'Dr. Qi Dou', 'Prof. Pheng-Ann Heng'],
      publisher: 'Academic Press',
      year: 2023,
      chapter: '15',
      pages: '345-372',
      isbn: '978-0-12-816176-0',
      category: 'healthcare',
      citations: 45,
      doi: '10.1016/B978-0-12-816176-0.00015-3',
      abstract: 'This chapter reviews current trends in deep learning for medical image analysis and discusses future research directions in the field.',
      keywords: ['Deep Learning', 'Medical Imaging', 'Computer Vision', 'Healthcare AI'],
      featured: false,
      openAccess: false
    },
    {
      id: 5,
      title: 'Explainable AI: Bridging the Gap Between Performance and Interpretability',
      authors: ['Daniel Mesafint', 'Explainable AI Research Group'],
      bookTitle: 'Interpretable Machine Learning for Healthcare',
      editors: ['Dr. Maria Garcia', 'Prof. David Thompson'],
      publisher: 'CRC Press',
      year: 2023,
      chapter: '6',
      pages: '123-148',
      isbn: '978-1-032-12345-9',
      category: 'ai',
      citations: 29,
      doi: '10.1201/9781032123459-6',
      abstract: 'This chapter discusses methods for creating explainable AI systems that maintain high performance while providing interpretable results for critical applications.',
      keywords: ['Explainable AI', 'Interpretability', 'Machine Learning', 'Transparency'],
      featured: false,
      openAccess: true
    },
    {
      id: 6,
      title: 'AI in Education: Personalized Learning and Adaptive Systems',
      authors: ['Daniel Mesafint', 'Educational Technology Team'],
      bookTitle: 'Technology-Enhanced Learning: Research and Practice',
      editors: ['Prof. Anna Johnson', 'Dr. Mark Wilson'],
      publisher: 'Springer',
      year: 2022,
      chapter: '11',
      pages: '245-268',
      isbn: '978-3-030-12345-0',
      category: 'education',
      citations: 37,
      doi: '10.1007/978-3-030-12345-0_11',
      abstract: 'This chapter explores AI applications in education, focusing on personalized learning systems and adaptive educational technologies.',
      keywords: ['Educational AI', 'Personalized Learning', 'Adaptive Systems', 'EdTech'],
      featured: false,
      openAccess: false
    },
    {
      id: 7,
      title: 'Multilingual NLP: Challenges and Solutions for Low-Resource Languages',
      authors: ['Daniel Mesafint', 'Ethiopian NLP Consortium'],
      bookTitle: 'Natural Language Processing for Multilingual Applications',
      editors: ['Prof. Yuki Tanaka', 'Dr. Carlos Rodriguez'],
      publisher: 'John Wiley & Sons',
      year: 2022,
      chapter: '9',
      pages: '201-225',
      isbn: '978-1-119-12345-1',
      category: 'ai',
      citations: 52,
      doi: '10.1002/9781119123451.ch9',
      abstract: 'This chapter addresses the challenges of NLP for low-resource languages and presents innovative solutions for multilingual language processing.',
      keywords: ['Multilingual NLP', 'Low-Resource Languages', 'Language Models', 'Cross-lingual Transfer'],
      featured: false,
      openAccess: true
    },
    {
      id: 8,
      title: 'Responsible AI Development: A Framework for Ethical Implementation',
      authors: ['Daniel Mesafint'],
      bookTitle: 'AI Governance and Ethics: Global Perspectives',
      editors: ['Prof. Elena Petrov', 'Dr. James Mitchell'],
      publisher: 'Oxford University Press',
      year: 2022,
      chapter: '4',
      pages: '78-102',
      isbn: '978-0-19-812345-2',
      category: 'ethics',
      citations: 41,
      doi: '10.1093/oso/9780198123452.003.0004',
      abstract: 'This chapter presents a comprehensive framework for responsible AI development, covering ethical principles, implementation strategies, and governance structures.',
      keywords: ['Responsible AI', 'AI Ethics', 'Governance', 'Implementation Framework'],
      featured: false,
      openAccess: false
    }
  ];

  const filteredChapters = selectedCategory === 'all' 
    ? bookChapters 
    : bookChapters.filter(chapter => chapter.category === selectedCategory);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ai': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'healthcare': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'ethics': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'education': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const totalCitations = bookChapters.reduce((sum, chapter) => sum + chapter.citations, 0);
  const totalPublishers = [...new Set(bookChapters.map(chapter => chapter.publisher))].length;

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
            Book Chapters
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Contributions to edited volumes and handbooks by leading academic publishers
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
            <div className="text-2xl font-bold text-pink-500">{bookChapters.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Chapters</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{totalCitations}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Citations</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{totalPublishers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Publishers</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{bookChapters.filter(c => c.featured).length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Featured Chapters</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Book Chapters List */}
        <div className="space-y-6">
          {filteredChapters.map((chapter, index) => (
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-xl transition-all duration-300 ${
                chapter.featured ? 'ring-2 ring-pink-500 ring-opacity-50' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {chapter.featured && (
                          <span className="px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(chapter.category)}`}>
                          {categories.find(c => c.id === chapter.category)?.name}
                        </span>
                        {chapter.openAccess && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-sm font-medium rounded-full">
                            Open Access
                          </span>
                        )}
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {chapter.year}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        {chapter.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {chapter.authors.join(', ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-pink-600 dark:text-pink-400 font-medium mb-2">
                        <Book className="w-4 h-4 mr-2" />
                        <span>{chapter.bookTitle}</span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <Edit className="w-4 h-4 mr-2" />
                        <span className="text-sm">Edited by: {chapter.editors.join(', ')}</span>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="font-medium">{chapter.publisher}</span> • 
                        Chapter {chapter.chapter} • Pages {chapter.pages} • 
                        ISBN: {chapter.isbn}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {chapter.abstract}
                      </p>
                      
                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {chapter.keywords.map((keyword, keyIndex) => (
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
                  
                  {/* Chapter Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        <span>{chapter.citations} citations</span>
                      </div>
                      <span>DOI: {chapter.doi}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Chapter
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

        {/* Publishing Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Book Chapter Publishing Impact</h3>
          <p className="text-lg opacity-90 mb-6">
            Contributing to authoritative handbooks and edited volumes by leading academic publishers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm opacity-90">Years Contributing</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-sm opacity-90">Major Publishers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-sm opacity-90">Research Areas</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Pages Authored</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookChapters;