import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Brain, Database, Globe, Cpu, Zap } from 'lucide-react';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      skills: [
        { name: 'Deep Learning', level: 95 },
        { name: 'Computer Vision', level: 90 },
        { name: 'Natural Language Processing', level: 88 },
        { name: 'Vision-Language Transformers', level: 92 },
        { name: 'Explainable AI', level: 85 }
      ]
    },
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript', level: 85 },
        { name: 'R', level: 80 },
        { name: 'MATLAB', level: 75 },
        { name: 'C++', level: 70 }
      ]
    },
    {
      title: 'Frameworks & Tools',
      icon: Zap,
      skills: [
        { name: 'TensorFlow', level: 90 },
        { name: 'PyTorch', level: 92 },
        { name: 'React', level: 85 },
        { name: 'Docker', level: 80 },
        { name: 'Git', level: 88 }
      ]
    },
    {
      title: 'Data & Analytics',
      icon: Database,
      skills: [
        { name: 'Data Analysis', level: 90 },
        { name: 'Statistical Modeling', level: 88 },
        { name: 'Big Data Processing', level: 82 },
        { name: 'Data Visualization', level: 85 },
        { name: 'SQL', level: 80 }
      ]
    }
  ];

  return (
    <section className="pt-8 pb-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expertise in cutting-edge technologies and methodologies in AI, machine learning, and software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center mr-2">
                    <IconComponent className="w-3 h-3 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <motion.div
                          className="bg-pink-500 h-1 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;