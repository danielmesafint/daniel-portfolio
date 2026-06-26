import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  Lightbulb,
  Globe,
  Building,
  Calendar,
  MapPin,
  ChevronRight,
  Star,
  Briefcase,
  GraduationCap,
  Zap
} from 'lucide-react';

const Leadership = () => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Roles', icon: Users },
    { id: 'academic', name: 'Academic Leadership', icon: GraduationCap },
    { id: 'research', name: 'Research Leadership', icon: Zap },
    { id: 'organizational', name: 'Organizational', icon: Building },
    { id: 'community', name: 'Community Service', icon: Globe }
  ];

  const leadershipRoles = [
    {
      id: 1,
      title: 'Director of AI Research Lab',
      organization: 'Debre Tabor University',
      category: 'research',
      period: '2022 - Present',
      location: 'Debre Tabor, Ethiopia',
      status: 'Current',
      teamSize: 15,
      budget: '$200K',
      description: 'Leading a multidisciplinary research team focused on Vision-Language Transformers and Explainable AI applications.',
      responsibilities: [
        'Strategic planning and vision setting for AI research initiatives',
        'Managing research team of 15+ PhD and MSc students',
        'Securing funding through grants and industry partnerships',
        'Establishing international research collaborations',
        'Overseeing lab operations and resource allocation',
        'Mentoring junior faculty and research staff'
      ],
      achievements: [
        'Established lab from ground up with $200K initial funding',
        'Grew team from 3 to 15 researchers in 2 years',
        'Secured 5 major research grants totaling $500K',
        'Published 25+ papers with lab members as co-authors',
        'Established partnerships with Stanford, MIT, and Oxford',
        'Launched 3 successful industry collaboration projects'
      ],
      impact: {
        publications: '25+',
        funding: '$500K',
        partnerships: '8',
        graduates: '12'
      },
      skills: ['Strategic Planning', 'Team Management', 'Grant Writing', 'Research Direction'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Technology Transfer Coordinator',
      organization: 'Debre Tabor University',
      category: 'organizational',
      period: '2021 - Present',
      location: 'Debre Tabor, Ethiopia',
      status: 'Current',
      teamSize: 8,
      budget: '$150K',
      description: 'Coordinating technology transfer initiatives between university research and industry applications.',
      responsibilities: [
        'Develop technology transfer policies and procedures',
        'Identify commercialization opportunities for research',
        'Facilitate industry-academia partnerships',
        'Manage intellectual property portfolio',
        'Coordinate startup incubation programs',
        'Organize technology showcase events'
      ],
      achievements: [
        'Established university\'s first tech transfer office',
        'Facilitated 12 industry-academia partnerships',
        'Supported launch of 5 research-based startups',
        'Generated $300K in licensing revenue',
        'Organized 4 annual technology showcase events',
        'Developed IP management framework'
      ],
      impact: {
        partnerships: '12',
        startups: '5',
        revenue: '$300K',
        events: '4'
      },
      skills: ['Technology Transfer', 'IP Management', 'Business Development', 'Partnership Building'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Head of Computer Science Department',
      organization: 'Debre Tabor University',
      category: 'academic',
      period: '2023 - Present',
      location: 'Debre Tabor, Ethiopia',
      status: 'Current',
      teamSize: 25,
      budget: '$400K',
      description: 'Leading the Computer Science department with focus on curriculum modernization and research excellence.',
      responsibilities: [
        'Strategic leadership for department of 25 faculty members',
        'Curriculum development and modernization',
        'Faculty recruitment and development',
        'Student affairs and academic program oversight',
        'Budget management and resource allocation',
        'External relations and industry partnerships'
      ],
      achievements: [
        'Modernized CS curriculum with AI/ML focus',
        'Increased department research output by 150%',
        'Recruited 8 new faculty members with PhD degrees',
        'Established 6 new industry partnership programs',
        'Improved student satisfaction scores by 40%',
        'Launched new MSc in AI program'
      ],
      impact: {
        faculty: '25',
        students: '300+',
        programs: '3',
        satisfaction: '40%'
      },
      skills: ['Academic Leadership', 'Curriculum Development', 'Faculty Management', 'Strategic Planning'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Chair of AI Ethics Committee',
      organization: 'Ethiopian AI Society',
      category: 'community',
      period: '2022 - Present',
      location: 'Addis Ababa, Ethiopia',
      status: 'Current',
      teamSize: 12,
      budget: 'Volunteer',
      description: 'Leading national committee on AI ethics and responsible AI development in Ethiopia.',
      responsibilities: [
        'Develop national AI ethics guidelines',
        'Review AI research proposals for ethical compliance',
        'Organize public awareness campaigns on AI ethics',
        'Advise government on AI policy development',
        'Coordinate with international AI ethics organizations',
        'Conduct ethics training for AI researchers'
      ],
      achievements: [
        'Developed Ethiopia\'s first AI ethics framework',
        'Reviewed 50+ AI research proposals',
        'Organized 8 public awareness events',
        'Advised government on national AI strategy',
        'Established partnerships with 5 international organizations',
        'Trained 200+ researchers in AI ethics'
      ],
      impact: {
        guidelines: '1',
        reviews: '50+',
        events: '8',
        trained: '200+'
      },
      skills: ['Ethics Leadership', 'Policy Development', 'Public Speaking', 'Stakeholder Management'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Principal Investigator - Healthcare AI Project',
      organization: 'Multi-University Consortium',
      category: 'research',
      period: '2021 - 2023',
      location: 'Ethiopia',
      status: 'Completed',
      teamSize: 20,
      budget: '$300K',
      description: 'Led multi-institutional research project on AI applications in Ethiopian healthcare systems.',
      responsibilities: [
        'Coordinate research activities across 4 universities',
        'Manage project budget and timeline',
        'Supervise 20+ researchers and students',
        'Liaise with healthcare institutions and government',
        'Ensure project deliverables and milestones',
        'Disseminate research findings'
      ],
      achievements: [
        'Successfully completed $300K research project',
        'Coordinated team across 4 universities',
        'Published 8 high-impact research papers',
        'Developed AI diagnostic tools for 3 diseases',
        'Trained 50+ healthcare professionals',
        'Received national recognition for impact'
      ],
      impact: {
        universities: '4',
        papers: '8',
        tools: '3',
        professionals: '50+'
      },
      skills: ['Project Management', 'Multi-site Coordination', 'Healthcare AI', 'Stakeholder Engagement'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 6,
      title: 'Conference Program Chair',
      organization: 'African AI Conference 2023',
      category: 'community',
      period: '2022 - 2023',
      location: 'Addis Ababa, Ethiopia',
      status: 'Completed',
      teamSize: 30,
      budget: '$100K',
      description: 'Led program committee for the largest AI conference in Africa with 500+ attendees.',
      responsibilities: [
        'Organize conference program and schedule',
        'Coordinate with 30+ program committee members',
        'Manage paper review process',
        'Invite keynote speakers and organize sessions',
        'Oversee conference logistics and operations',
        'Ensure high-quality scientific program'
      ],
      achievements: [
        'Organized successful conference with 500+ attendees',
        'Managed review of 200+ paper submissions',
        'Invited 8 world-renowned keynote speakers',
        'Achieved 95% attendee satisfaction rating',
        'Established conference as annual event',
        'Generated $50K surplus for future events'
      ],
      impact: {
        attendees: '500+',
        papers: '200+',
        speakers: '8',
        satisfaction: '95%'
      },
      skills: ['Event Management', 'Academic Program Organization', 'Stakeholder Coordination', 'Quality Assurance'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const filteredRoles = activeCategory === 'all' 
    ? leadershipRoles 
    : leadershipRoles.filter(role => role.category === activeCategory);

  const leadershipStats = {
    totalTeamMembers: leadershipRoles.reduce((sum, role) => sum + role.teamSize, 0),
    totalBudgetManaged: '$1.2M+',
    activeRoles: leadershipRoles.filter(role => role.status === 'Current').length,
    yearsExperience: 5,
    organizationsServed: 6,
    projectsLed: 15
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
            {t('leadership.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </motion.div>

        {/* Leadership Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {[
            { label: 'Team Members Led', value: leadershipStats.totalTeamMembers, icon: Users, color: 'text-blue-500' },
            { label: 'Budget Managed', value: leadershipStats.totalBudgetManaged, icon: TrendingUp, color: 'text-green-500' },
            { label: 'Active Roles', value: leadershipStats.activeRoles, icon: Briefcase, color: 'text-purple-500' },
            { label: 'Years Experience', value: leadershipStats.yearsExperience, icon: Calendar, color: 'text-orange-500' },
            { label: 'Organizations', value: leadershipStats.organizationsServed, icon: Building, color: 'text-teal-500' },
            { label: 'Projects Led', value: leadershipStats.projectsLed, icon: Target, color: 'text-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center"
            >
              <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600'
                }`}
              >
                <IconComponent size={16} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Leadership Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Building size={14} />
                      <span className="font-medium">{role.organization}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {role.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    role.category === 'academic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    role.category === 'research' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    role.category === 'organizational' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {role.category.charAt(0).toUpperCase() + role.category.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    role.status === 'Current' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {role.status}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {role.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-500">{role.teamSize}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Team Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500">{role.budget}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Budget</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {role.skills.slice(0, 2).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {role.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      +{role.skills.length - 2} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Leadership Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Leadership Philosophy</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            "Effective leadership in academia and research is about empowering others to achieve their full potential while fostering innovation, collaboration, and ethical responsibility. I believe in leading by example, creating inclusive environments, and building bridges between diverse stakeholders to drive meaningful impact."
          </p>
        </motion.div>

        {/* Role Detail Modal */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedRole(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedRole.title}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {selectedRole.organization} • {selectedRole.period}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {selectedRole.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{resp}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Skills & Competencies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Achievements
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {selectedRole.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Impact Metrics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedRole.impact).map(([key, value]) => (
                          <div key={key} className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                            <div className="text-xl font-bold text-pink-500">{value}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
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

export default Leadership;