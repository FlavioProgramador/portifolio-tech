'use client';

import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt, FaBootstrap } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiPostgresql, SiTailwindcss, SiFigma, SiJavascript, SiDjango, SiExpress, SiMysql } from 'react-icons/si';
import { DiMsqlServer, DiSqllite } from 'react-icons/di';

const frontendSkills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Bootstrap', icon: <FaBootstrap /> },
];

const backendSkills = [
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express', icon: <SiExpress /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Django', icon: <SiDjango /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'SQL Server', icon: <DiMsqlServer /> },
  { name: 'SQLite', icon: <DiSqllite /> },
];

const toolsSkills = [
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'GitHub', icon: <FaGitAlt /> },
  { name: 'Figma', icon: <SiFigma /> },
];

// Array dobrado para o efeito de loop infinito no Marquee
const allSkills = [...frontendSkills, ...backendSkills, ...toolsSkills];

export default function Skills() {
  const { dict } = useLanguage();
  return (
    <section className={styles.skills} id="skills">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.skills.title}
      </motion.h2>

      <div className={styles.container}>
        <motion.div 
          className={styles.categoryPanel}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className={styles.categoryTitle}>Frontend</h3>
          <div className={styles.pillContainer}>
            {frontendSkills.map((skill, idx) => (
              <div key={idx} className={styles.pill}>
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.categoryPanel}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className={styles.categoryTitle}>Backend & Banco de Dados</h3>
          <div className={styles.pillContainer}>
            {backendSkills.map((skill, idx) => (
              <div key={idx} className={styles.pill}>
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.categoryPanel}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className={styles.categoryTitle}>Ferramentas</h3>
          <div className={styles.pillContainer}>
            {toolsSkills.map((skill, idx) => (
              <div key={idx} className={styles.pill}>
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {[...allSkills, ...allSkills].map((skill, idx) => (
            <div key={idx} className={styles.marqueeItem}>
              <span 
                className={styles.marqueeIcon} 
                style={{ color: `hsl(${(idx * 15) % 360}, 70%, 60%)` }}
              >
                {skill.icon}
              </span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
