import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Trophy, 
  Star, 
  Users, 
  Globe,
  BookOpen,
  Target,
  Zap,
  ExternalLink
} from 'lucide-react';

const Awards = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const awards = [
    {
      id: 1,
      title: 'Excellence in AI Research Award',
      organization: 'Ethiopian Academy of Sciences',
      year: 2024,
      description: 'Recognition for outstanding contributions to artificial intelligence research in Ethiopia',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      title: 'Best Paper Award',
      organization: 'International Conference on AI in Africa',
      year: 2023,
      description: 'Awarded for the paper on "Vision-Language Transformers for Ethiopian Healthcare"',
      icon: Award,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 3,
      title: 'Outstanding Teaching Excellence',
      organization: 'Debre Tabor University',
      year: 2023,
      description: 'Recognition for innovative AI curriculum development and student mentorship',
      icon: Star,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      title: 'Young Researcher Grant',
      organization: 'African Union Commission',
      year: 2022,
      description: 'Competitive research grant for AI applications in African languages',
      icon: Target,
      color: 'from-pink-500 to-red-500'
    }
  ];

  const grants = [
    {
      id: 1,
      title: 'AI for Ethiopian Healthcare Initiative',
      funder: 'World Health Organization',
      amount: '$150,000',
      period: '2024-2026',
      status: 'Active',
      description: 'Developing AI-powered diagnostic tools for rural healthcare centers in Ethiopia'
    },
    {
      id: 2,
      title: 'Multilingual NLP Research Project',
      funder: 'Google AI for Social Good',
      amount: '$75,000',
      period: '2023-2024',
      status: 'Completed',
      description: 'Building NLP tools for Ethiopian languages with focus on Amharic and Oromo'
    },
    {
      id: 3,
      title: 'Vision-Language Model Robustness Study',
      funder: 'Microsoft Research Africa',
      amount: '$100,000',
      period: '2023-2025',
      status: 'Active',
      description: 'Investigating adversarial robustness in multimodal AI systems'
    }
  ];

  const collaborations = [
    {
      id: 1,
      organization: 'Stanford University',
      department: 'AI Lab',
      project: 'Cross-lingual Transfer Learning',
      logo: '/api/placeholder/80/80',
      status: 'Active'
    },
    {
      id: 2,
      organization: 'MIT',
      department: 'Computer Science and Artificial Intelligence Laboratory',
      project: 'Explainable AI for Healthcare',
      logo: '/api/placeholder/80/80',
      status: 'Active'
    },
    {
      id: 3,
      organization: 'University of Oxford',
      department: 'Department of Computer Science',
      project: 'Adversarial Machine Learning',
      logo: '/api/placeholder/80/80',
      status: 'Completed'
    },
    {
      id: 4,
      organization: 'Google Research',
      department: 'AI for Social Good',
      project: 'African Language Technologies',
      logo: '/api/placeholder/80/80',
      status: 'Active'
    }
  ];

  const journalRoles = [
    {
      journal: 'ACM Computing Surveys',
      role: 'Reviewer',
      since: '2022',
      papers: 15
    },
    {
      journal: 'BMJ Public Health',
      role: 'Reviewer',
      since: '2023',
      papers: 8
    },
    {
      journal: 'Journal of Big Data',
      role: 'Editorial Board Member',
      since: '2024',
      papers: 12
    },
    {
      journal: 'IEEE Transactions on AI',
      role: 'Reviewer',
      since: '2023',
      papers: 10
    }
  ];

  return (
    <section id="awards" className="pb-20 bg-neutral-800/50 relative" style={{ paddingTop: '16px' }}>
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#facc15' }}>
            {t('awards.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('awards.subtitle')}
          </p>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#fb923c' }}>
            Awards & Recognition
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="grido-card p-8 rounded-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${award.color} flex-shrink-0`}>
                    <award.icon size={32} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-semibold text-white">
                        {award.title}
                      </h4>
                      <span className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm font-semibold">
                        {award.year}
                      </span>
                    </div>
                    
                    <p className="text-accent-400 font-medium mb-3">
                      {award.organization}
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grants Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#f87171' }}>
            Research Grants
          </h3>
          
          <div className="space-y-6">
            {grants.map((grant, index) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="grido-card p-6 rounded-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-semibold text-white">
                        {grant.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        grant.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {grant.status}
                      </span>
                    </div>
                    
                    <p className="text-accent-400 font-medium mb-2">
                      {grant.funder}
                    </p>
                    
                    <p className="text-gray-300 mb-4">
                      {grant.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2 text-sm">
                    <div className="text-2xl font-bold text-accent-400">
                      {grant.amount}
                    </div>
                    <div className="text-gray-400">
                      {grant.period}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collaborations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#60a5fa' }}>
            Research Collaborations
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborations.map((collab, index) => (
              <motion.div
                key={collab.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="grido-card p-6 rounded-2xl text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe size={32} className="text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2">
                  {collab.organization}
                </h4>
                
                <p className="text-accent-400 text-sm mb-3">
                  {collab.department}
                </p>
                
                <p className="text-gray-300 text-sm mb-4">
                  {collab.project}
                </p>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  collab.status === 'Active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {collab.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-primary-600/20 to-grido-purple/20 p-8 rounded-3xl border border-primary-500/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always open to new research collaborations, partnerships, and opportunities 
            to advance AI research and education. Let's explore how we can work together 
            to make a meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-primary-500 to-grido-purple px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Start a Collaboration
            </motion.button>
            <motion.a
              href="/research-portfolio.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 border-2 border-primary-400 hover:bg-primary-400 px-8 py-3 rounded-xl text-primary-400 hover:text-white font-semibold transition-all duration-300"
            >
              <ExternalLink size={20} />
              <span>Research Portfolio</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;