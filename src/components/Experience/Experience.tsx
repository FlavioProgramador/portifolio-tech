'use client';

import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Experience.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

type ExperienceItem = {
  title: string;
  org: string;
  date: string;
  desc: string;
};

function createCommitHash(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash.toString(16).padStart(7, '0').slice(0, 7);
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dict } = useLanguage();
  const hashes = useMemo(
    () => dict.experience.items.map((item) => createCommitHash(`${item.title}-${item.org}-${item.date}`)),
    [dict.experience.items]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className={styles.experience} id="experiencia">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.experience.title} <span className={styles.gitBranch}>[ main ]</span>
      </motion.h2>

      <div className={styles.timelineContainer} ref={containerRef} style={{ position: 'relative' }}>
        {/* Background dark line */}
        <div className={styles.timelineTrack}></div>
        {/* Animated glowing line */}
        <motion.div 
          className={styles.timelineProgress} 
          style={{ height: lineHeight }}
        />

        {dict.experience.items.map((item: ExperienceItem, index: number) => (
          <div key={index} className={styles.itemWrapper}>
            <motion.div 
              className={styles.gitNode}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className={styles.innerNode}></div>
            </motion.div>
            
            {/* Branch connection line */}
            <motion.div 
              className={styles.branchLine}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />

            <motion.div 
              className={styles.content}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.commitHeader}>
                <span className={styles.commitHash}>
                  commit {hashes[index] || 'loading'}
                </span>
                <span className={styles.branchTag}>{index === 0 ? 'feature/education' : index === 1 ? 'release/v1' : 'main'}</span>
              </div>
              
              <h3 className={styles.role}>{item.title}</h3>
              <span className={styles.company}>
                {item.org} · {item.date}
              </span>
              
              <p className={styles.description}>
                {item.desc}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
