'use client';

import { motion } from 'framer-motion';
import styles from './Workflow.module.css';
import { FaLightbulb, FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

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

      <motion.div
        className={styles.grid}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className={styles.card}
            variants={cardVariants}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -10, scale: 1.025 }}
            whileTap={{ scale: 0.99 }}
          >
            <motion.div
              className={styles.iconWrapper}
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
              transition={{ duration: 0.45 }}
            >
              {step.icon}
            </motion.div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
