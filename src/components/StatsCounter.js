import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const StatsCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsDashboard = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    {
      value: 25,
      suffix: '+',
      label: 'Publications',
      description: 'Peer-reviewed papers',
      color: 'from-primary-400 to-primary-600'
    },
    {
      value: 500,
      suffix: '+',
      label: 'Citations',
      description: 'Research impact',
      color: 'from-grido-purple to-grido-pink'
    },
    {
      value: 15,
      suffix: '+',
      label: 'Students',
      description: 'MSc supervision',
      color: 'from-accent-500 to-accent-400'
    },
    {
      value: 5,
      suffix: '+',
      label: 'Years',
      description: 'Research experience',
      color: 'from-grido-blue to-primary-500'
    }
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="grido-card rounded-2xl p-6 text-center border border-primary-500/20"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
            <div className="text-2xl font-bold text-white">
              <StatsCounter end={stat.value} suffix={stat.suffix} />
            </div>
          </div>
          <h4 className="text-lg font-bold text-white mb-1">{stat.label}</h4>
          <p className="text-gray-400 text-sm">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsDashboard;