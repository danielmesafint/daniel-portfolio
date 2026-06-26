import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      position: 'Research Director',
      company: 'Stanford AI Lab',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'Dr. Daniel\'s expertise in Vision-Language Transformers is exceptional. His research contributions have significantly advanced our understanding of multimodal AI systems. A brilliant researcher and collaborator.',
      project: 'Multimodal AI Research Collaboration'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      position: 'Department Head',
      company: 'MIT Computer Science',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'Working with Dr. Daniel on our healthcare AI project was transformative. His deep understanding of explainable AI and practical implementation skills delivered results beyond our expectations.',
      project: 'Healthcare AI Implementation'
    },
    {
      id: 3,
      name: 'Dr. Amara Okafor',
      position: 'Senior Data Scientist',
      company: 'Google Research',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'Dr. Daniel\'s teaching methodology is outstanding. His ability to explain complex AI concepts clearly and provide hands-on guidance has been invaluable for our team\'s professional development.',
      project: 'AI Training Program'
    },
    {
      id: 4,
      name: 'James Rodriguez',
      position: 'CTO',
      company: 'TechInnovate Solutions',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The AI solutions Dr. Daniel developed for our company increased our efficiency by 300%. His technical expertise combined with business acumen makes him an invaluable consultant.',
      project: 'Enterprise AI Solutions'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            What Clients Say
          </h2>
          <h3 className="text-2xl font-semibold text-pink-500 dark:text-pink-400 mb-4">
            Testimonials
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Testimonials from research collaborators, industry partners, and academic peers who have worked with me on various projects
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-pink-500 opacity-50" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {testimonials[currentIndex].image ? (
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].position}
                    </p>
                    <p className="text-pink-600 dark:text-pink-400 font-medium">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Project: {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-pink-500'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid Preview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => goToTestimonial(index)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                "{testimonial.text.substring(0, 120)}..."
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;