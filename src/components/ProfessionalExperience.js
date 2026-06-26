import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  MapPin, 
  Building, 
  Award, 
  Users, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Zap
} from 'lucide-react';

const ProfessionalExperience = () => {
  const { t } = useTranslation();
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Positions', icon: Briefcase },
    { id: 'academic', name: 'Academic', icon: GraduationCap },
    { id: 'research', name: 'Research', icon: Zap },
    { id: 'industry', name: 'Industry', icon: Building }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Assistant Professor & Technology Transfer Coordinator',
      company: 'Debre Tabor University',
      location: 'Debre Tabor, Ethiopia',
      period: '2020 - Present',
      duration: '4+ years',
      type: 'academic',
      status: 'Current',
      description: 'Leading AI research initiatives, teaching advanced courses, and coordinating technology transfer programs between academia and industry.',
      responsibilities: [
        'Conduct cutting-edge research in Vision-Language Transformers',
        'Teach graduate and undergraduate AI/ML courses',
        'Supervise MSc and PhD students in AI research',
        'Coordinate technology transfer initiatives',
        'Collaborate with international research institutions',
        'Secure research funding and grants'
      ],
      achievements: [
        'Published 25+ peer-reviewed papers in top-tier venues',
        'Supervised 20+ graduate students to completion',
        'Received Best Teacher Award 2023',
        'Secured $500K+ in research funding',
        'Established AI Research Lab with 15+ researchers',
        'Led 8 major research projects'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Research Methods'],
      impact: {
        students: '20+',
        papers: '25+',
        funding: '$500K+',
        projects: '8'
      },
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Senior AI Researcher',
      company: 'Ethiopian AI Research Institute',
      location: 'Addis Ababa, Ethiopia',
      period: '2018 - 2020',
      duration: '2 years',
      type: 'research',
      status: 'Completed',
      description: 'Conducted advanced research in Vision-Language Transformers and Explainable AI with focus on healthcare applications.',
      responsibilities: [
        'Lead research team of 8 AI researchers',
        'Develop novel Vision-Language Transformer architectures',
        'Collaborate with healthcare institutions on AI applications',
        'Publish research findings in international conferences',
        'Mentor junior researchers and PhD students',
        'Present research at international conferences'
      ],
      achievements: [
        'Developed breakthrough VL-Transformer architecture',
        'Published 12 papers in IEEE, Elsevier, and Springer',
        'Won Best Paper Award at ICCV 2019',
        'Established partnerships with Stanford and MIT',
        'Led team that secured $300K research grant',
        'Keynote speaker at 5 international conferences'
      ],
      technologies: ['Deep Learning', 'Computer Vision', 'NLP', 'Healthcare AI', 'Research Leadership'],
      impact: {
        team: '8',
        papers: '12',
        awards: '3',
        partnerships: '5'
      },
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      company: 'TechSolutions Africa',
      location: 'Nairobi, Kenya',
      period: '2016 - 2018',
      duration: '2 years',
      type: 'industry',
      status: 'Completed',
      description: 'Developed and deployed scalable ML solutions for healthcare and finance sectors across East Africa.',
      responsibilities: [
        'Design and implement ML pipelines for production',
        'Lead cross-functional team of engineers and data scientists',
        'Optimize model performance and deployment strategies',
        'Collaborate with product teams on AI feature development',
        'Establish MLOps practices and infrastructure',
        'Mentor junior engineers and interns'
      ],
      achievements: [
        'Built ML systems serving 1M+ users daily',
        'Reduced model inference time by 60%',
        'Led engineering team of 12 professionals',
        'Implemented company-wide MLOps framework',
        'Increased model accuracy by 25% across products',
        'Delivered 15+ ML-powered features to production'
      ],
      technologies: ['Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'MLOps', 'Microservices'],
      impact: {
        users: '1M+',
        team: '12',
        features: '15+',
        performance: '60%'
      },
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const filteredExperiences = activeFilter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'research': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'industry': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
            {t('professionalExperience.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('professionalExperience.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600'
                }`}
              >
                <IconComponent size={16} />
                <span>{filter.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredExperiences.map((exp, index) => {
              const isExpanded = expandedItem === exp.id;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpanded(exp.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(exp.type)}`}>
                            {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            exp.status === 'Current' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {exp.status}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Building size={14} />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{exp.period} ({exp.duration})</span>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {exp.description}
                        </p>

                        {/* Impact Metrics */}
                        <div className="flex flex-wrap gap-4">
                          {Object.entries(exp.impact).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-pink-500">{value}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="ml-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
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
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Responsibilities */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Briefcase size={18} />
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {exp.responsibilities.map((responsibility, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{responsibility}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Achievements */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Award size={18} />
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                              <TrendingUp size={18} />
                              Technologies & Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Career Impact Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Team Members Led</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$800K+</div>
              <div className="text-sm opacity-90">Funding Secured</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-sm opacity-90">Users Impacted</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;