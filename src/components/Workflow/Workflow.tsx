'use client';

import { motion } from 'framer-motion';
import styles from './Workflow.module.css';
import { FaLightbulb, FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Workflow() {
  const { dict } = useLanguage();
  
  const steps = [
    {
      icon: <FaLightbulb />,
      title: dict.workflow.ideation.title,
      description: dict.workflow.ideation.desc,
    },
    {
      icon: <FaPaintBrush />,
      title: dict.workflow.design.title,
      description: dict.workflow.design.desc,
    },
    {
      icon: <FaCode />,
      title: dict.workflow.code.title,
      description: dict.workflow.code.desc,
    },
    {
      icon: <FaRocket />,
      title: dict.workflow.delivery.title,
      description: dict.workflow.delivery.desc,
    }
  ];

  return (
    <section className={styles.workflow} id="workflow">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.workflow.title}
      </motion.h2>

      <div className={styles.grid}>
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={styles.iconWrapper}>
              {step.icon}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
