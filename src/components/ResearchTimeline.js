import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  Target,
  TrendingUp,
  Lightbulb,
  Globe
} from 'lucide-react';

const ResearchTimeline = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(null);

  const timelineEvents = [
    {
      year: '2019',
      title: 'Research Journey Begins',
      subtitle: 'Foundation in AI Research',
      description: 'Started PhD research in Computer Science with focus on artificial intelligence and machine learning.',
      achievements: [
        'Enrolled in PhD program at University of Technology',
        'Joined AI Research Lab as graduate student',
        'Published first research paper on NLP',
        'Established research methodology and focus areas'
      ],
      publications: 2,
      collaborations: 1,
      funding: '$15K',
      icon: Lightbulb,
      color: 'from-blue-500 to-cyan-500',
      category: 'Foundation'
    },
    {
      year: '2020',
      title: 'Natural Language Processing Focus',
      subtitle: 'Ethiopian Languages Research',
      description: 'Deep dive into NLP research with specific focus on Ethiopian languages and low-resource language processing.',
      achievements: [
        'Developed first Amharic language model',
        'Created large-scale Amharic text corpus',
        'Established collaboration with Ethiopian AI Institute',
        'Won Young Researcher Award'
      ],
      publications: 4,
      collaborations: 2,
      funding: '$25K',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      category: 'Specialization'
    },
    {
      year: '2021',
      title: 'Computer Vision Integration',
      subtitle: 'Multimodal AI Systems',
      description: 'Expanded research scope to include computer vision and began work on multimodal AI systems.',
      achievements: [
        'Launched agricultural AI project with Gates Foundation',
        'Developed vision-language models for crop monitoring',
        'Established partnership with Stanford University',
        'Published breakthrough paper on multimodal learning'
      ],
      publications: 6,
      collaborations: 4,
      funding: '$320K',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      category: 'Expansion'
    },
    {
      year: '2022',
      title: 'Vision-Language Transformers',
      subtitle: 'Advanced Multimodal Research',
      description: 'Focused research on transformer-based vision-language architectures and their applications.',
      achievements: [
        'Completed PhD with distinction',
        'Joined Debre Tabor University as Assistant Professor',
        'Secured Google Research collaboration',
        'Established AI Research Lab'
      ],
      publications: 8,
      collaborations: 6,
      funding: '$180K',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      category: 'Achievement'
    },
    {
      year: '2023',
      title: 'Healthcare AI & Security',
      subtitle: 'Applied AI Research',
      description: 'Expanded into healthcare AI applications and began research on adversarial robustness and AI security.',
      achievements: [
        'Launched healthcare AI platform project',
        'Established MIT CSAIL collaboration',
        'Won Best Innovation Award',
        'Secured multiple research grants'
      ],
      publications: 12,
      collaborations: 8,
      funding: '$450K',
      icon: TrendingUp,
      color: 'from-red-500 to-pink-500',
      category: 'Innovation'
    },
    {
      year: '2024',
      title: 'Explainable AI & Ethics',
      subtitle: 'Responsible AI Development',
      description: 'Current focus on interpretable and ethical AI systems, with emphasis on transparency and fairness.',
      achievements: [
        'Appointed as Chair of AI Ethics Committee',
        'Launched explainable AI for finance project',
        'Established Carnegie Mellon collaboration',
        'Leading national AI policy development'
      ],
      publications: 10,
      collaborations: 10,
      funding: '$200K',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      category: 'Leadership'
    },
    {
      year: '2025',
      title: 'Future Directions',
      subtitle: 'Next Generation AI',
      description: 'Planned research directions focusing on next-generation AI systems and global impact.',
      achievements: [
        'Planning large-scale multilingual AI project',
        'Developing AI for sustainable development goals',
        'Expanding international collaborations',
        'Mentoring next generation of AI researchers'
      ],
      publications: 8,
      collaborations: 12,
      funding: '$500K',
      icon: Globe,
      color: 'from-cyan-500 to-blue-500',
      category: 'Future'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Years' },
    { id: 'Foundation', name: 'Foundation' },
    { id: 'Specialization', name: 'Specialization' },
    { id: 'Expansion', name: 'Expansion' },
    { id: 'Achievement', name: 'Achievement' },
    { id: 'Innovation', name: 'Innovation' },
    { id: 'Leadership', name: 'Leadership' },
    { id: 'Future', name: 'Future' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = activeCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === activeCategory);

  const totalStats = timelineEvents.reduce((acc, event) => ({
    publications: acc.publications + event.publications,
    collaborations: acc.collaborations + event.collaborations,
    funding: acc.funding + parseInt(event.funding.replace(/[$K]/g, '')) * 1000
  }), { publications: 0, collaborations: 0, funding: 0 });

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
            {t('researchTimeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('researchTimeline.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-600 hidden md:block"></div>

          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isExpanded = selectedYear === event.year;
              
              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start"
                >
                  {/* Timeline Node */}
                  <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg hidden md:flex`}>
                    <IconComponent size={24} className="text-white" />
                  </div>

                  {/* Content Card - Compressed */}
                  <div className="md:ml-6 flex-1">
                    <div 
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => setSelectedYear(isExpanded ? null : event.year)}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            {/* Mobile Year Display */}
                            <div className="flex items-center gap-2 mb-2 md:hidden">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center flex-shrink-0`}>
                                <IconComponent size={14} className="text-white" />
                              </div>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {event.year}
                              </span>
                            </div>
                            
                            {/* Desktop Year Display */}
                            <div className="hidden md:block mb-2">
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {event.year}
                              </span>
                            </div>
                            
                            {/* Title and Subtitle - Compressed */}
                            <div className="mb-2">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                {event.title}
                              </h3>
                              <p className="text-pink-500 font-medium text-sm">{event.subtitle}</p>
                            </div>
                            
                            {/* Description - Compressed */}
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                              {event.description}
                            </p>

                            {/* Stats - Compressed Layout */}
                            <div className="flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="font-semibold text-blue-500">{event.publications}</span>
                                <span className="text-gray-500">papers</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-semibold text-green-500">{event.collaborations}</span>
                                <span className="text-gray-500">collabs</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="font-semibold text-purple-500">{event.funding}</span>
                                <span className="text-gray-500">funding</span>
                              </div>
                            </div>
                          </div>
                          
                          <button className="ml-3 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0">
                            <span className="text-sm font-bold">{isExpanded ? '−' : '+'}</span>
                          </button>
                        </div>

                        {/* Expanded Content - Compressed */}
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"
                          >
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                              Key Achievements
                            </h4>
                            <ul className="space-y-1">
                              {event.achievements.slice(0, 3).map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                  <span className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                              {event.achievements.length > 3 && (
                                <li className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                                  +{event.achievements.length - 3} more achievements
                                </li>
                              )}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Research Journey Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">7</div>
              <div className="text-sm opacity-90">Years of Research</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{totalStats.publications}</div>
              <div className="text-sm opacity-90">Total Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{totalStats.collaborations}</div>
              <div className="text-sm opacity-90">Collaborations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">${(totalStats.funding / 1000000).toFixed(1)}M</div>
              <div className="text-sm opacity-90">Total Funding</div>
            </div>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-lg opacity-90">
              From foundational research to global impact, this journey represents a commitment to 
              advancing AI technology for the benefit of society and sustainable development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchTimeline;