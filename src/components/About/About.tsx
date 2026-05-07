'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaLanguage, FaDownload, FaClock, FaCoffee, FaMusic } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { dict, language } = useLanguage();
  const cvHref = language === 'pt' ? '/CV/curriculoPT.pdf' : '/CV/curriculoEN.pdf';

  return (
    <section className={styles.about} id="sobre">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.about.title}
      </motion.h2>

      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <p>{dict.about.p3}</p>
          
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>{dict.about.projects}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>2+</span>
              <span className={styles.statLabel}>{dict.about.years}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>{dict.about.techs}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>{dict.about.dedication}</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.rightColumn}>
          <motion.div 
            className={styles.infoCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.infoIcon} />
            <span>{dict.about.location}</span>
          </div>
          <div className={styles.infoItem}>
            <FaGraduationCap className={styles.infoIcon} />
            <span>{dict.about.education}</span>
          </div>
          <div className={styles.infoItem}>
            <FaBriefcase className={styles.infoIcon} />
            <span>{dict.about.job}</span>
          </div>
          <div className={styles.infoItem}>
            <FaLanguage className={styles.infoIcon} />
            <span>{dict.about.language}</span>
          </div>
          
          <motion.a 
            href={cvHref} 
            className={styles.cvButton}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            download={language === 'pt' ? 'curriculoPT.pdf' : 'curriculoEN.pdf'}
          >
            <FaDownload /> {dict.about.downloadCV}
          </motion.a>
        </motion.div>

        <motion.div 
          className={styles.lifestyleCard}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.lifestyleGrid}>
            <div className={styles.lifestyleBox}>
              <FaClock className={styles.lifestyleIcon} />
              <div className={styles.lifestyleInfo}>
                <span className={styles.lifestyleLabel}>Fuso Horário</span>
                <span className={styles.lifestyleValue}>UTC-3 (Brasil)</span>
              </div>
            </div>
            
            <div className={styles.lifestyleBox}>
              <FaCoffee className={styles.lifestyleIcon} />
              <div className={styles.lifestyleInfo}>
                <span className={styles.lifestyleLabel}>Combustível</span>
                <span className={styles.lifestyleValue}>Café Expresso</span>
              </div>
            </div>

            <div className={styles.lifestyleBox}>
              <FaMusic className={styles.lifestyleIcon} />
              <div className={styles.lifestyleInfo}>
                <span className={styles.lifestyleLabel}>Ouvindo Agora</span>
                <span className={styles.lifestyleValue}>Lofi & Synthwave</span>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
