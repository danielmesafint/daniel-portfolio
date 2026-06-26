import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SkillsSphere = () => {
  const { t } = useTranslation();
  const sphereRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'Python', level: 88, color: '#3776AB' },
    { name: 'Machine Learning', level: 85, color: '#FF6B6B' },
    { name: 'Data Science', level: 92, color: '#4ECDC4' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'TensorFlow', level: 75, color: '#FF6F00' },
    { name: 'Docker', level: 70, color: '#2496ED' },
    { name: 'AWS', level: 78, color: '#FF9900' },
    { name: 'MongoDB', level: 72, color: '#47A248' },
    { name: 'GraphQL', level: 68, color: '#E10098' },
    { name: 'TypeScript', level: 82, color: '#3178C6' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sphereRef.current) {
      observer.observe(sphereRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills-sphere" ref={sphereRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills Sphere
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive visualization of technical expertise and proficiency levels
          </p>
        </motion.div>

        <div className="relative">
          {/* 3D Sphere Container */}
          <div className="relative w-full h-96 flex items-center justify-center">
            <motion.div
              className="relative w-80 h-80 rounded-full"
              animate={isVisible ? { rotateY: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                boxShadow: '0 0 100px rgba(59, 130, 246, 0.3)'
              }}
            >
              {skills.map((skill, index) => {
                const angle = (index * 360) / skills.length;
                const radius = 120;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={skill.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    <div
                      className="relative bg-white dark:bg-gray-900 rounded-full p-4 shadow-lg border-2 cursor-pointer"
                      style={{ borderColor: skill.color }}
                    >
                      <div className="text-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
                          style={{ backgroundColor: skill.color }}
                        >
                          {skill.level}%
                        </div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          {skill.name}
                        </div>
                      </div>
                      
                      {/* Skill Level Ring */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={skill.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                          animate={isVisible ? { 
                            strokeDashoffset: 2 * Math.PI * 45 * (1 - skill.level / 100) 
                          } : {}}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {skill.name}
                  </span>
                  <span className="text-sm font-bold" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSphere;