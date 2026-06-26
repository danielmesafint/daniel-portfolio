import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  Calendar,
  MapPin,
  Clock,
  User,
  Star,
  ChevronRight,
  FileText,
  Presentation,
  Target
} from 'lucide-react';

// Global navigation functions are now defined in utils/globalNavigation.js

const Teaching = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeTab, setActiveTab] = useState(window.teachingNavigation.activeTab || 'courses');

  // Register this component with the global navigation system
  useEffect(() => {
    console.log('Teaching: Registering with global navigation system');
    window.teachingNavigation.setActiveTab = setActiveTab;
    
    // Check for stored tab preference from Student Portal navigation
    const storedTab = localStorage.getItem('teachingTab');
    console.log('Teaching: Checking for stored tab, found:', storedTab);
    if (storedTab && ['courses', 'experience', 'supervision', 'workshops', 'achievements'].includes(storedTab)) {
      console.log('Teaching: Found valid stored tab preference:', storedTab);
      setActiveTab(storedTab);
      // Clear the stored preference after using it
      localStorage.removeItem('teachingTab');
      console.log('Teaching: Cleared stored tab preference');
    } else {
      console.log('Teaching: No valid stored tab found, using default');
    }
    
    // Add listener for external navigation
    const listener = (tab) => {
      console.log('Teaching: External navigation to tab:', tab);
      setActiveTab(tab);
    };
    window.teachingNavigation.listeners.push(listener);
    
    // Handle hash-based navigation as backup
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      const tabMap = {
        '#teaching-courses': 'courses',
        '#teaching-experience': 'experience',
        '#teaching-supervision': 'supervision',
        '#teaching-workshops': 'workshops',
        '#teaching-achievements': 'achievements',
        '#teaching': 'courses'
      };
      
      const targetTab = tabMap[hash];
      if (targetTab && targetTab !== activeTab) {
        console.log('Teaching: Hash navigation to:', targetTab);
        window.navigateToTeachingTab(targetTab);
      }
    };
    
    // Check initial hash
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      // Cleanup
      window.removeEventListener('hashchange', handleHashNavigation);
      const index = window.teachingNavigation.listeners.indexOf(listener);
      if (index > -1) {
        window.teachingNavigation.listeners.splice(index, 1);
      }
    };
  }, []);

  // Update global state when local state changes
  useEffect(() => {
    window.teachingNavigation.activeTab = activeTab;
    console.log('Teaching: activeTab changed to:', activeTab);
  }, [activeTab]);

  const courses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      code: 'CS 4501',
      level: 'Undergraduate',
      institution: 'Haramaya University',
      semester: 'Fall 2024',
      students: 45,
      description: 'Introduction to machine learning algorithms, supervised and unsupervised learning, neural networks, and practical applications.',
      topics: ['Linear Regression', 'Decision Trees', 'Neural Networks', 'Clustering', 'Model Evaluation'],
      status: 'Current',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Deep Learning and AI',
      code: 'CS 6501',
      level: 'Graduate',
      institution: 'Haramaya University',
      semester: 'Spring 2024',
      students: 28,
      description: 'Advanced course covering deep neural networks, convolutional networks, recurrent networks, and modern AI applications.',
      topics: ['CNNs', 'RNNs', 'Transformers', 'GANs', 'Computer Vision'],
      status: 'Completed',
      rating: 4.9
    }
  ];

  const teachingExperience = [
    {
      id: 1,
      position: 'Associate Professor',
      institution: 'Haramaya University',
      department: 'School of Computing and Informatics',
      period: '2020 - Present',
      location: 'Dire Dawa, Ethiopia',
      responsibilities: [
        'Teaching undergraduate and graduate courses in AI and Machine Learning',
        'Supervising PhD and MSc students in research projects',
        'Developing new curriculum for AI and Data Science programs'
      ],
      achievements: [
        'Developed 3 new courses in AI and Machine Learning',
        'Supervised 15+ graduate students to completion',
        'Received Excellence in Teaching Award 2023'
      ]
    },
    {
      id: 2,
      position: 'Assistant Professor',
      institution: 'Haramaya University',
      department: 'School of Computing and Informatics',
      period: '2017 - 2020',
      location: 'Dire Dawa, Ethiopia',
      responsibilities: [
        'Teaching core computer science courses',
        'Supervising undergraduate final year projects',
        'Participating in curriculum development committees'
      ],
      achievements: [
        'Established the AI Research Lab',
        'Mentored 50+ undergraduate students',
        'Secured research funding for 3 major projects'
      ]
    }
  ];

  const supervision = [
    {
      id: 1,
      type: 'PhD Students',
      count: 8,
      current: 5,
      completed: 3,
      students: [
        {
          name: 'Sarah Ahmed',
          topic: 'AI-Driven Medical Diagnosis Systems',
          status: 'In Progress',
          year: '2022-Present',
          stage: 'Dissertation Writing'
        },
        {
          name: 'Michael Tadesse',
          topic: 'Natural Language Processing for Ethiopian Languages',
          status: 'In Progress',
          year: '2021-Present',
          stage: 'Data Collection'
        }
      ]
    },
    {
      id: 2,
      type: 'MSc Students',
      count: 25,
      current: 8,
      completed: 17,
      students: [
        {
          name: 'David Bekele',
          topic: 'Machine Learning for Crop Disease Detection',
          status: 'In Progress',
          year: '2023-Present',
          stage: 'Thesis Proposal'
        },
        {
          name: 'Meron Haile',
          topic: 'Deep Learning for Medical Image Analysis',
          status: 'In Progress',
          year: '2023-Present',
          stage: 'Literature Review'
        }
      ]
    }
  ];

  const workshops = [
    {
      id: 1,
      title: 'Introduction to Machine Learning for Healthcare',
      type: 'Workshop',
      duration: '3 days',
      participants: 120,
      date: 'March 2024',
      location: 'Addis Ababa, Ethiopia',
      organizer: 'Ethiopian AI Society',
      description: 'Hands-on workshop covering machine learning applications in healthcare.',
      topics: ['Medical Data Analysis', 'Diagnostic AI', 'Ethical Considerations']
    },
    {
      id: 2,
      title: 'Deep Learning Bootcamp',
      type: 'Bootcamp',
      duration: '5 days',
      participants: 80,
      date: 'January 2024',
      location: 'Haramaya University',
      organizer: 'School of Computing and Informatics',
      description: 'Intensive bootcamp on deep learning fundamentals.',
      topics: ['Neural Networks', 'CNN Architecture', 'Transfer Learning']
    }
  ];

  const achievements = [
    // Teaching Awards
    {
      id: 1,
      title: 'Excellence in Teaching Award',
      organization: 'Haramaya University',
      year: 2023,
      category: 'Teaching Award',
      type: 'award',
      description: 'Recognized for outstanding contribution to student learning and innovative teaching methods in AI and Machine Learning courses.',
      impact: 'Improved student engagement by 40% and course completion rates by 25%',
      level: 'University'
    },
    {
      id: 2,
      title: 'Best Supervisor Award',
      organization: 'Ethiopian Higher Education Quality Agency',
      year: 2022,
      category: 'Teaching Award',
      type: 'award',
      description: 'Awarded for exceptional supervision of graduate students and contribution to research excellence.',
      impact: '15 students successfully completed their degrees under supervision',
      level: 'National'
    },
    {
      id: 3,
      title: 'Innovation in Education Award',
      organization: 'African Universities Association',
      year: 2021,
      category: 'Teaching Award',
      type: 'award',
      description: 'Recognition for developing innovative AI curriculum and establishing industry partnerships.',
      impact: 'New curriculum adopted by 5 universities across East Africa',
      level: 'Continental'
    },

    // Professional Recognitions
    {
      id: 5,
      title: 'Distinguished Educator Recognition',
      organization: 'IEEE Computer Society',
      year: 2023,
      category: 'Recognition',
      type: 'recognition',
      description: 'Recognized for significant contributions to computer science education and AI curriculum development.',
      impact: 'Featured in IEEE Education Magazine as exemplary educator',
      level: 'International'
    },
    {
      id: 6,
      title: 'Research Excellence in Teaching',
      organization: 'International Conference on AI Education',
      year: 2022,
      category: 'Recognition',
      type: 'recognition',
      description: 'Recognition for research contributions to AI education methodologies and pedagogical innovations.',
      impact: 'Research cited by 50+ educational institutions globally',
      level: 'International'
    },

    // Professional Certifications
    {
      id: 9,
      title: 'Certified Professional in Learning and Performance (CPLP)',
      organization: 'Association for Talent Development (ATD)',
      year: 2023,
      category: 'Certification',
      type: 'certification',
      description: 'Professional certification in instructional design, learning technologies, and performance improvement.',
      impact: 'Enhanced course design and delivery methodologies',
      level: 'International',
      validUntil: '2026'
    },
    {
      id: 10,
      title: 'Google Cloud Professional Machine Learning Engineer',
      organization: 'Google Cloud',
      year: 2023,
      category: 'Certification',
      type: 'certification',
      description: 'Professional certification in designing, building, and productionizing ML models using Google Cloud technologies.',
      impact: 'Integrated cloud-based ML tools into curriculum',
      level: 'International',
      validUntil: '2025'
    }
  ];

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'courses': return <BookOpen size={20} />;
      case 'experience': return <GraduationCap size={20} />;
      case 'supervision': return <Users size={20} />;
      case 'workshops': return <Presentation size={20} />;
      case 'achievements': return <Award size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'courses': return 'Courses';
      case 'experience': return 'Teaching Experience';
      case 'supervision': return 'Supervision';
      case 'workshops': return 'Workshops';
      case 'achievements': return 'Achievements';
      default: return 'Courses';
    }
  };

  return (
    <section id="teaching" className="pb-20 bg-neutral-800/50 relative" style={{ paddingTop: '16px' }}>
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
            Teaching
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dedicated to excellence in education, fostering the next generation of AI and computer science professionals through innovative teaching methods, comprehensive supervision, and impactful workshops.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['courses', 'experience', 'supervision', 'workshops', 'achievements'].map((tab) => (
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
        <div id="teaching-courses" className={activeTab !== 'courses' ? 'hidden' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FileText size={14} />
                        {course.code}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap size={14} />
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.status === 'Current'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {course.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{course.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {course.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {course.semester}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="teaching-experience" className={activeTab !== 'experience' ? 'hidden' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {teachingExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                    <div className="flex flex-col gap-2 text-gray-400">
                      <span className="flex items-center gap-2">
                        <GraduationCap size={16} />
                        {exp.institution}
                      </span>
                      <span className="flex items-center gap-2">
                        <BookOpen size={16} />
                        {exp.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="flex items-center gap-2 text-accent-400 font-semibold">
                      <Calendar size={16} />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <ChevronRight size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <Star size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="teaching-supervision" className={activeTab !== 'supervision' ? 'hidden' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {supervision.map((sup, index) => (
              <motion.div
                key={sup.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{sup.type}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full">
                      Total: {sup.count}
                    </span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                      Current: {sup.current}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                      Completed: {sup.completed}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {sup.students.map((student, idx) => (
                    <div key={idx} className="bg-neutral-700/30 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{student.name}</h4>
                          <p className="text-gray-300 text-sm">{student.topic}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          student.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {student.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target size={12} />
                          {student.stage}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="teaching-workshops" className={activeTab !== 'workshops' ? 'hidden' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grido-card rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{workshop.title}</h3>
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm font-semibold">
                      {workshop.type}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{workshop.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={14} />
                    <span>{workshop.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={14} />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={14} />
                    <span>{workshop.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Organized by:</strong> {workshop.organizer}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div id="teaching-achievements" className={activeTab !== 'achievements' ? 'hidden' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Awards Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award size={28} className="text-yellow-400" />
                Teaching Awards
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.filter(item => item.type === 'award').map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="grido-card rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-500/20 rounded-lg">
                          <Award size={24} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{achievement.title}</h4>
                          <p className="text-gray-400 text-sm">{achievement.organization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-bold text-lg">{achievement.year}</span>
                        <p className="text-xs text-gray-400">{achievement.level}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm">{achievement.description}</p>

                    <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className="text-yellow-400" />
                        <span className="text-yellow-400 font-semibold text-sm">Impact</span>
                      </div>
                      <p className="text-gray-300 text-sm">{achievement.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recognitions Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Star size={28} className="text-purple-400" />
                Professional Recognitions
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.filter(item => item.type === 'recognition').map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="grido-card rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          <Star size={24} className="text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{achievement.title}</h4>
                          <p className="text-gray-400 text-sm">{achievement.organization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-purple-400 font-bold text-lg">{achievement.year}</span>
                        <p className="text-xs text-gray-400">{achievement.level}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm">{achievement.description}</p>

                    <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 p-3 rounded-lg border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className="text-purple-400" />
                        <span className="text-purple-400 font-semibold text-sm">Impact</span>
                      </div>
                      <p className="text-gray-300 text-sm">{achievement.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText size={28} className="text-blue-400" />
                Professional Certifications
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.filter(item => item.type === 'certification').map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="grido-card rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                          <FileText size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white leading-tight">{achievement.title}</h4>
                          <p className="text-gray-400 text-xs">{achievement.organization}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-400 font-bold text-sm">{achievement.year}</span>
                      {achievement.validUntil && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          new Date(achievement.validUntil) > new Date() 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          Valid until {achievement.validUntil}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300 mb-4 text-sm">{achievement.description}</p>

                    <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className="text-blue-400" />
                        <span className="text-blue-400 font-semibold text-sm">Impact</span>
                      </div>
                      <p className="text-gray-300 text-sm">{achievement.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 p-8 rounded-2xl border border-accent-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Achievement Summary</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {achievements.filter(item => item.type === 'award').length}
                  </div>
                  <p className="text-gray-300">Teaching Awards</p>
                  <p className="text-xs text-gray-400 mt-1">University to International Level</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {achievements.filter(item => item.type === 'recognition').length}
                  </div>
                  <p className="text-gray-300">Professional Recognitions</p>
                  <p className="text-xs text-gray-400 mt-1">National to International Level</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {achievements.filter(item => item.type === 'certification').length}
                  </div>
                  <p className="text-gray-300">Professional Certifications</p>
                  <p className="text-xs text-gray-400 mt-1">Industry-Leading Credentials</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Teaching;