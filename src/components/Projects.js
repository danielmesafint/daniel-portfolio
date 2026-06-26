import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink, Play, Star, Calendar, Code, Wrench } from 'lucide-react';

// Global navigation functions are now defined in utils/globalNavigation.js

const Projects = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeTab, setActiveTab] = useState(window.projectsNavigation.activeTab || 'featured');

  // Register this component with the global navigation system
  useEffect(() => {
    console.log('Projects: Registering with global navigation system');
    window.projectsNavigation.setActiveTab = setActiveTab;
    
    // Check for stored tab preference from Student Portal navigation
    const storedTab = localStorage.getItem('projectTab');
    console.log('Projects: Checking for stored tab, found:', storedTab);
    if (storedTab && ['featured', 'all', 'tools', 'demos'].includes(storedTab)) {
      console.log('Projects: Found valid stored tab preference:', storedTab);
      setActiveTab(storedTab);
      // Clear the stored preference after using it
      localStorage.removeItem('projectTab');
      console.log('Projects: Cleared stored tab preference');
    } else {
      console.log('Projects: No valid stored tab found, using default');
    }
    
    // Add listener for external navigation
    const listener = (tab) => {
      console.log('Projects: External navigation to tab:', tab);
      setActiveTab(tab);
    };
    window.projectsNavigation.listeners.push(listener);
    
    // Handle hash-based navigation as backup
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      const tabMap = {
        '#projects-featured': 'featured',
        '#projects-all': 'all',
        '#projects-tools': 'tools',
        '#projects-demos': 'demos',
        '#projects': 'featured'
      };
      
      const targetTab = tabMap[hash];
      if (targetTab && targetTab !== activeTab) {
        console.log('Projects: Hash navigation to:', targetTab);
        window.navigateToProjectTab(targetTab);
      }
    };
    
    // Check initial hash
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      // Cleanup
      window.removeEventListener('hashchange', handleHashNavigation);
      const index = window.projectsNavigation.listeners.indexOf(listener);
      if (index > -1) {
        window.projectsNavigation.listeners.splice(index, 1);
      }
    };
  }, []);

  // Update global state when local state changes
  useEffect(() => {
    window.projectsNavigation.activeTab = activeTab;
    console.log('Projects: activeTab changed to:', activeTab);
  }, [activeTab]);

  const featuredProjects = [
    {
      id: 1,
      title: 'Vision-Language Transformer Robustness Framework',
      description: 'A comprehensive framework for evaluating and improving the adversarial robustness of vision-language transformers in multimodal AI applications.',
      image: './all_project_images/vision_language_transformer.png',
      technologies: ['PyTorch', 'Transformers', 'OpenCV', 'CLIP'],
      category: 'Research',
      status: 'Active',
      github: 'https://github.com/daniel-mesafint/vl-robustness',
      demo: 'https://vl-robustness-demo.com',
      impact: 'Used by 50+ researchers worldwide',
      year: 2024
    },
    {
      id: 2,
      title: 'Face Emotion Detection + Spotify Recommendation System',
      description: 'An AI-powered system that detects facial emotions in real-time and provides personalized music recommendations based on emotional state.',
      image: './all_project_images/face_emotion_spotify.png',
      technologies: ['OpenCV', 'TensorFlow', 'CNN', 'Spotify API'],
      category: 'Application',
      status: 'Completed',
      github: 'https://github.com/daniel-mesafint/emotion-music',
      demo: 'https://emotion-music-app.com',
      impact: '10K+ active users',
      year: 2023
    }
  ];

  const allProjects = [
    ...featuredProjects,
    {
      id: 4,
      title: 'Ethiopian Language NLP Toolkit',
      description: 'A comprehensive toolkit for natural language processing tasks in Ethiopian languages, including Amharic, Oromo, and Harari.',
      image: './all_project_images/ethiopian_nlp.png',
      technologies: ['Python', 'Transformers', 'spaCy', 'NLTK'],
      category: 'Research',
      status: 'Active',
      github: 'https://github.com/daniel-mesafint/ethiopian-nlp',
      demo: 'https://ethiopian-nlp-demo.com',
      impact: 'Used by Ethiopian NLP community',
      year: 2022
    }
  ];

  const softwareTools = [
    {
      id: 7,
      title: 'DataViz Pro',
      description: 'Advanced data visualization toolkit with interactive charts and real-time analytics capabilities.',
      image: './all_project_images/dataviz_pro.png',
      technologies: ['D3.js', 'React', 'Python', 'FastAPI'],
      category: 'Tool',
      status: 'Active',
      github: 'https://github.com/daniel-mesafint/dataviz-pro',
      demo: 'https://dataviz-pro.com',
      downloads: '5K+ downloads',
      year: 2024
    },
    {
      id: 8,
      title: 'ML Pipeline Builder',
      description: 'Visual drag-and-drop interface for building and deploying machine learning pipelines without coding.',
      image: './all_project_images/ml_pipeline_builder.png',
      technologies: ['React', 'Node.js', 'Docker', 'Kubernetes'],
      category: 'Tool',
      status: 'Active',
      github: 'https://github.com/daniel-mesafint/ml-pipeline-builder',
      demo: 'https://ml-pipeline-builder.com',
      downloads: '3K+ downloads',
      year: 2023
    }
  ];

  const demos = [
    {
      id: 10,
      title: 'Real-time Object Detection Demo',
      description: 'Interactive web demo showcasing real-time object detection using YOLO and webcam input.',
      image: './all_project_images/object_detection_demo.png',
      technologies: ['YOLO', 'OpenCV', 'JavaScript', 'WebRTC'],
      category: 'Demo',
      status: 'Live',
      demo: 'https://object-detection-demo.com',
      github: 'https://github.com/daniel-mesafint/object-detection-demo',
      views: '50K+ views',
      year: 2024
    },
    {
      id: 11,
      title: 'Neural Style Transfer Playground',
      description: 'Interactive demo for applying artistic styles to images using neural style transfer algorithms.',
      image: './all_project_images/style_transfer_demo.png',
      technologies: ['TensorFlow.js', 'React', 'Canvas API'],
      category: 'Demo',
      status: 'Live',
      demo: 'https://style-transfer-demo.com',
      github: 'https://github.com/daniel-mesafint/style-transfer-demo',
      views: '30K+ views',
      year: 2023
    }
  ];

  const getProjectData = () => {
    switch (activeTab) {
      case 'featured': return featuredProjects;
      case 'all': return allProjects;
      case 'tools': return softwareTools;
      case 'demos': return demos;
      default: return featuredProjects;
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'featured': return <Star size={20} />;
      case 'all': return <Code size={20} />;
      case 'tools': return <Wrench size={20} />;
      case 'demos': return <Play size={20} />;
      default: return <Star size={20} />;
    }
  };

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'featured': return 'Featured Projects';
      case 'all': return 'All Projects';
      case 'tools': return 'Software Tools';
      case 'demos': return 'Demos';
      default: return 'Featured Projects';
    }
  };

  return (
    <section id="projects" className="pb-20 bg-neutral-800/50 relative" style={{ paddingTop: '16px' }}>
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
            Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my comprehensive portfolio of innovative AI projects, software tools, and interactive demonstrations showcasing cutting-edge solutions in machine learning, healthcare technology, and data science applications.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['featured', 'all', 'tools', 'demos'].map((tab) => (
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
        <div id="projects-featured" className={activeTab !== 'featured' ? 'hidden' : ''} data-tab="featured">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="grido-card rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' || project.status === 'Live'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent-500/20 text-accent-400 rounded text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-700 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {(project.impact || project.downloads || project.views) && (
                    <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-2 rounded-lg border border-accent-500/30 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-accent-400" />
                        <span className="text-accent-400 font-semibold text-xs">
                          {project.impact || project.downloads || project.views}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="projects-all" className={activeTab !== 'all' ? 'hidden' : ''} data-tab="all">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="grido-card rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' || project.status === 'Live'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent-500/20 text-accent-400 rounded text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-700 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {(project.impact || project.downloads || project.views) && (
                    <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-2 rounded-lg border border-accent-500/30 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-accent-400" />
                        <span className="text-accent-400 font-semibold text-xs">
                          {project.impact || project.downloads || project.views}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="projects-tools" className={activeTab !== 'tools' ? 'hidden' : ''} data-tab="tools">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {softwareTools.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="grido-card rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' || project.status === 'Live'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent-500/20 text-accent-400 rounded text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-700 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {(project.impact || project.downloads || project.views) && (
                    <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-2 rounded-lg border border-accent-500/30 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-accent-400" />
                        <span className="text-accent-400 font-semibold text-xs">
                          {project.downloads}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="projects-demos" className={activeTab !== 'demos' ? 'hidden' : ''} data-tab="demos">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {demos.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="grido-card rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' || project.status === 'Live'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent-500/20 text-accent-400 rounded text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-700 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {(project.impact || project.downloads || project.views) && (
                    <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-2 rounded-lg border border-accent-500/30 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-accent-400" />
                        <span className="text-accent-400 font-semibold text-xs">
                          {project.views}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-8 rounded-2xl border border-accent-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Explore More Projects
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Visit my GitHub profile to explore additional projects, contributions, and open-source work.
            </p>
            <motion.a
              href="https://github.com/daniel-mesafint"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-primary-600 hover:from-accent-600 hover:to-primary-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300"
            >
              <Github size={24} />
              <span>Visit GitHub</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;