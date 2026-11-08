import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Upload, 
  Database, 
  Shield, 
  Presentation, 
  Sheet, 
  FileText, 
  BookOpen, 
  Code, 
  Lock, 
  Camera, 
  Search,
  Filter,
  Eye,
  ExternalLink
} from 'lucide-react';
import { openEmail } from '../utils/contactLinks';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('course-materials');

  // Register this component with the global navigation system
  useEffect(() => {
    console.log('Resources: Registering with global navigation system');
    window.resourcesNavigation = window.resourcesNavigation || {};
    window.resourcesNavigation.setActiveTab = setActiveTab;
    
    // Check for stored tab preference
    const storedTab = localStorage.getItem('resourcesTab');
    if (storedTab && ['course-materials', 'assignments', 'lab-materials', 'thesis-templates', 'article-templates', 'datasets', 'ai-code', 'student-uploads', 'ethics', 'blog', 'gallery', 'downloads'].includes(storedTab)) {
      setActiveTab(storedTab);
      localStorage.removeItem('resourcesTab');
    }

    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      const tabMap = {
        '#resources-course-materials': 'course-materials',
        '#resources-assignments': 'assignments',
        '#resources-lab-materials': 'lab-materials',
        '#resources-thesis-templates': 'thesis-templates',
        '#resources-article-templates': 'article-templates',
        '#resources-datasets': 'datasets',
        '#resources-ai-code': 'ai-code',
        '#resources-student-uploads': 'student-uploads',
        '#resources-ethics': 'ethics',
        '#resources-blog': 'blog',
        '#resources-gallery': 'gallery',
        '#resources-downloads': 'downloads'
      };
      
      if (tabMap[hash]) {
        setActiveTab(tabMap[hash]);
        setActiveCategory(tabMap[hash]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Add section IDs for proper navigation
  const resourceSections = {
    'course-materials': 'resources-course-materials',
    'assignments': 'resources-assignments', 
    'lab-materials': 'resources-lab-materials',
    'thesis-templates': 'resources-thesis-templates',
    'article-templates': 'resources-article-templates',
    'datasets': 'resources-datasets',
    'ai-code': 'resources-ai-code',
    'student-uploads': 'resources-student-uploads',
    'ethics': 'resources-ethics',
    'blog': 'resources-blog',
    'gallery': 'resources-gallery',
    'downloads': 'resources-downloads'
  };

  const resourceCategories = [
    { id: 'all', name: 'All Resources', icon: Database, count: 156 },
    { id: 'course-materials', name: 'Course Materials', icon: Presentation, count: 45 },
    { id: 'assignments', name: 'Assignments', icon: Lock, count: 23 },
    { id: 'lab-materials', name: 'Lab Materials', icon: Sheet, count: 18 },
    { id: 'thesis-templates', name: 'Thesis Templates', icon: FileText, count: 12 },
    { id: 'article-templates', name: 'Article Templates', icon: BookOpen, count: 8 },
    { id: 'datasets', name: 'Datasets', icon: Database, count: 15 },
    { id: 'ai-code', name: 'AI Project Code', icon: Code, count: 22 },
    { id: 'student-uploads', name: 'Student Uploads', icon: Upload, count: 34 },
    { id: 'ethics', name: 'Ethics Documents', icon: Shield, count: 7 },
    { id: 'blog', name: 'Blog & Articles', icon: BookOpen, count: 12 },
    { id: 'gallery', name: 'Media Gallery', icon: Camera, count: 8 },
    { id: 'downloads', name: 'Downloads & Tools', icon: Download, count: 15 }
  ];

  const sampleResources = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals - Lecture Slides',
      category: 'course-materials',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 245,
      date: '2024-01-15',
      description: 'Comprehensive slides covering ML basics, algorithms, and applications.',
      access: 'public'
    },
    {
      id: 2,
      title: 'Assignment 1: Linear Regression Implementation',
      category: 'assignments',
      type: 'ZIP',
      size: '1.2 MB',
      downloads: 89,
      date: '2024-01-20',
      description: 'Programming assignment with starter code and dataset.',
      access: 'private'
    },
    {
      id: 3,
      title: 'Neural Networks Lab Exercise',
      category: 'lab-materials',
      type: 'Jupyter Notebook',
      size: '856 KB',
      downloads: 156,
      date: '2024-01-18',
      description: 'Hands-on lab for building and training neural networks.',
      access: 'public'
    },
    {
      id: 4,
      title: 'PhD Thesis Template - Computer Science',
      category: 'thesis-templates',
      type: 'LaTeX',
      size: '324 KB',
      downloads: 78,
      date: '2024-01-10',
      description: 'Standard thesis template following university guidelines.',
      access: 'public'
    },
    {
      id: 5,
      title: 'Ethiopian Languages Dataset',
      category: 'datasets',
      type: 'CSV/JSON',
      size: '45.2 MB',
      downloads: 67,
      date: '2024-01-08',
      description: 'Multilingual dataset for NLP research in Ethiopian languages.',
      access: 'public'
    },
    {
      id: 6,
      title: 'Sentiment Analysis AI Model',
      category: 'ai-code',
      type: 'Python',
      size: '3.1 MB',
      downloads: 134,
      date: '2024-01-22',
      description: 'Complete implementation of sentiment analysis using transformers.',
      access: 'public'
    }
  ];

  const filteredResources = sampleResources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIconForCategory = (category) => {
    const categoryData = resourceCategories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : FileText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Academic <span className="text-blue-400">Resources</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive collection of educational materials, research resources, and academic tools 
            for students, researchers, and faculty members.
          </p>
        </div>

        {/* Individual Resource Sections for Navigation */}
        <div id="resources-course-materials" className="mb-8"></div>
        <div id="resources-assignments" className="mb-8"></div>
        <div id="resources-lab-materials" className="mb-8"></div>
        <div id="resources-thesis-templates" className="mb-8"></div>
        <div id="resources-article-templates" className="mb-8"></div>
        <div id="resources-datasets" className="mb-8"></div>
        <div id="resources-ai-code" className="mb-8"></div>
        <div id="resources-student-uploads" className="mb-8"></div>
        <div id="resources-ethics" className="mb-8"></div>
        <div id="resources-blog" className="mb-8"></div>
        <div id="resources-gallery" className="mb-8"></div>
        <div id="resources-downloads" className="mb-8"></div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <span className="text-gray-400 text-sm">Filter by:</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Similar to Services */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {['course-materials', 'assignments', 'lab-materials', 'thesis-templates', 'article-templates', 'datasets', 'ai-code', 'student-uploads', 'ethics', 'blog', 'gallery', 'downloads'].map((tab) => {
              const category = resourceCategories.find(cat => cat.id === tab);
              const Icon = category ? category.icon : FileText;
              const tabName = category ? category.name : tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setActiveCategory(tab);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white hover:scale-102'
                  }`}
                >
                  <Icon size={20} />
                  {tabName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Individual Resource Sections with Tab Content */}
        <div id="resources-course-materials" className={activeTab !== 'course-materials' ? 'hidden' : ''} data-tab="course-materials">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📊 Course Materials (PDF, slides)</h3>
            <p className="text-gray-400 mb-6">Lecture slides, course PDFs, and educational materials for various subjects.</p>
          </div>
        </div>

        <div id="resources-assignments" className={activeTab !== 'assignments' ? 'hidden' : ''} data-tab="assignments">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🔒 Assignments (private access)</h3>
            <p className="text-gray-400 mb-6">Secure access to assignment materials and submission guidelines.</p>
          </div>
        </div>

        <div id="resources-lab-materials" className={activeTab !== 'lab-materials' ? 'hidden' : ''} data-tab="lab-materials">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📋 Lab Materials</h3>
            <p className="text-gray-400 mb-6">Laboratory guides, exercises, and hands-on learning materials.</p>
          </div>
        </div>

        <div id="resources-thesis-templates" className={activeTab !== 'thesis-templates' ? 'hidden' : ''} data-tab="thesis-templates">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📄 Thesis Templates</h3>
            <p className="text-gray-400 mb-6">Professional thesis templates following academic standards.</p>
          </div>
        </div>

        <div id="resources-article-templates" className={activeTab !== 'article-templates' ? 'hidden' : ''} data-tab="article-templates">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📖 Article Templates</h3>
            <p className="text-gray-400 mb-6">Academic article and paper templates for various journals and conferences.</p>
          </div>
        </div>

        <div id="resources-datasets" className={activeTab !== 'datasets' ? 'hidden' : ''} data-tab="datasets">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🗄️ Datasets</h3>
            <p className="text-gray-400 mb-6">Research datasets and data files for analysis and machine learning projects.</p>
          </div>
        </div>

        <div id="resources-ai-code" className={activeTab !== 'ai-code' ? 'hidden' : ''} data-tab="ai-code">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">💻 AI Project Code</h3>
            <p className="text-gray-400 mb-6">Source code for AI and machine learning projects, algorithms, and implementations.</p>
          </div>
        </div>

        <div id="resources-student-uploads" className={activeTab !== 'student-uploads' ? 'hidden' : ''} data-tab="student-uploads">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📤 Student Uploads</h3>
            <p className="text-gray-400 mb-6">Student-contributed resources, projects, and academic materials.</p>
          </div>
        </div>

        <div id="resources-ethics" className={activeTab !== 'ethics' ? 'hidden' : ''} data-tab="ethics">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🛡️ Ethics Documents</h3>
            <p className="text-gray-400 mb-6">Research ethics guidelines, compliance documents, and ethical frameworks.</p>
          </div>
        </div>

        <div id="resources-blog" className={activeTab !== 'blog' ? 'hidden' : ''} data-tab="blog">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📚 Blog & Articles</h3>
            <p className="text-gray-400 mb-6">Academic blog posts, articles, and educational content.</p>
          </div>
        </div>

        <div id="resources-gallery" className={activeTab !== 'gallery' ? 'hidden' : ''} data-tab="gallery">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📷 Media Gallery</h3>
            <p className="text-gray-400 mb-6">Images, videos, and multimedia resources for educational purposes.</p>
          </div>
        </div>

        <div id="resources-downloads" className={activeTab !== 'downloads' ? 'hidden' : ''} data-tab="downloads">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">⬇️ Downloads & Tools</h3>
            <p className="text-gray-400 mb-6">Downloadable tools, software, and utilities for research and education.</p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => {
            const Icon = getIconForCategory(resource.category);
            return (
              <div
                key={resource.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Icon className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {resource.type}
                      </span>
                      {resource.access === 'private' && (
                        <Lock className="inline ml-2 text-yellow-400" size={12} />
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{resource.size}</span>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {resource.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{resource.downloads} downloads</span>
                  <span>{new Date(resource.date).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => (resource.url
                      ? window.open(resource.url, '_blank', 'noopener')
                      : openEmail(`Resource request: ${resource.title}`, `Hello Dr. Daniel,\n\nCould you please share the resource titled ${resource.title}?\n\nThank you.`))}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Download size={16} />
                    {resource.url ? 'Download' : 'Request by email'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Section */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <Upload className="mx-auto text-blue-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-4">Contribute Resources</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Share your research materials, code, datasets, or educational content with the academic community.
            </p>
            <button
              onClick={() => openEmail('Resource contribution', 'Hello Dr. Daniel,\n\nI would like to share a resource with you.\n\nTitle:\nLink:')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Share a resource by email
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">156</div>
            <div className="text-gray-400">Total Resources</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">2.4K</div>
            <div className="text-gray-400">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">89</div>
            <div className="text-gray-400">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">12</div>
            <div className="text-gray-400">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;