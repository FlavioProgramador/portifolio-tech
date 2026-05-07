'use client';

import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const { dict } = useLanguage();

  return (
    <section className={styles.testimonials} id="recomendacoes">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.testimonials.title}
      </motion.h2>

      <div className={styles.grid}>
        {dict.testimonials.items.map((item: any, index: number) => (
          <motion.div 
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={styles.iconWrapper}>
              <FaQuoteLeft />
            </div>
            <p className={styles.text}>{item.text}</p>
            <div className={styles.author}>
              <div className={styles.avatar}>
                {item.name.charAt(0)}
              </div>
              <div className={styles.authorInfo}>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
