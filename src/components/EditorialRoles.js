import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  FileText, 
  Users, 
  Star,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';

const EditorialRoles = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('current');

  const tabs = [
    { id: 'current', name: 'Current Roles', icon: CheckCircle },
    { id: 'completed', name: 'Past Roles', icon: Clock },
    { id: 'statistics', name: 'Review Statistics', icon: TrendingUp }
  ];

  const currentRoles = [
    {
      id: 1,
      journal: 'Journal of Big Data',
      publisher: 'Springer Nature',
      role: 'Editorial Board Member',
      since: '2024',
      status: 'Active',
      impactFactor: '8.6',
      quartile: 'Q1',
      description: 'Responsible for reviewing manuscripts, providing editorial guidance, and contributing to journal policy decisions.',
      responsibilities: [
        'Review 2-3 manuscripts per month',
        'Provide detailed feedback to authors',
        'Participate in editorial board meetings',
        'Contribute to special issue planning',
        'Mentor junior reviewers'
      ],
      achievements: [
        'Reduced average review time by 25%',
        'Maintained 95% review completion rate',
        'Contributed to 2 special issues',
        'Mentored 5 junior reviewers'
      ],
      papersReviewed: 18,
      averageReviewTime: '14 days',
      acceptanceRate: '35%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      journal: 'ACM Computing Surveys',
      publisher: 'Association for Computing Machinery',
      role: 'Senior Reviewer',
      since: '2022',
      status: 'Active',
      impactFactor: '14.3',
      quartile: 'Q1',
      description: 'Senior reviewer for one of the most prestigious computer science survey journals.',
      responsibilities: [
        'Review complex survey manuscripts',
        'Provide comprehensive technical feedback',
        'Evaluate manuscript novelty and significance',
        'Assess survey completeness and accuracy',
        'Guide editorial decisions'
      ],
      achievements: [
        'Reviewed 25+ high-impact surveys',
        'Recognized as top 10% reviewer',
        'Contributed to reviewer guidelines',
        'Maintained excellent review quality'
      ],
      papersReviewed: 25,
      averageReviewTime: '21 days',
      acceptanceRate: '28%',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      journal: 'BMJ Public Health',
      publisher: 'BMJ Publishing Group',
      role: 'Reviewer',
      since: '2023',
      status: 'Active',
      impactFactor: '6.2',
      quartile: 'Q1',
      description: 'Reviewing manuscripts on AI applications in public health and healthcare systems.',
      responsibilities: [
        'Review healthcare AI manuscripts',
        'Evaluate clinical relevance',
        'Assess ethical considerations',
        'Provide methodological feedback',
        'Review statistical analyses'
      ],
      achievements: [
        'Specialized in AI for healthcare reviews',
        'Completed 12 reviews with high ratings',
        'Contributed to ethical guidelines',
        'Fast-track reviewer status'
      ],
      papersReviewed: 12,
      averageReviewTime: '10 days',
      acceptanceRate: '42%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      journal: 'IEEE Transactions on Artificial Intelligence',
      publisher: 'IEEE',
      role: 'Reviewer',
      since: '2023',
      status: 'Active',
      impactFactor: '9.4',
      quartile: 'Q1',
      description: 'Reviewing cutting-edge AI research with focus on vision-language models and explainable AI.',
      responsibilities: [
        'Review AI methodology papers',
        'Evaluate technical contributions',
        'Assess experimental validation',
        'Review reproducibility aspects',
        'Provide improvement suggestions'
      ],
      achievements: [
        'Expert reviewer for VL-Transformers',
        'Completed 15 reviews on time',
        'Recognized for thorough reviews',
        'Contributed to review standards'
      ],
      papersReviewed: 15,
      averageReviewTime: '18 days',
      acceptanceRate: '31%',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const pastRoles = [
    {
      id: 5,
      journal: 'Computers & Education',
      publisher: 'Elsevier',
      role: 'Reviewer',
      period: '2021 - 2023',
      status: 'Completed',
      impactFactor: '8.5',
      quartile: 'Q1',
      description: 'Reviewed manuscripts on educational technology and AI in education.',
      papersReviewed: 20,
      averageReviewTime: '16 days',
      achievements: [
        'Reviewed 20 educational AI papers',
        'Maintained 100% completion rate',
        'Received reviewer appreciation',
        'Contributed to special issue'
      ],
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 6,
      journal: 'Expert Systems with Applications',
      publisher: 'Elsevier',
      role: 'Reviewer',
      period: '2020 - 2022',
      status: 'Completed',
      impactFactor: '7.5',
      quartile: 'Q1',
      description: 'Reviewed applied AI and expert systems research papers.',
      papersReviewed: 28,
      averageReviewTime: '19 days',
      achievements: [
        'Reviewed 28 applied AI papers',
        'Top 5% reviewer recognition',
        'Excellent review quality rating',
        'Mentored new reviewers'
      ],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const reviewStatistics = {
    totalPapers: 118,
    totalJournals: 6,
    averageImpactFactor: '8.9',
    onTimeCompletion: '96%',
    averageReviewTime: '16 days',
    topReviewerAwards: 3,
    yearsActive: 4,
    specialIssues: 3
  };

  const renderCurrentRoles = () => (
    <div className="space-y-6">
      {currentRoles.map((role, index) => (
        <motion.div
          key={role.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Journal Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {role.journal}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Globe size={14} />
                      {role.publisher}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Since {role.since}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                      {role.role}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                      {role.status}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
                      IF: {role.impactFactor} ({role.quartile})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {role.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Responsibilities</h4>
                  <ul className="space-y-1">
                    {role.responsibilities.slice(0, 3).map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h4>
                  <ul className="space-y-1">
                    {role.achievements.slice(0, 3).map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">Review Statistics</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{role.papersReviewed}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Papers Reviewed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">{role.averageReviewTime}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avg Review Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500">{role.acceptanceRate}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Acceptance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPastRoles = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {pastRoles.map((role, index) => (
        <motion.div
          key={role.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {role.journal}
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm">
              {role.role}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-sm">
              {role.status}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{role.period}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{role.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-500">{role.papersReviewed}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Papers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-500">{role.averageReviewTime}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Avg Time</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Achievements</h4>
            <ul className="space-y-1">
              {role.achievements.slice(0, 2).map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-8">
      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Papers Reviewed', value: reviewStatistics.totalPapers, icon: FileText, color: 'text-blue-500' },
          { label: 'Journals Served', value: reviewStatistics.totalJournals, icon: BookOpen, color: 'text-green-500' },
          { label: 'Years Active', value: reviewStatistics.yearsActive, icon: Calendar, color: 'text-purple-500' },
          { label: 'Top Reviewer Awards', value: reviewStatistics.topReviewerAwards, icon: Award, color: 'text-orange-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
          >
            <stat.icon size={32} className={`mx-auto mb-3 ${stat.color}`} />
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold text-center mb-8">Review Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">{reviewStatistics.averageImpactFactor}</div>
            <div className="text-sm opacity-90">Avg Impact Factor</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">{reviewStatistics.onTimeCompletion}</div>
            <div className="text-sm opacity-90">On-Time Completion</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">{reviewStatistics.averageReviewTime}</div>
            <div className="text-sm opacity-90">Avg Review Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">{reviewStatistics.specialIssues}</div>
            <div className="text-sm opacity-90">Special Issues</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

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
            {t('editorialRoles.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('editorialRoles.subtitle')}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'current' && renderCurrentRoles()}
            {activeTab === 'completed' && renderPastRoles()}
            {activeTab === 'statistics' && renderStatistics()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EditorialRoles;