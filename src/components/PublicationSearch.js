import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Users, Award, FileText } from 'lucide-react';

const PublicationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const publications = [
    {
      id: 1,
      type: 'journal',
      title: 'EfficientNet_ConvNeXt for Facial Expression Recognition in Healthcare AI',
      authors: ['Daniel Mesafint', 'Sarah Johnson', 'Michael Chen'],
      venue: 'IEEE Transactions on Medical Imaging',
      year: 2025,
      citations: 45,
      keywords: ['Computer Vision', 'Healthcare AI', 'Deep Learning']
    },
    {
      id: 2,
      type: 'conference',
      title: 'Explainable AI in Medical Diagnosis: Bridging the Gap Between Accuracy and Interpretability',
      authors: ['Daniel Mesafint', 'Prof. Michael Chen', 'Dr. Sarah Johnson'],
      venue: 'International Conference on Computer Vision (ICCV)',
      year: 2024,
      citations: 34,
      keywords: ['Explainable AI', 'Medical Diagnosis', 'Interpretability']
    },
    {
      id: 3,
      type: 'book',
      title: 'Vision-Language Transformers: Architectures and Applications',
      authors: ['Daniel Mesafint'],
      venue: 'Advances in Multimodal AI Systems (Springer Nature)',
      year: 2024,
      citations: 23,
      keywords: ['Vision-Language Models', 'Transformers', 'Multimodal AI']
    }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchQuery === '' || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    
    return matchesSearch && matchesType && matchesYear;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'conference': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'book': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
            Publication Search
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Search and filter through all publications
          </p>
        </motion.div>

        {/* Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Publication Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="journal">Journal Papers</option>
                <option value="conference">Conference Papers</option>
                <option value="book">Book Chapters</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Search Results */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search Results ({filteredPublications.length} publications)
          </h3>
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPublications.map((publication, index) => (
            <motion.article
              key={publication.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FileText size={16} className="text-blue-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(publication.type)}`}>
                      {publication.type.charAt(0).toUpperCase() + publication.type.slice(1)}
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {publication.year}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {publication.title}
                  </h4>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{publication.authors.join(', ')}</span>
                  </div>
                  
                  <div className="text-pink-600 dark:text-pink-400 font-medium mb-2 text-sm">
                    {publication.venue}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {publication.keywords.map((keyword, keyIndex) => (
                      <span
                        key={keyIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{publication.citations} citations</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No publications found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search query or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationSearch;