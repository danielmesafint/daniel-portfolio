import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ExternalLink,
  Heart,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Research', href: '#research' },
    { name: 'Publications', href: '#publications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Teaching', href: '#teaching' },
    { name: 'Contact', href: '#contact' }
  ];

  const academicLinks = [
    { name: 'Google Scholar', href: 'https://scholar.google.com/citations?user=daniel-mesafint' },
    { name: 'ResearchGate', href: 'https://www.researchgate.net/profile/Daniel-Mesafint' },
    { name: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000' },
    { name: 'Academia.edu', href: 'https://university.academia.edu/danielmesafint' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-mesafint' },
    { name: 'GitHub', href: 'https://github.com/daniel-mesafint' },
    { name: 'Twitter', href: 'https://twitter.com/danielmesafint' },
    { name: 'Facebook', href: 'https://www.facebook.com/dmesafint' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Accessibility', href: '/accessibility' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* About Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xs font-bold text-white mb-2">Dr. Daniel Mesafint</h3>
              <p className="text-gray-400 text-xs leading-tight mb-2">
                AI Researcher, Professor, and Healthcare Technology Expert dedicated to advancing 
                machine learning applications in healthcare and education.
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-blue-400" />
                  <span>Debre Tabor, Ethiopia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-blue-400" />
                  <a href="mailto:danielmesafint1985@gmail.com" className="hover:text-blue-400 transition-colors">
                    danielmesafint1985@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-blue-400" />
                  <a href="tel:+251912023274" className="hover:text-blue-400 transition-colors">
                    +251-912023274
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xs font-semibold text-white mb-2">Quick Links</h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Academic Profiles */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xs font-semibold text-white mb-2">Academic Profiles</h4>
              <ul className="space-y-1">
                {academicLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors text-xs flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <ExternalLink size={10} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Media & Legal */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-xs font-semibold text-white mb-2">Connect & Legal</h4>
              
              {/* Social Links */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-300 mb-1">Social Media</h5>
                <ul className="space-y-1">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors text-xs flex items-center space-x-1"
                      >
                        <span>{link.name}</span>
                        <ExternalLink size={10} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h5 className="text-xs font-medium text-gray-300 mb-1">Legal</h5>
                <ul className="space-y-1">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-slate-700/50 py-3"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs">
                © {currentYear} Dr. Daniel Mesafint. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Built with <Heart size={10} className="inline text-red-500" /> using React & Tailwind CSS
              </p>
            </div>

            {/* Additional Info */}
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-xs">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-xs">
                Version 2.0 | Responsive Design
              </p>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-slate-700/30 py-4"
        >
          <p className="text-center text-gray-500 text-xs leading-relaxed">
            This website is for professional and academic purposes. All research, publications, and projects 
            mentioned are the intellectual property of Dr. Daniel Mesafint and respective collaborators. 
            For permissions and collaborations, please contact directly.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;