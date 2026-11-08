import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Award, Globe, Heart, BookOpen, Users } from 'lucide-react';

const Biography = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'PhD in Computer Science with specialization in AI/ML',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Research Impact',
      description: '25+ publications with 500+ citations',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'Global Collaboration',
      description: 'Partnerships with Stanford, MIT, and Oxford',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: '20+ graduate students supervised',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Section Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Biography</h3>
              <div style={{ fontFamily: 'Playwrite NZ, cursive', fontSize: '12px', lineHeight: '1.6' }}>
                <p className="text-lg opacity-90 leading-relaxed mb-6">
                  Learn about my journey, passion, and dedication to advancing AI research
                </p>
              </div>
              
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden shadow-xl border-4 border-white/20">
                  <img
                    src="/daniel-profile-latest.png"
                    alt="Dr. Daniel Mesafint"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm opacity-80">Years Experience</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm opacity-80">Publications</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Citations</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-sm opacity-80">Students</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Biography Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-pink-500" />
                {t('biography.background.title')}
              </h3>
              <div style={{ fontFamily: 'Playwrite NZ, cursive', fontSize: '12px', lineHeight: '1.6' }}>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  With <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>over 5 years</span> of experience in <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>artificial intelligence</span> and <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>computer vision</span>, I specialize in developing <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>cutting-edge</span> solutions for real-world challenges. My work <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>focuses</span> on <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>Vision-Language Transformers, Explainable AI</span>, and their applications in <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>healthcare</span> and <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>education</span>.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I am passionate about <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>bridging</span> the gap between <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>theoretical research</span> and <span style={{ color: 'var(--theme-primary)', fontWeight: '600' }}>practical applications</span>, ensuring that AI technologies can make a meaningful impact on society.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-500" />
                {t('biography.mission.title')}
              </h3>
              <div style={{ fontFamily: 'Playwrite NZ, cursive', fontSize: '12px', lineHeight: '1.6' }}>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  My mission is to advance the field of artificial intelligence through innovative research while fostering the next generation of AI researchers. I believe in making AI accessible, explainable, and beneficial for all.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-pink-500" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className={`w-10 h-10 mb-3 rounded-lg bg-gradient-to-r ${highlight.color} flex items-center justify-center`}>
                      <highlight.icon size={20} className="text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {highlight.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-pink-500" />
                {t('biography.philosophy.title')}
              </h3>
              <div style={{ fontFamily: 'Playwrite NZ, cursive', fontSize: '12px', lineHeight: '1.6' }}>
                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-pink-500 pl-4">
                  "The true measure of AI success is not in the complexity of algorithms, but in their ability to solve real problems and improve human lives while remaining transparent and trustworthy."
                </blockquote>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-300 font-medium">Passionate about AI for Social Good</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Biography;