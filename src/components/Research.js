import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ResearchInterests from './ResearchInterests';
import ResearchProjects from './ResearchProjects';
import ResearchFunding from './ResearchFunding';
import ResearchCollaborations from './ResearchCollaborations';
import ResearchTimeline from './ResearchTimeline';

const Research = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Research Section Header */}
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
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-cyan-400">
              Research
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive overview of my research activities, projects, collaborations, and contributions to the field of artificial intelligence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Interests Section */}
      <div id="research-interests">
        <ResearchInterests />
      </div>
      
      {/* Research Projects Section */}
      <div id="research-projects">
        <ResearchProjects />
      </div>
      
      {/* Research Funding Section */}
      <div id="research-funding">
        <ResearchFunding />
      </div>
      
      {/* Research Collaborations Section */}
      <div id="research-collaborations">
        <ResearchCollaborations />
      </div>
      
      {/* Research Timeline Section */}
      <div id="research-timeline">
        <ResearchTimeline />
      </div>
    </div>
  );
};

export default Research;