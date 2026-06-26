import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  DollarSign, 
  Calendar, 
  Building, 
  Award, 
  TrendingUp,
  Users,
  Target,
  CheckCircle
} from 'lucide-react';

const ResearchFunding = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('grants');

  const tabs = [
    { id: 'grants', name: 'Research Grants', icon: DollarSign },
    { id: 'awards', name: 'Awards & Prizes', icon: Award },
    { id: 'statistics', name: 'Funding Statistics', icon: TrendingUp }
  ];

  const grants = [
    {
      id: 1,
      title: 'AI for Healthcare Innovation Grant',
      funder: 'National Science Foundation Ethiopia',
      amount: '$250,000',
      period: '2023-2025',
      status: 'Active',
      role: 'Principal Investigator',
      description: 'Developing AI-powered diagnostic tools for resource-limited healthcare settings in Ethiopia.',
      objectives: [
        'Create robust medical image analysis algorithms',
        'Deploy systems in rural healthcare facilities',
        'Train healthcare workers on AI tools',
        'Evaluate clinical impact and cost-effectiveness'
      ],
      outcomes: [
        'Deployed in 5 healthcare facilities',
        'Trained 50+ healthcare professionals',
        'Achieved 94% diagnostic accuracy',
        'Published 3 peer-reviewed papers'
      ],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Multilingual NLP Research Initiative',
      funder: 'Google Research Africa',
      amount: '$180,000',
      period: '2022-2024',
      status: 'Active',
      role: 'Co-Principal Investigator',
      description: 'Building comprehensive natural language processing tools for Ethiopian languages.',
      objectives: [
        'Develop large-scale language corpora',
        'Train transformer-based language models',
        'Create NLP tools and APIs',
        'Open-source language resources'
      ],
      outcomes: [
        'Released 3 language models',
        'Created 10M+ sentence corpus',
        'Achieved SOTA benchmark results',
        'Garnered 1000+ GitHub stars'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Agricultural AI Innovation Fund',
      funder: 'Bill & Melinda Gates Foundation',
      amount: '$320,000',
      period: '2021-2023',
      status: 'Completed',
      role: 'Principal Investigator',
      description: 'Developing AI solutions for smallholder farmers in Sub-Saharan Africa.',
      objectives: [
        'Create crop monitoring systems',
        'Develop yield prediction models',
        'Build farmer advisory platform',
        'Scale across multiple countries'
      ],
      outcomes: [
        'Served 1000+ farmers',
        'Improved yields by 35%',
        'Expanded to 5 countries',
        'Won Innovation Award 2023'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Explainable AI for Financial Inclusion',
      funder: 'World Bank Digital Development Partnership',
      amount: '$200,000',
      period: '2023-2025',
      status: 'Active',
      role: 'Principal Investigator',
      description: 'Creating transparent AI systems for credit scoring and financial risk assessment.',
      objectives: [
        'Develop interpretable ML models',
        'Ensure regulatory compliance',
        'Create explanation interfaces',
        'Validate with partner banks'
      ],
      outcomes: [
        'Completed stakeholder analysis',
        'Developed prototype systems',
        'Filed 2 patent applications',
        'Established bank partnerships'
      ],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 5,
      title: 'AI Security and Robustness Research',
      funder: 'Microsoft Research AI for Good',
      amount: '$150,000',
      period: '2024-2026',
      status: 'Planning',
      role: 'Principal Investigator',
      description: 'Investigating adversarial robustness and security in deep learning systems.',
      objectives: [
        'Develop novel defense mechanisms',
        'Create robustness evaluation tools',
        'Study real-world attack scenarios',
        'Publish in top-tier venues'
      ],
      outcomes: [
        'Secured funding approval',
        'Assembled research team',
        'Established collaborations',
        'Completed initial planning'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const awards = [
    {
      id: 1,
      title: 'Best Innovation Award 2023',
      organization: 'African AI Conference',
      amount: '$10,000',
      year: '2023',
      category: 'Agricultural Technology',
      description: 'Recognized for outstanding innovation in AI applications for agriculture.'
    },
    {
      id: 2,
      title: 'Young Researcher Excellence Award',
      organization: 'Ethiopian Academy of Sciences',
      amount: '$5,000',
      year: '2022',
      category: 'Computer Science',
      description: 'Awarded for exceptional research contributions in artificial intelligence.'
    },
    {
      id: 3,
      title: 'Google Research Scholar Award',
      organization: 'Google Research',
      amount: '$25,000',
      year: '2023',
      category: 'Machine Learning',
      description: 'Supporting research in multilingual natural language processing.'
    },
    {
      id: 4,
      title: 'IEEE Outstanding Paper Award',
      organization: 'IEEE Computer Society',
      amount: '$3,000',
      year: '2022',
      category: 'Computer Vision',
      description: 'Best paper award for research on vision-language transformers.'
    }
  ];

  const statistics = {
    totalFunding: '$1,380,000',
    activeGrants: 3,
    completedGrants: 2,
    totalAwards: 4,
    averageGrantSize: '$220,000',
    successRate: '85%',
    fundingByYear: [
      { year: '2021', amount: 320000 },
      { year: '2022', amount: 180000 },
      { year: '2023', amount: 460000 },
      { year: '2024', amount: 200000 },
      { year: '2025', amount: 220000 }
    ],
    fundingBySource: [
      { source: 'Government', percentage: 35, amount: 483000 },
      { source: 'Private Foundation', percentage: 40, amount: 552000 },
      { source: 'Industry', percentage: 25, amount: 345000 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const renderGrants = () => (
    <div className="space-y-6">
      {grants.map((grant, index) => (
        <motion.div
          key={grant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className={`h-1 bg-gradient-to-r ${grant.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
          
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {grant.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Building size={14} />
                      {grant.funder}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {grant.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(grant.status)}`}>
                      {grant.status}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{grant.role}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-pink-500">{grant.amount}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Award</div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{grant.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objectives</h4>
                  <ul className="space-y-1">
                    {grant.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Target size={12} className="text-pink-500 mt-1 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Outcomes</h4>
                  <ul className="space-y-1">
                    {grant.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle size={12} className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderAwards = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {awards.map((award, index) => (
        <motion.div
          key={award.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{award.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{award.organization}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-yellow-500">{award.amount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{award.year}</div>
            </div>
          </div>
          
          <div className="mb-3">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
              {award.category}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm">{award.description}</p>
        </motion.div>
      ))}
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Funding', value: statistics.totalFunding, icon: DollarSign, color: 'text-green-500' },
          { label: 'Active Grants', value: statistics.activeGrants, icon: TrendingUp, color: 'text-blue-500' },
          { label: 'Completed Grants', value: statistics.completedGrants, icon: CheckCircle, color: 'text-purple-500' },
          { label: 'Total Awards', value: statistics.totalAwards, icon: Award, color: 'text-yellow-500' },
          { label: 'Avg Grant Size', value: statistics.averageGrantSize, icon: Target, color: 'text-pink-500' },
          { label: 'Success Rate', value: statistics.successRate, icon: TrendingUp, color: 'text-orange-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg"
          >
            <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Funding by Source */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Funding by Source</h3>
        <div className="space-y-4">
          {statistics.fundingBySource.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">{source.source}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16 text-right">
                  ${(source.amount / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Funding Impact</h3>
        <p className="text-lg opacity-90 mb-6">
          Over the past 5 years, our research has been supported by {statistics.totalFunding} in funding, 
          enabling groundbreaking discoveries and real-world applications of AI technology.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">5</div>
            <div className="text-sm opacity-90">Years Active</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">8</div>
            <div className="text-sm opacity-90">Funding Sources</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-sm opacity-90">Projects Funded</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-90">Team Members Supported</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

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
            {t('researchFunding.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('researchFunding.subtitle')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-800 text-pink-500 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'grants' && renderGrants()}
          {activeTab === 'awards' && renderAwards()}
          {activeTab === 'statistics' && renderStatistics()}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchFunding;