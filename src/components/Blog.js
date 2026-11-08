import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react';

const Blog = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "The Future of AI in Healthcare: Transforming Patient Care",
      excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnosis, treatment planning, and patient outcomes in modern healthcare systems.",
      content: "Artificial Intelligence is reshaping healthcare in unprecedented ways, offering transformative solutions that enhance diagnostic accuracy, streamline treatment protocols, and improve patient outcomes. From machine learning algorithms that can detect diseases earlier than traditional methods to AI-powered robotic surgery systems that provide unprecedented precision, the healthcare industry is experiencing a technological revolution.",
      author: "Dr. Daniel Mesafint",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "AI & Healthcare",
      tags: ["AI", "Healthcare", "Machine Learning", "Medical Technology"],
      image: "./all_research_images/the_future_ai_healthcare.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable Machine Learning Pipelines",
      excerpt: "A comprehensive guide to designing and implementing robust ML pipelines that can handle enterprise-scale data processing.",
      content: "Machine learning pipelines are the backbone of any successful ML project, providing the infrastructure needed to transform raw data into actionable insights. This comprehensive guide explores best practices for designing scalable, maintainable, and efficient ML pipelines that can handle enterprise-level data volumes while ensuring reproducibility and reliability.",
      author: "Dr. Daniel Mesafint",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Machine Learning",
      tags: ["ML", "Data Engineering", "Python", "MLOps"],
      image: "./all_research_images/building_scalable_ml_pipelines.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Research Methodology in Data Science",
      excerpt: "Best practices for conducting rigorous research in data science, from hypothesis formation to statistical validation.",
      content: "Effective research methodology is crucial for producing reliable insights in data science. This article covers essential principles of scientific research applied to data science projects, including proper experimental design, statistical validation techniques, and reproducible research practices that ensure the integrity and reliability of your findings.",
      author: "Dr. Daniel Mesafint",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Research",
      tags: ["Research", "Statistics", "Data Science", "Methodology"],
      image: "./all_research_images/research_methodology_in-datascience.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Enhancing Sustainable Agricultural Practices through Climate-Smart Irrigation",
      excerpt: "Investigating innovative irrigation technologies and data-driven approaches to optimize water usage while maintaining crop productivity in the face of climate change.",
      content: "Climate change poses significant challenges to global agriculture, with water scarcity becoming an increasingly critical issue. This research explores cutting-edge climate-smart irrigation technologies that leverage IoT sensors, satellite imagery, and machine learning algorithms to optimize water usage while maintaining or improving crop yields. Our findings demonstrate how precision irrigation systems can reduce water consumption by up to 40% while increasing agricultural productivity.",
      author: "Dr. Daniel Mesafint",
      date: "2024-02-20",
      readTime: "15 min read",
      category: "Agricultural Technology",
      tags: ["Climate-Smart Agriculture", "Irrigation", "Sustainability", "IoT", "Water Management"],
      image: "./all_research_images/climate_smart_irrigation.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Enhancing Agricultural Resilience: A Machine Learning Framework for Accurate and Accessible Disease Detection in Potatoes and Rice",
      excerpt: "Developing advanced computer vision and machine learning models to enable early detection of crop diseases, improving food security and agricultural sustainability.",
      content: "Food security remains a global challenge, with crop diseases causing significant yield losses annually. This research presents a comprehensive machine learning framework that combines computer vision, deep learning, and mobile technology to provide farmers with accurate, real-time disease detection capabilities for potatoes and rice crops. Our system achieves 95% accuracy in disease identification and can operate on standard smartphones, making it accessible to farmers in developing regions.",
      author: "Dr. Daniel Mesafint",
      date: "2024-02-10",
      readTime: "18 min read",
      category: "Agricultural AI",
      tags: ["Machine Learning", "Computer Vision", "Crop Disease", "Food Security", "Mobile Technology"],
      image: "./all_research_images/agri_resilience.jpg",
      featured: true
    }
  ]);

  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'AI & Healthcare', 'Machine Learning', 'Research', 'Technology'];

  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchTerm, articles]);

  const ArticleCard = ({ article, index }) => (
    <article
      className="grido-card rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => setSelectedArticle(article)}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
            {article.category}
          </span>
        </div>
        {article.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  const ArticleModal = ({ article, onClose }) => (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  {article.category}
                </span>
                <h1 className="text-3xl font-bold mt-4 mb-2">{article.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6">{article.excerpt}</p>
              <div className="text-gray-300 leading-relaxed">
                {article.content}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
      </div>
    </div>
  );

  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black" style={{ paddingTop: '2px' }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-16"
          style={{ marginTop: '-40px' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text-animated bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {t('blog.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div
          className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('blog.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
};

export default Blog;