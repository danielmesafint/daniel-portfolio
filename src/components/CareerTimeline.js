import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  MapPin, 
  Award, 
  GraduationCap, 
  Briefcase, 
  BookOpen,
  Users,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CareerTimeline = () => {
  const { t } = useTranslation();
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'career', name: 'Career', icon: Briefcase },
    { id: 'research', name: 'Research', icon: BookOpen },
    { id: 'awards', name: 'Awards', icon: Award }
  ];

  const timelineEvents = [
    {
      id: 1,
      year: '2024',
      date: 'January 2024',
      category: 'career',
      title: 'Assistant Professor',
      organization: 'Debre Tabor University',
      location: 'Ethiopia',
      type: 'Current Position',
      description: 'Leading AI research initiatives and teaching advanced machine learning courses.',
      achievements: [
        'Established AI Research Lab',
        'Supervised 15+ graduate students',
        'Published 8 research papers',
        'Secured $50K research funding'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      year: '2023',
      date: 'December 2023',
      category: 'awards',
      title: 'Best Paper Award',
      organization: 'International Conference on Computer Vision',
      location: 'Oxford, UK',
      type: 'Recognition',
      description: 'Received Best Paper Award for research on Vision-Language Transformers.',
      achievements: [
        'Top 1% of submitted papers',
        'Keynote presentation opportunity',
        'Media coverage in AI journals',
        'Industry collaboration offers'
      ],
      technologies: ['Vision Transformers', 'Multimodal AI', 'Deep Learning'],
      icon: Award,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 3,
      year: '2023',
      date: 'September 2023',
      category: 'research',
      title: 'Research Collaboration',
      organization: 'Stanford AI Lab',
      location: 'California, USA',
      type: 'Partnership',
      description: 'Initiated collaborative research project on adversarial robustness in neural networks.',
      achievements: [
        'Joint research proposal approved',
        '3 collaborative publications',
        'Student exchange program',
        'Shared research infrastructure'
      ],
      technologies: ['Adversarial ML', 'Robustness Testing', 'Neural Networks'],
      icon: Globe,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      year: '2022',
      date: 'June 2022',
      category: 'education',
      title: 'PhD in Computer Science',
      organization: 'University of Technology',
      location: 'Ethiopia',
      type: 'Degree',
      description: 'Completed doctoral studies with dissertation on "Explainable AI for Healthcare Applications".',
      achievements: [
        'Summa Cum Laude graduation',
        'Dissertation defense score: 95%',
        'Published 12 papers during PhD',
        'Teaching Excellence Award'
      ],
      technologies: ['Explainable AI', 'Healthcare AI', 'Machine Learning', 'Data Science'],
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      year: '2021',
      date: 'March 2021',
      category: 'research',
      title: 'Research Intern',
      organization: 'Google Research',
      location: 'Remote',
      type: 'Internship',
      description: 'Worked on large-scale machine learning systems and model optimization.',
      achievements: [
        'Contributed to TensorFlow ecosystem',
        'Optimized model inference by 30%',
        'Mentored by senior researchers',
        'Full-time offer extended'
      ],
      technologies: ['TensorFlow', 'Model Optimization', 'Distributed Systems', 'MLOps'],
      icon: Briefcase,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      year: '2020',
      date: 'August 2020',
      category: 'awards',
      title: 'Outstanding Research Award',
      organization: 'Ethiopian AI Society',
      location: 'Addis Ababa, Ethiopia',
      type: 'Recognition',
      description: 'Recognized for contributions to AI research in healthcare and education.',
      achievements: [
        'Youngest recipient in society history',
        '$10K research grant awarded',
        'Featured in national media',
        'Invited to policy advisory board'
      ],
      technologies: ['Healthcare AI', 'Educational Technology', 'Policy Development'],
      icon: Award,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 7,
      year: '2019',
      date: 'January 2019',
      category: 'career',
      title: 'Research Assistant',
      organization: 'AI Research Institute',
      location: 'Ethiopia',
      type: 'First Position',
      description: 'Started career in AI research focusing on computer vision and natural language processing.',
      achievements: [
        'First research publication',
        'Developed novel CV algorithms',
        'Built research team connections',
        'Established research methodology'
      ],
      technologies: ['Computer Vision', 'NLP', 'Python', 'Research Methods'],
      icon: BookOpen,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 8,
      year: '2018',
      date: 'September 2018',
      category: 'education',
      title: 'MSc in Computer Science',
      organization: 'Addis Ababa University',
      location: 'Ethiopia',
      type: 'Degree',
      description: 'Completed master\'s degree with focus on artificial intelligence and machine learning.',
      achievements: [
        'First Class Honours',
        'Thesis on ML for agriculture',
        'Research publication in top venue',
        'Graduate teaching assistant'
      ],
      technologies: ['Machine Learning', 'Data Mining', 'Statistical Analysis', 'Research'],
      icon: GraduationCap,
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === activeCategory);

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
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
            {t('careerTimeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('careerTimeline.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <IconComponent size={16} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-600"></div>

          <div className="space-y-8">
            <AnimatePresence>
              {filteredEvents.map((event, index) => {
                const IconComponent = event.icon;
                const isExpanded = expandedItem === event.id;
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex items-start"
                  >
                    {/* Timeline Node */}
                    <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent size={24} className="text-white" />
                    </div>

                    {/* Content Card */}
                    <div className="ml-8 flex-1">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div 
                          className="p-6 cursor-pointer"
                          onClick={() => toggleExpanded(event.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {event.year}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  event.category === 'education' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                  event.category === 'career' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  event.category === 'research' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                }`}>
                                  {event.type}
                                </span>
                              </div>
                              
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {event.title}
                              </h3>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users size={14} />
                                  <span>{event.organization}</span>
                                </div>
                              </div>
                              
                              <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {event.description}
                              </p>
                            </div>
                            
                            <button className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-200 dark:border-gray-700"
                            >
                              <div className="p-6 space-y-6">
                                {/* Achievements */}
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Key Achievements
                                  </h4>
                                  <ul className="space-y-2">
                                    {event.achievements.map((achievement, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technologies */}
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Technologies & Skills
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {event.technologies.map((tech, idx) => (
                                      <span
                                        key={idx}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Years Experience', value: '5+', color: 'text-blue-500' },
            { label: 'Research Papers', value: '25+', color: 'text-green-500' },
            { label: 'Awards Won', value: '8', color: 'text-yellow-500' },
            { label: 'Projects Led', value: '15+', color: 'text-purple-500' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerTimeline;