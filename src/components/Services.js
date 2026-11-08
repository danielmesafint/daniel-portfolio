import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { openEmail, WHATSAPP_URL } from '../utils/contactLinks';
import { useTranslation } from 'react-i18next';
import { 
  Briefcase, 
  Brain, 
  Edit, 
  Users, 
  BarChart3,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  Code,
  Database,
  FileText,
  Lightbulb
} from 'lucide-react';

// Global navigation functions are now defined in utils/globalNavigation.js

const Services = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeTab, setActiveTab] = useState(window.servicesNavigation.activeTab || 'consulting');

  // Register this component with the global navigation system
  useEffect(() => {
    console.log('Services: Registering with global navigation system');
    window.servicesNavigation.setActiveTab = setActiveTab;
    
    // Check for stored tab preference from Student Portal navigation
    const storedTab = localStorage.getItem('servicesTab');
    console.log('Services: Checking for stored tab, found:', storedTab);
    if (storedTab && ['consulting', 'aiml', 'editing', 'advisory', 'analysis'].includes(storedTab)) {
      console.log('Services: Found valid stored tab preference:', storedTab);
      setActiveTab(storedTab);
      // Clear the stored preference after using it
      localStorage.removeItem('servicesTab');
      console.log('Services: Cleared stored tab preference');
    } else {
      console.log('Services: No valid stored tab found, using default');
    }
    
    // Add listener for external navigation
    const listener = (tab) => {
      console.log('Services: External navigation to tab:', tab);
      setActiveTab(tab);
    };
    window.servicesNavigation.listeners.push(listener);
    
    // Handle hash-based navigation as backup
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      const tabMap = {
        '#services-consulting': 'consulting',
        '#services-aiml': 'aiml',
        '#services-editing': 'editing',
        '#services-advisory': 'advisory',
        '#services-analysis': 'analysis',
        '#services': 'consulting'
      };
      
      const targetTab = tabMap[hash];
      if (targetTab && targetTab !== activeTab) {
        console.log('Services: Hash navigation to:', targetTab);
        window.navigateToServicesTab(targetTab);
      }
    };
    
    // Check initial hash
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      // Cleanup
      window.removeEventListener('hashchange', handleHashNavigation);
      const index = window.servicesNavigation.listeners.indexOf(listener);
      if (index > -1) {
        window.servicesNavigation.listeners.splice(index, 1);
      }
    };
  }, []);

  // Update global state when local state changes
  useEffect(() => {
    window.servicesNavigation.activeTab = activeTab;
    console.log('Services: activeTab changed to:', activeTab);
  }, [activeTab]);

  const consultingServices = [
    {
      id: 1,
      title: 'AI Strategy Consulting',
      description: 'Strategic guidance for organizations looking to implement AI solutions and digital transformation initiatives.',
      features: [
        'AI readiness assessment',
        'Technology roadmap development',
        'ROI analysis and business case development',
        'Implementation planning and risk assessment'
      ],
      duration: '2-8 weeks',
      deliverables: ['Strategy document', 'Implementation roadmap', 'Risk assessment report'],
      pricing: 'Starting from $5,000'
    },
    {
      id: 2,
      title: 'Healthcare AI Consulting',
      description: 'Specialized consulting for healthcare organizations implementing AI-driven solutions for patient care and operations.',
      features: [
        'Clinical workflow analysis',
        'AI solution design for healthcare',
        'Regulatory compliance guidance',
        'Staff training and change management'
      ],
      duration: '4-12 weeks',
      deliverables: ['Clinical AI strategy', 'Compliance framework', 'Training materials'],
      pricing: 'Starting from $8,000'
    }
  ];

  const aimlServices = [
    {
      id: 1,
      title: 'Custom Machine Learning Models',
      description: 'End-to-end development of custom ML models tailored to your specific business needs and data.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'MLflow'],
      features: [
        'Data preprocessing and feature engineering',
        'Model architecture design and training',
        'Performance optimization and validation',
        'Deployment and monitoring setup'
      ],
      timeline: '6-16 weeks',
      pricing: 'Starting from $15,000'
    },
    {
      id: 2,
      title: 'Computer Vision Solutions',
      description: 'Advanced computer vision applications for image recognition, object detection, and medical imaging.',
      technologies: ['OpenCV', 'YOLO', 'ResNet', 'CNN', 'Transfer Learning'],
      features: [
        'Image classification and object detection',
        'Medical image analysis',
        'Real-time video processing',
        'Custom dataset creation and annotation'
      ],
      timeline: '8-20 weeks',
      pricing: 'Starting from $20,000'
    }
  ];

  const editingServices = [
    {
      id: 1,
      title: 'Academic Paper Editing',
      description: 'Professional editing services for research papers, journal articles, and conference submissions.',
      features: [
        'Grammar and language correction',
        'Structure and flow improvement',
        'Citation and reference formatting',
        'Journal submission guidelines compliance'
      ],
      turnaround: '3-7 days',
      pricing: 'Starting from $200 per paper'
    },
    {
      id: 2,
      title: 'Technical Documentation',
      description: 'Comprehensive editing and writing services for technical documentation, user manuals, and API documentation.',
      features: [
        'Technical accuracy review',
        'Clarity and readability improvement',
        'Documentation structure optimization',
        'Style guide compliance'
      ],
      turnaround: '5-10 days',
      pricing: 'Starting from $50 per page'
    }
  ];

  const advisoryServices = [
    {
      id: 1,
      title: 'Technology Advisory Board',
      description: 'Strategic technology guidance and oversight for startups and established companies.',
      responsibilities: [
        'Technology strategy development',
        'Product roadmap guidance',
        'Technical team mentoring',
        'Investment and partnership advice'
      ],
      commitment: 'Monthly meetings + ad-hoc consultation',
      pricing: 'Equity or retainer-based'
    },
    {
      id: 2,
      title: 'Academic Advisory',
      description: 'Advisory services for academic institutions, research programs, and educational initiatives.',
      responsibilities: [
        'Curriculum development guidance',
        'Research program strategy',
        'Industry collaboration facilitation',
        'Grant application support'
      ],
      commitment: 'Quarterly reviews + project consultation',
      pricing: 'Starting from $2,000/month'
    }
  ];

  const analysisServices = [
    {
      id: 1,
      title: 'Business Intelligence & Analytics',
      description: 'Comprehensive data analysis and business intelligence solutions to drive data-driven decision making.',
      tools: ['Python', 'R', 'Tableau', 'Power BI', 'SQL'],
      features: [
        'Data warehouse design and implementation',
        'Interactive dashboard development',
        'Predictive analytics and forecasting',
        'Performance metrics and KPI tracking'
      ],
      timeline: '4-12 weeks',
      pricing: 'Starting from $8,000'
    },
    {
      id: 2,
      title: 'Statistical Analysis & Research',
      description: 'Advanced statistical analysis for research studies, clinical trials, and market research projects.',
      tools: ['SPSS', 'SAS', 'R', 'Python', 'Stata'],
      features: [
        'Experimental design and power analysis',
        'Descriptive and inferential statistics',
        'Multivariate analysis and modeling',
        'Research report and publication support'
      ],
      timeline: '2-8 weeks',
      pricing: 'Starting from $3,000'
    }
  ];

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'consulting': return <Briefcase size={20} />;
      case 'aiml': return <Brain size={20} />;
      case 'editing': return <Edit size={20} />;
      case 'advisory': return <Users size={20} />;
      case 'analysis': return <BarChart3 size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'consulting': return 'Consulting';
      case 'aiml': return 'AI/ML Model Dev';
      case 'editing': return 'Editing';
      case 'advisory': return 'Advisory';
      case 'analysis': return 'Data Analysis';
      default: return 'Consulting';
    }
  };

  return (
    <section className="pb-20 bg-neutral-800/50 relative" style={{ paddingTop: '16px' }}>
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
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#a855f7' }}>
            Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional services in AI consulting, machine learning development, academic editing, strategic advisory, and data analysis to help organizations and researchers achieve their goals.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['consulting', 'aiml', 'editing', 'advisory', 'analysis'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-accent-500 text-black shadow-lg'
                  : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
              }`}
            >
              {getTabIcon(tab)}
              <span>{getTabTitle(tab)}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Individual Sections with Unique IDs */}
        <div id="services-consulting" className={activeTab !== 'consulting' ? 'hidden' : ''} data-tab="consulting">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {consultingServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent-500/20 rounded-lg">
                    <Briefcase size={24} className="text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle size={14} className="text-accent-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star size={14} />
                    <span>{service.pricing}</span>
                  </div>
                </div>

                <motion.button onClick={() => openEmail('Quote request')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-black px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  <span>Get Quote</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="services-aiml" className={activeTab !== 'aiml' ? 'hidden' : ''} data-tab="aiml">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aimlServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Brain size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{service.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star size={14} />
                    <span>{service.pricing}</span>
                  </div>
                </div>

                <motion.button onClick={() => openEmail('New project enquiry')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  <span>Start Project</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="services-editing" className={activeTab !== 'editing' ? 'hidden' : ''} data-tab="editing">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {editingServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Edit size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Services Include:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{service.turnaround}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star size={14} />
                    <span>{service.pricing}</span>
                  </div>
                </div>

                <motion.button onClick={() => openEmail('Document review request')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  <span>Submit Document</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="services-advisory" className={activeTab !== 'advisory' ? 'hidden' : ''} data-tab="advisory">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {advisoryServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Users size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Responsibilities:</h4>
                  <ul className="space-y-1">
                    {service.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{service.commitment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star size={14} />
                    <span>{service.pricing}</span>
                  </div>
                </div>

                <motion.button onClick={() => openEmail('Collaboration opportunity')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  <span>Discuss Opportunity</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="services-analysis" className={activeTab !== 'analysis' ? 'hidden' : ''} data-tab="analysis">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {analysisServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <BarChart3 size={24} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Tools & Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Services Include:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{service.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star size={14} />
                    <span>{service.pricing}</span>
                  </div>
                </div>

                <motion.button onClick={() => openEmail('Data analysis request')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  <span>Start Analysis</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-8 rounded-2xl border border-accent-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact me to discuss your project requirements and get a customized proposal for your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button onClick={() => openEmail('Enquiry from your website')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-400 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Mail size={20} />
                <span>Send Email</span>
              </motion.button>
              <motion.button onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 border border-accent-500 hover:bg-accent-500 hover:text-black text-accent-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Calendar size={20} />
                <span>Schedule Call</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;