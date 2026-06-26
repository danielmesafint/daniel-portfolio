import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  X, 
  Calendar, 
  Tag, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Users, 
  Award, 
  Video, 
  Image, 
  ExternalLink,
  Clock,
  TrendingUp,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
  Target,
  Eye
} from 'lucide-react';

const GlobalSearch = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    topic: 'all',
    dateRange: 'all',
    collaboration: 'all'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Comprehensive content database for search
  const contentDatabase = useMemo(() => [
    // Publications
    {
      id: 'pub-1',
      type: 'publication',
      title: 'Vision-Language Transformers for Agricultural Analysis',
      description: 'A comprehensive study on applying vision-language models to crop disease detection and yield prediction',
      content: 'This research explores the application of transformer architectures in agricultural computer vision tasks, focusing on multi-modal learning approaches that combine visual and textual information for enhanced crop monitoring and disease detection.',
      tags: ['Computer Vision', 'Transformers', 'Agriculture', 'Deep Learning', 'Multi-modal'],
      date: '2024-03-15',
      author: 'Dr. Daniel Mesafint',
      citations: 234,
      downloads: 1247,
      collaboration: 'Stanford University',
      url: '/publications#vision-language-transformers',
      category: 'Research Paper'
    },
    {
      id: 'pub-2',
      type: 'publication',
      title: 'Deep Learning in Precision Agriculture',
      description: 'Machine learning approaches for optimizing crop yield and resource management',
      content: 'This paper presents novel deep learning methodologies for precision agriculture, including convolutional neural networks for crop monitoring, recurrent networks for time-series prediction, and reinforcement learning for resource optimization.',
      tags: ['Deep Learning', 'Precision Agriculture', 'CNN', 'RNN', 'Optimization'],
      date: '2024-02-20',
      author: 'Dr. Daniel Mesafint',
      citations: 189,
      downloads: 987,
      collaboration: 'MIT AgriTech Lab',
      url: '/publications#deep-learning-agriculture',
      category: 'Journal Article'
    },
    // Projects
    {
      id: 'proj-1',
      type: 'project',
      title: 'Automated Crop Disease Detection System',
      description: 'AI-powered mobile application for real-time crop disease identification',
      content: 'Development of a mobile application that uses computer vision and machine learning to identify crop diseases in real-time. The system employs transfer learning with pre-trained models and custom datasets collected from Ethiopian farms.',
      tags: ['Mobile App', 'Disease Detection', 'Computer Vision', 'Transfer Learning', 'Ethiopia'],
      date: '2024-01-10',
      status: 'Active',
      collaboration: 'Ethiopian Agricultural Development Agency',
      url: '/projects#crop-disease-detection',
      category: 'Software Development',
      funding: '$150,000'
    },
    {
      id: 'proj-2',
      type: 'project',
      title: 'Smart Irrigation Management Platform',
      description: 'IoT-based system for optimizing water usage in agricultural settings',
      content: 'An integrated platform combining IoT sensors, weather data, and machine learning algorithms to optimize irrigation schedules and water usage. The system provides real-time monitoring and predictive analytics for farmers.',
      tags: ['IoT', 'Smart Agriculture', 'Water Management', 'Sensors', 'Predictive Analytics'],
      date: '2023-11-15',
      status: 'Completed',
      collaboration: 'Global Farming Innovations',
      url: '/projects#smart-irrigation',
      category: 'IoT Platform',
      funding: '$200,000'
    },
    // Blog Posts
    {
      id: 'blog-1',
      type: 'blog',
      title: 'The Future of AI in Ethiopian Agriculture',
      description: 'Exploring opportunities and challenges for AI adoption in developing countries',
      content: 'This article discusses the potential impact of artificial intelligence on agricultural practices in Ethiopia, addressing both the opportunities for increased productivity and the challenges of technology adoption in resource-constrained environments.',
      tags: ['AI', 'Ethiopia', 'Agricultural Development', 'Technology Adoption', 'Sustainability'],
      date: '2024-03-01',
      readTime: '8 min read',
      views: 2847,
      url: '/blog#future-ai-ethiopia',
      category: 'Opinion'
    },
    {
      id: 'blog-2',
      type: 'blog',
      title: 'Computer Vision Techniques for Crop Monitoring',
      description: 'Technical deep-dive into image processing methods for agricultural applications',
      content: 'A comprehensive guide to computer vision techniques used in agricultural monitoring, including image preprocessing, feature extraction, object detection, and semantic segmentation for crop analysis.',
      tags: ['Computer Vision', 'Image Processing', 'Crop Monitoring', 'Technical Tutorial'],
      date: '2024-02-15',
      readTime: '12 min read',
      views: 1923,
      url: '/blog#computer-vision-techniques',
      category: 'Technical'
    },
    // Media & Presentations
    {
      id: 'media-1',
      type: 'media',
      title: 'AgriTech Conference 2024 Keynote',
      description: 'Keynote presentation on Vision-Language Transformers in Agricultural AI',
      content: 'Comprehensive presentation covering the latest advances in vision-language models and their applications in agricultural settings, including live demonstrations and case studies.',
      tags: ['Keynote', 'Conference', 'Vision-Language Models', 'AI', 'Agriculture'],
      date: '2024-03-15',
      duration: '45 min',
      views: 12847,
      venue: 'Berlin, Germany',
      url: '/media-presentations#agritech-keynote',
      category: 'Conference Presentation'
    },
    // Events
    {
      id: 'event-1',
      type: 'event',
      title: 'International Conference on AI in Agriculture',
      description: 'Keynote presentation on Vision-Language Models for Crop Disease Detection',
      content: 'Major international conference bringing together researchers, practitioners, and industry leaders to discuss the latest advances in AI applications for agriculture.',
      tags: ['Conference', 'AI', 'Agriculture', 'International', 'Keynote'],
      date: '2024-04-15',
      location: 'Vienna, Austria',
      attendees: 500,
      url: '/events-calendar#ai-agriculture-conference',
      category: 'Conference'
    },
    // Research Areas
    {
      id: 'research-1',
      type: 'research',
      title: 'Computer Vision for Agricultural Monitoring',
      description: 'Advanced image processing and machine learning techniques for crop analysis',
      content: 'Research focus on developing novel computer vision algorithms for agricultural applications, including crop disease detection, yield prediction, and growth monitoring using satellite imagery and drone-based systems.',
      tags: ['Computer Vision', 'Agricultural Monitoring', 'Machine Learning', 'Remote Sensing'],
      date: '2024-01-01',
      publications: 15,
      citations: 847,
      url: '/research#computer-vision-agriculture',
      category: 'Research Area'
    }
  ], []);

  // Filter options
  const filterOptions = {
    type: [
      { value: 'all', label: 'All Content', icon: Search },
      { value: 'publication', label: 'Publications', icon: FileText },
      { value: 'project', label: 'Projects', icon: Briefcase },
      { value: 'blog', label: 'Blog Posts', icon: BookOpen },
      { value: 'media', label: 'Media & Presentations', icon: Video },
      { value: 'event', label: 'Events', icon: Calendar },
      { value: 'research', label: 'Research Areas', icon: Award }
    ],
    topic: [
      { value: 'all', label: 'All Topics' },
      { value: 'computer-vision', label: 'Computer Vision' },
      { value: 'machine-learning', label: 'Machine Learning' },
      { value: 'agriculture', label: 'Agriculture' },
      { value: 'ai', label: 'Artificial Intelligence' },
      { value: 'deep-learning', label: 'Deep Learning' },
      { value: 'iot', label: 'Internet of Things' },
      { value: 'sustainability', label: 'Sustainability' }
    ],
    dateRange: [
      { value: 'all', label: 'All Time' },
      { value: 'week', label: 'Past Week' },
      { value: 'month', label: 'Past Month' },
      { value: 'quarter', label: 'Past 3 Months' },
      { value: 'year', label: 'Past Year' }
    ],
    collaboration: [
      { value: 'all', label: 'All Collaborations' },
      { value: 'stanford', label: 'Stanford University' },
      { value: 'mit', label: 'MIT AgriTech Lab' },
      { value: 'ethiopia', label: 'Ethiopian Institutions' },
      { value: 'industry', label: 'Industry Partners' }
    ]
  };

  // AI-powered recommendations based on search query and user behavior
  const generateRecommendations = (query, results) => {
    if (!query || results.length === 0) return [];

    const queryWords = query.toLowerCase().split(' ');
    const relatedContent = contentDatabase.filter(item => {
      if (results.some(result => result.id === item.id)) return false;
      
      const itemText = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
      return queryWords.some(word => itemText.includes(word));
    });

    return relatedContent
      .sort((a, b) => {
        const aScore = queryWords.reduce((score, word) => {
          const itemText = `${a.title} ${a.description} ${a.tags.join(' ')}`.toLowerCase();
          return score + (itemText.split(word).length - 1);
        }, 0);
        const bScore = queryWords.reduce((score, word) => {
          const itemText = `${b.title} ${b.description} ${b.tags.join(' ')}`.toLowerCase();
          return score + (itemText.split(word).length - 1);
        }, 0);
        return bScore - aScore;
      })
      .slice(0, 3);
  };

  // Search function with smart filtering
  const performSearch = (query, filters) => {
    if (!query.trim() && filters.type === 'all' && filters.topic === 'all') {
      return [];
    }

    let results = contentDatabase;

    // Apply type filter
    if (filters.type !== 'all') {
      results = results.filter(item => item.type === filters.type);
    }

    // Apply topic filter
    if (filters.topic !== 'all') {
      results = results.filter(item => 
        item.tags.some(tag => 
          tag.toLowerCase().includes(filters.topic.replace('-', ' '))
        )
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      results = results.filter(item => new Date(item.date) >= filterDate);
    }

    // Apply collaboration filter
    if (filters.collaboration !== 'all') {
      results = results.filter(item => 
        item.collaboration && 
        item.collaboration.toLowerCase().includes(filters.collaboration)
      );
    }

    // Apply text search
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(item => {
        const searchableText = `${item.title} ${item.description} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });

      // Sort by relevance
      results = results.sort((a, b) => {
        const aText = `${a.title} ${a.description}`.toLowerCase();
        const bText = `${b.title} ${b.description}`.toLowerCase();
        const aScore = searchTerms.reduce((score, term) => {
          return score + (aText.split(term).length - 1) * 2 + (a.tags.join(' ').toLowerCase().split(term).length - 1);
        }, 0);
        const bScore = searchTerms.reduce((score, term) => {
          return score + (bText.split(term).length - 1) * 2 + (b.tags.join(' ').toLowerCase().split(term).length - 1);
        }, 0);
        return bScore - aScore;
      });
    }

    return results;
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery || Object.values(activeFilters).some(filter => filter !== 'all')) {
        setIsSearching(true);
        const results = performSearch(searchQuery, activeFilters);
        setSearchResults(results);
        setRecommendations(generateRecommendations(searchQuery, results));
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setRecommendations([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeFilters]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      type: 'all',
      topic: 'all',
      dateRange: 'all',
      collaboration: 'all'
    });
    setSearchQuery('');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'publication': return <FileText size={16} className="text-blue-400" />;
      case 'project': return <Briefcase size={16} className="text-green-400" />;
      case 'blog': return <BookOpen size={16} className="text-purple-400" />;
      case 'media': return <Video size={16} className="text-red-400" />;
      case 'event': return <Calendar size={16} className="text-yellow-400" />;
      case 'research': return <Award size={16} className="text-orange-400" />;
      default: return <FileText size={16} className="text-gray-400" />;
    }
  };

  const SearchResult = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grido-card p-6 hover:bg-gray-800/50 transition-colors cursor-pointer"
      onClick={() => window.location.href = item.url}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          {getTypeIcon(item.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs capitalize">
              {item.type}
            </span>
          </div>
          
          <p className="text-gray-300 mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags.slice(0, 4).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                {tag}
              </span>
            ))}
            {item.tags.length > 4 && (
              <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded text-xs">
                +{item.tags.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              {item.collaboration && (
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{item.collaboration}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {item.citations && (
                <div className="flex items-center space-x-1">
                  <Star size={14} />
                  <span>{item.citations} citations</span>
                </div>
              )}
              {item.views && (
                <div className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span>{item.views} views</span>
                </div>
              )}
              <ExternalLink size={14} className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const RecommendationCard = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grido-card p-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
      onClick={() => window.location.href = item.url}
    >
      <div className="flex items-center space-x-3 mb-2">
        {getTypeIcon(item.type)}
        <h4 className="font-medium text-white text-sm truncate">{item.title}</h4>
      </div>
      <p className="text-gray-400 text-xs line-clamp-2 mb-2">{item.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 capitalize">{item.type}</span>
        <ExternalLink size={12} className="text-blue-400" />
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="w-full max-w-4xl mx-4 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Search className="text-blue-400" size={24} />
                <h2 className="text-xl font-bold text-white">Global Search</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications, projects, blog posts, and more..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            
            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Filter size={16} />
                <span>Filters</span>
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {Object.values(activeFilters).some(filter => filter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {Object.entries(filterOptions).map(([filterType, options]) => (
                    <div key={filterType}>
                      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                        {filterType === 'dateRange' ? 'Date Range' : filterType}
                      </label>
                      <select
                        value={activeFilters[filterType]}
                        onChange={(e) => handleFilterChange(filterType, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"
                  />
                  <span className="text-gray-400">Searching...</span>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Search Results ({searchResults.length})
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <TrendingUp size={16} />
                    <span>Sorted by relevance</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {searchResults.map((item) => (
                    <SearchResult key={item.id} item={item} />
                  ))}
                </div>
                
                {/* AI Recommendations */}
                {recommendations.length > 0 && (
                  <div className="mt-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Brain className="text-purple-400" size={20} />
                      <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                        Smart
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recommendations.map((item) => (
                        <RecommendationCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : searchQuery || Object.values(activeFilters).some(filter => filter !== 'all') ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="text-gray-600 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500 text-center max-w-md">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Zap className="text-blue-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-white mb-2">Start searching</h3>
                <p className="text-gray-400 text-center max-w-md">
                  Search across publications, projects, blog posts, presentations, and more.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;