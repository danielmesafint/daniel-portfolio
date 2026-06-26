import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Globe, 
  Users, 
  Building, 
  Award, 
  MapPin,
  ExternalLink,
  Calendar,
  BookOpen
} from 'lucide-react';

const ResearchCollaborations = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Collaborations' },
    { id: 'academic', name: 'Academic' },
    { id: 'industry', name: 'Industry' },
    { id: 'international', name: 'International' },
    { id: 'healthcare', name: 'Healthcare' }
  ];

  const collaborations = [
    {
      id: 1,
      name: 'Stanford University',
      department: 'Computer Science Department',
      location: 'Stanford, CA, USA',
      category: 'international',
      type: 'Academic Partnership',
      since: '2022',
      status: 'Active',
      description: 'Collaborative research on Vision-Language Transformers and multimodal AI systems.',
      projects: [
        'Adversarial Robustness in VL Models',
        'Cross-modal Attention Mechanisms',
        'Multimodal Learning Frameworks'
      ],
      outcomes: [
        '8 joint publications',
        '2 PhD student exchanges',
        '$150K joint funding secured',
        '3 workshop presentations'
      ],
      keyContacts: [
        'Prof. Fei-Fei Li - Director, Stanford AI Lab',
        'Dr. Christopher Manning - NLP Group Lead'
      ],
      color: 'from-red-500 to-red-600',
      logo: '🏛️'
    },
    {
      id: 2,
      name: 'MIT CSAIL',
      department: 'Computer Science & Artificial Intelligence Laboratory',
      location: 'Cambridge, MA, USA',
      category: 'international',
      type: 'Research Collaboration',
      since: '2023',
      status: 'Active',
      description: 'Joint research on explainable AI and interpretable machine learning systems.',
      projects: [
        'Explainable AI for Healthcare',
        'Interpretable Deep Learning',
        'AI Ethics and Fairness'
      ],
      outcomes: [
        '5 joint publications',
        '1 joint grant proposal',
        'Shared research infrastructure',
        '2 international conferences'
      ],
      keyContacts: [
        'Prof. Regina Barzilay - NLP Research',
        'Dr. Tommi Jaakkola - ML Theory'
      ],
      color: 'from-blue-500 to-blue-600',
      logo: '🔬'
    },
    {
      id: 3,
      name: 'Google Research',
      department: 'AI Research Division',
      location: 'Mountain View, CA, USA',
      category: 'industry',
      type: 'Industry Partnership',
      since: '2022',
      status: 'Active',
      description: 'Collaboration on large language models and multilingual NLP for African languages.',
      projects: [
        'Multilingual LLM Development',
        'Low-Resource Language Processing',
        'Cross-lingual Transfer Learning'
      ],
      outcomes: [
        '3 open-source models released',
        '$180K research funding',
        '10M+ downloads of models',
        '6 research publications'
      ],
      keyContacts: [
        'Dr. Jakob Uszkoreit - Research Scientist',
        'Dr. Melvin Johnson - Multilingual NLP Lead'
      ],
      color: 'from-green-500 to-green-600',
      logo: '🔍'
    },
    {
      id: 4,
      name: 'Black Lion Hospital',
      department: 'Medical AI Research Unit',
      location: 'Addis Ababa, Ethiopia',
      category: 'healthcare',
      type: 'Healthcare Partnership',
      since: '2021',
      status: 'Active',
      description: 'Developing AI-powered diagnostic tools for medical imaging and patient care.',
      projects: [
        'Medical Image Analysis',
        'Diagnostic Decision Support',
        'Patient Outcome Prediction'
      ],
      outcomes: [
        'AI system deployed in 5 departments',
        '94% diagnostic accuracy achieved',
        '50+ healthcare professionals trained',
        '3 clinical validation studies'
      ],
      keyContacts: [
        'Dr. Alemayehu Bekele - Chief Medical Officer',
        'Dr. Hanna Amanuel - Radiology Department Head'
      ],
      color: 'from-red-500 to-pink-500',
      logo: '🏥'
    },
    {
      id: 5,
      name: 'University of Oxford',
      department: 'Department of Computer Science',
      location: 'Oxford, UK',
      category: 'international',
      type: 'Academic Collaboration',
      since: '2020',
      status: 'Active',
      description: 'Research collaboration on natural language processing and computational linguistics.',
      projects: [
        'Cross-lingual NLP Systems',
        'Computational Linguistics Research',
        'Language Model Evaluation'
      ],
      outcomes: [
        '7 joint research papers',
        '1 PhD co-supervision',
        'Shared research datasets',
        '4 conference presentations'
      ],
      keyContacts: [
        'Prof. Phil Blunsom - NLP Research Group',
        'Dr. Yarin Gal - Machine Learning Group'
      ],
      color: 'from-purple-500 to-purple-600',
      logo: '🎓'
    },
    {
      id: 6,
      name: 'Ethiopian AI Institute',
      department: 'Research & Development Division',
      location: 'Addis Ababa, Ethiopia',
      category: 'academic',
      type: 'National Partnership',
      since: '2019',
      status: 'Active',
      description: 'Leading national AI research initiatives and policy development.',
      projects: [
        'National AI Strategy Development',
        'AI Ethics Guidelines',
        'Local Language AI Tools'
      ],
      outcomes: [
        'National AI policy framework',
        '15+ research collaborations',
        '$500K government funding',
        '20+ trained researchers'
      ],
      keyContacts: [
        'Dr. Betelhem Dessie - Director',
        'Prof. Yaregal Assabie - Research Lead'
      ],
      color: 'from-yellow-500 to-orange-500',
      logo: '🇪🇹'
    },
    {
      id: 7,
      name: 'Microsoft Research',
      department: 'AI for Good Lab',
      location: 'Redmond, WA, USA',
      category: 'industry',
      type: 'Industry Research',
      since: '2023',
      status: 'Active',
      description: 'Collaborative research on AI applications for social good and sustainable development.',
      projects: [
        'AI for Sustainable Agriculture',
        'Educational Technology Solutions',
        'Healthcare Access Improvement'
      ],
      outcomes: [
        '2 pilot deployments',
        '$150K research grant',
        '3 technical reports',
        '1 patent application'
      ],
      keyContacts: [
        'Dr. John Langford - Principal Researcher',
        'Dr. Eric Horvitz - Chief Scientific Officer'
      ],
      color: 'from-blue-500 to-cyan-500',
      logo: '💻'
    },
    {
      id: 8,
      name: 'Carnegie Mellon University',
      department: 'Language Technologies Institute',
      location: 'Pittsburgh, PA, USA',
      category: 'international',
      type: 'Academic Partnership',
      since: '2023',
      status: 'Planning',
      description: 'Emerging collaboration on multilingual AI and cross-cultural NLP systems.',
      projects: [
        'Cross-cultural AI Systems',
        'Multilingual Dialogue Systems',
        'Cultural Bias in AI Models'
      ],
      outcomes: [
        'MOU signed',
        'Joint proposal submitted',
        'Research visit planned',
        'Collaboration framework established'
      ],
      keyContacts: [
        'Prof. Graham Neubig - Multilingual NLP',
        'Dr. Alan Black - Speech Technologies'
      ],
      color: 'from-indigo-500 to-purple-500',
      logo: '🤖'
    }
  ];

  const filteredCollaborations = activeCategory === 'all' 
    ? collaborations 
    : collaborations.filter(collab => collab.category === activeCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
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
            {t('researchCollaborations.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('researchCollaborations.subtitle')}
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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Collaborations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCollaborations.map((collab, index) => (
            <motion.div
              key={collab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${collab.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{collab.logo}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {collab.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{collab.department}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(collab.status)}`}>
                    {collab.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {collab.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Since {collab.since}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {collab.type}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {collab.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Active Projects</h4>
                    <ul className="space-y-1">
                      {collab.projects.slice(0, 2).map((project, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{project}</span>
                        </li>
                      ))}
                      {collab.projects.length > 2 && (
                        <li className="text-xs text-pink-500 font-medium">
                          +{collab.projects.length - 2} more projects
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Key Outcomes</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {collab.outcomes.slice(0, 2).map((outcome, idx) => (
                        <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded p-2">
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Global Research Network</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-sm opacity-90">Active Collaborations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Joint Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$1M+</div>
              <div className="text-sm opacity-90">Joint Funding</div>
            </div>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-lg opacity-90">
              Building bridges across continents to advance AI research and create meaningful impact 
              through collaborative innovation and knowledge sharing.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always looking for opportunities to collaborate on cutting-edge AI research. 
            Whether you're a researcher, industry partner, or student, let's explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Get In Touch
            </button>
            <button
              onClick={() => document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View Publications
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchCollaborations;