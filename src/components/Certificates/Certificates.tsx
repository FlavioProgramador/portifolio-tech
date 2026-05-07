'use client';

import { motion } from 'framer-motion';
import styles from './Certificates.module.css';
import { FaAward, FaCertificate } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const getIcon = (index: number) => {
  return index % 2 === 0 ? <FaAward /> : <FaCertificate />;
};

export default function Certificates() {
  const { dict } = useLanguage();
  
  const certificates = dict.certificates.items.map((item: any, i: number) => ({
    ...item,
    icon: getIcon(i)
  }));

  return (
    <section className={styles.certificates} id="certificados">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.certificates.title}
      </motion.h2>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {/* Duplicamos o array para criar o efeito de scroll infinito */}
          {certificates.concat(certificates).map((cert, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardContent}>
                <div className={styles.icon}>{cert.icon}</div>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <span className={styles.certIssuer}>{cert.issuer}</span>
                <span className={styles.certDate}>{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
