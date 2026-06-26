import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const SkillsRadar = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const skills = [
    { name: 'Machine Learning', level: 95, angle: 0 },
    { name: 'Deep Learning', level: 92, angle: 60 },
    { name: 'Computer Vision', level: 90, angle: 120 },
    { name: 'NLP', level: 88, angle: 180 },
    { name: 'Python/PyTorch', level: 94, angle: 240 },
    { name: 'Research', level: 96, angle: 300 }
  ];

  const getPosition = (angle, radius) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  return (
    <div ref={ref} className="relative w-80 h-80 mx-auto">
      {/* Radar Grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="-150 -150 300 300">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((radius) => (
          <circle
            key={radius}
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="1"
          />
        ))}
        
        {/* Grid lines */}
        {skills.map((skill) => {
          const pos = getPosition(skill.angle, 100);
          return (
            <line
              key={skill.angle}
              x1="0"
              y1="0"
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill points */}
        {skills.map((skill, index) => {
          const pos = getPosition(skill.angle, skill.level);
          return (
            <motion.circle
              key={skill.name}
              cx={pos.x}
              cy={pos.y}
              r="4"
              fill="#3b82f6"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          );
        })}

        {/* Connecting polygon */}
        <motion.polygon
          points={skills.map(skill => {
            const pos = getPosition(skill.angle, skill.level);
            return `${pos.x},${pos.y}`;
          }).join(' ')}
          fill="rgba(59, 130, 246, 0.1)"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>

      {/* Skill labels */}
      {skills.map((skill, index) => {
        const labelPos = getPosition(skill.angle, 120);
        return (
          <motion.div
            key={skill.name}
            className="absolute text-xs text-gray-300 font-medium"
            style={{
              left: `calc(50% + ${labelPos.x}px)`,
              top: `calc(50% + ${labelPos.y}px)`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.8 }}
          >
            {skill.name}
            <div className="text-primary-400 font-bold">{skill.level}%</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsRadar;