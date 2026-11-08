import React from 'react';
import { motion } from 'framer-motion';
import { isSectionVisible, STUDENT_PORTAL_ENABLED } from '../config/sections';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Users, 
  Award, 
  Briefcase, 
  Mail, 
  FileText, 
  Code, 
  GraduationCap,
  Camera,
  MessageCircle,
  Newspaper,
  Star
} from 'lucide-react';

const QuickLinks = () => {
  const { t } = useTranslation();

  const quickLinks = [
    {
      title: t('nav.about'),
      description: 'Learn about my background and expertise',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      link: '#about'
    },
    {
      title: t('nav.research'),
      description: 'Explore my research projects and findings',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      link: '#research'
    },
    {
      title: t('nav.publications'),
      description: 'Browse my academic publications',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      link: '#publications'
    },
    {
      title: t('nav.projects'),
      description: 'View my technical projects and code',
      icon: Code,
      color: 'from-orange-500 to-orange-600',
      link: '#projects'
    },
    {
      title: t('nav.teaching'),
      description: 'Discover my teaching philosophy and courses',
      icon: GraduationCap,
      color: 'from-red-500 to-red-600',
      link: '#teaching'
    },
    {
      title: t('nav.services'),
      description: 'Professional services and consulting',
      icon: Briefcase,
      color: 'from-teal-500 to-teal-600',
      link: '#services'
    },
    {
      title: t('nav.awards'),
      description: 'Recognition and achievements',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      link: '#awards'
    },
    {
      title: t('nav.gallery'),
      description: 'Photos from conferences and events',
      icon: Camera,
      color: 'from-pink-500 to-pink-600',
      link: '#gallery'
    },
    {
      title: t('nav.blog'),
      description: 'Read my latest thoughts and insights',
      icon: MessageCircle,
      color: 'from-indigo-500 to-indigo-600',
      link: '#blog'
    },
    {
      title: t('nav.news'),
      description: 'Latest news and announcements',
      icon: Newspaper,
      color: 'from-cyan-500 to-cyan-600',
      link: '#news'
    },
    {
      title: t('nav.testimonials'),
      description: 'What others say about my work',
      icon: Star,
      color: 'from-amber-500 to-amber-600',
      link: '#testimonials'
    },
    {
      title: 'Student Portal',
      description: 'Access courses, assignments, and academic resources',
      icon: GraduationCap,
      color: 'from-emerald-500 to-emerald-600',
      link: '/student',
      isExternal: true
    },
    {
      title: t('nav.contact'),
      description: 'Get in touch for collaborations',
      icon: Mail,
      color: 'from-rose-500 to-rose-600',
      link: '#contact'
    }
  ];

  const visibleLinks = quickLinks.filter((link) =>
    link.link === '/student' ? STUDENT_PORTAL_ENABLED : isSectionVisible(link.link.replace('#', ''))
  );

  const handleLinkClick = (link) => {
    if (link.isExternal || link.link.startsWith('/')) {
      // Handle external links or routes
      window.location.href = link.link;
    } else {
      // Handle internal anchor links
      const element = document.querySelector(link.link);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
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
            {t('quickLinks.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('quickLinks.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => handleLinkClick(link)}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 hover:border-transparent">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon size={24} className="text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors">
                  {link.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {link.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Collaborate?</h3>
          <p className="text-lg mb-6 opacity-90">
            Let's work together on your next AI/ML project or research initiative
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleLinkClick({ link: '#contact' })}
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Get In Touch
            </button>
            <button
              onClick={() => window.open('/view-cv.html', '_blank')}
              className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Download CV
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;