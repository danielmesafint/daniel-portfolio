import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Biography from './Biography';
import Skills from './Skills';
import CareerTimeline from './CareerTimeline';
import ProfessionalExperience from './ProfessionalExperience';
import EditorialRoles from './EditorialRoles';
import Leadership from './Leadership';
import Gallery from './Gallery';

const About = () => {
  const { t } = useTranslation();

  return (
    <div id="about">
      {/* About Me Section Header */}
      <section className="py-16 bg-gray-900 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-pink-500">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <div id="about-biography">
        <Biography />
      </div>
      
      {/* Skills Section */}
      <div id="about-skills">
        <Skills />
      </div>
      
      {/* Career Timeline Section */}
      <div id="about-timeline">
        <CareerTimeline />
      </div>
      
      {/* Professional Experience Section */}
      <div id="about-experience">
        <ProfessionalExperience />
      </div>
      
      {/* Editorial Roles Section */}
      <div id="about-editorial">
        <EditorialRoles />
      </div>
      
      {/* Leadership Section */}
      <div id="about-leadership">
        <Leadership />
      </div>
      
      {/* Gallery Section */}
      <div id="about-gallery">
        <Gallery />
      </div>
    </div>
  );
};

export default About;