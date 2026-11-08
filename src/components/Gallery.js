import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ZoomIn, Calendar, MapPin, Users, Award } from 'lucide-react';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'conferences', name: 'Conferences' },
    { id: 'research', name: 'Research' },
    { id: 'teaching', name: 'Teaching' },
    { id: 'awards', name: 'Awards' },
    { id: 'collaborations', name: 'Collaborations' }
  ];

  const galleryItems = [
    {
      id: 1,
      src: '/profile_photo.jpg',
      title: 'Portrait',
      category: 'research',
      date: '',
      location: 'Debre Tabor, Ethiopia',
      description: 'Professional portrait.',
      attendees: ''
    },
    {
      id: 2,
      src: '/all_project_images/vision_language_transformer.jpg',
      title: 'Vision-Language Transformer Research',
      category: 'research',
      date: '',
      location: 'Debre Tabor University',
      description: 'Visual summary of ongoing vision-language transformer research.',
      attendees: ''
    },
    {
      id: 3,
      src: '/all_research_images/agri_resilience.jpg',
      title: 'AI for Agricultural Resilience',
      category: 'research',
      date: '',
      location: 'Ethiopia',
      description: 'Applying machine learning to agriculture and food security.',
      attendees: ''
    },
    {
      id: 4,
      src: '/all_research_images/climate_smart_irrigation.jpg',
      title: 'Climate-Smart Irrigation',
      category: 'research',
      date: '',
      location: 'Ethiopia',
      description: 'Data-driven approaches to irrigation planning.',
      attendees: ''
    },
    {
      id: 5,
      src: '/all_research_images/research_methodology_in-datascience.jpg',
      title: 'Research Methodology in Data Science',
      category: 'teaching',
      date: '',
      location: 'Debre Tabor University',
      description: 'Teaching material on research methods for data science students.',
      attendees: ''
    },
    {
      id: 6,
      src: '/all_research_images/building_scalable_ml_pipelines.jpg',
      title: 'Building Scalable ML Pipelines',
      category: 'teaching',
      date: '',
      location: 'Debre Tabor University',
      description: 'Course and workshop content on production ML pipelines.',
      attendees: ''
    },
    {
      id: 7,
      src: '/all_research_images/the_future_ai_healthcare.jpg',
      title: 'The Future of AI in Healthcare',
      category: 'conferences',
      date: '',
      location: 'Talk',
      description: 'Talk on the role of explainable AI in healthcare.',
      attendees: ''
    },
    {
      id: 8,
      src: '/all_project_images/ethiopian_nlp.jpg',
      title: 'NLP for Ethiopian Languages',
      category: 'collaborations',
      date: '',
      location: 'Collaborative project',
      description: 'Natural language processing for Amharic and other Ethiopian languages.',
      attendees: ''
    },
    {
      id: 9,
      src: '/daniel-profile-latest.png',
      title: 'Profile',
      category: 'awards',
      date: '',
      location: 'Debre Tabor, Ethiopia',
      description: 'Profile photo.',
      attendees: ''
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A visual journey through my academic and professional experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openModal(item)}
              >
                <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.date ? (
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  ) : (
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{item.location}</span>
                  </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedImage.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedImage.description}
                    </p>

                    <div className="space-y-3">
                      {selectedImage.date && (<div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                        <span>{new Date(selectedImage.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>)}

                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                        <span>{selectedImage.location}</span>
                      </div>

                      {selectedImage.attendees && (<div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Users className="w-5 h-5 mr-3 text-pink-500" />
                        <span>{selectedImage.attendees}</span>
                      </div>)}

                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Award className="w-5 h-5 mr-3 text-pink-500" />
                        <span className="capitalize">{selectedImage.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;