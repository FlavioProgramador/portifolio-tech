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

const panelContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const panelItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const pillContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.035 }
  }
};

const pillItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

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

      <motion.div
        className={styles.container}
        variants={panelContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div 
          className={styles.categoryPanel}
          variants={panelItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ y: -8, scale: 1.01 }}
        >
          <h3 className={styles.categoryTitle}>Frontend</h3>
          <motion.div className={styles.pillContainer} variants={pillContainer}>
            {frontendSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                className={styles.pill}
                variants={pillItem}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.categoryPanel}
          variants={panelItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ y: -8, scale: 1.01 }}
        >
          <h3 className={styles.categoryTitle}>Backend</h3>
          <motion.div className={styles.pillContainer} variants={pillContainer}>
            {backendSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                className={styles.pill}
                variants={pillItem}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.categoryPanel}
          variants={panelItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ y: -8, scale: 1.01 }}
        >
          <h3 className={styles.categoryTitle}>Ferramentas</h3>
          <motion.div className={styles.pillContainer} variants={pillContainer}>
            {toolsSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                className={styles.pill}
                variants={pillItem}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.marqueeWrapper}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
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
      </motion.div>
    </section>
  );
}
