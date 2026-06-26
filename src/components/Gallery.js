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
      src: '/api/placeholder/400/300',
      title: 'Keynote at International AI Conference 2024',
      category: 'conferences',
      date: '2024-10-15',
      location: 'San Francisco, CA',
      description: 'Delivering keynote presentation on Vision-Language Transformers at the International AI Conference.',
      attendees: '500+ researchers'
    },
    {
      id: 2,
      src: '/api/placeholder/400/300',
      title: 'Research Lab Team Meeting',
      category: 'research',
      date: '2024-09-20',
      location: 'Debre Tabor University',
      description: 'Weekly research team meeting discussing progress on healthcare AI projects.',
      attendees: '12 team members'
    },
    {
      id: 3,
      src: '/api/placeholder/400/300',
      title: 'Best Paper Award Ceremony',
      category: 'awards',
      date: '2024-08-10',
      location: 'Oxford, UK',
      description: 'Receiving the Best Paper Award at the International Conference on Computer Vision.',
      attendees: '300+ attendees'
    },
    {
      id: 4,
      src: '/api/placeholder/400/300',
      title: 'Graduate Student Supervision',
      category: 'teaching',
      date: '2024-07-25',
      location: 'University Campus',
      description: 'One-on-one supervision session with PhD student working on explainable AI.',
      attendees: 'Individual session'
    },
    {
      id: 5,
      src: '/api/placeholder/400/300',
      title: 'Collaboration with Stanford AI Lab',
      category: 'collaborations',
      date: '2024-06-30',
      location: 'Stanford University',
      description: 'Research collaboration meeting with Stanford AI Lab team on multimodal learning.',
      attendees: '8 researchers'
    },
    {
      id: 6,
      src: '/api/placeholder/400/300',
      title: 'Deep Learning Workshop',
      category: 'teaching',
      date: '2024-06-15',
      location: 'Conference Center',
      description: 'Conducting hands-on deep learning workshop for industry professionals.',
      attendees: '50+ participants'
    },
    {
      id: 7,
      src: '/api/placeholder/400/300',
      title: 'Research Presentation at MIT',
      category: 'research',
      date: '2024-05-20',
      location: 'MIT, Cambridge',
      description: 'Presenting latest research findings on adversarial robustness in neural networks.',
      attendees: '75+ researchers'
    },
    {
      id: 8,
      src: '/api/placeholder/400/300',
      title: 'Excellence in Teaching Award',
      category: 'awards',
      date: '2024-04-10',
      location: 'University Auditorium',
      description: 'Receiving the Excellence in Teaching Award for outstanding contribution to education.',
      attendees: '200+ faculty'
    },
    {
      id: 9,
      src: '/api/placeholder/400/300',
      title: 'International Research Collaboration',
      category: 'collaborations',
      date: '2024-03-15',
      location: 'Virtual Meeting',
      description: 'Virtual collaboration meeting with international research partners from 5 countries.',
      attendees: '15+ researchers'
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
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
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
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                        <span>{new Date(selectedImage.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>

                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                        <span>{selectedImage.location}</span>
                      </div>

                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Users className="w-5 h-5 mr-3 text-pink-500" />
                        <span>{selectedImage.attendees}</span>
                      </div>

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