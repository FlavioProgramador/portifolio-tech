'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SystemStatus.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaServer, FaCoffee, FaBug } from 'react-icons/fa';

export default function SystemStatus() {
  const { dict } = useLanguage();
  const [uptime, setUptime] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${d}d ${h}h ${m}m ${s}s`;
  };

  if (isClosed) return null;

  return (
    <motion.div
      className={`${styles.widgetContainer} ${isMinimized ? styles.minimized : ''}`}
      initial={{ opacity: 0, x: 28, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      layout
    >
      <div className={styles.widgetHeader}>
        <div className={styles.headerLeft}>
          <motion.div
            className={styles.pulseDot}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>{dict.status.status}</span>
        </div>
        <div className={styles.controls}>
          <motion.button
            onClick={() => setIsMinimized(!isMinimized)}
            className={styles.controlBtn}
            title="Minimizar"
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.92 }}
          >
            {isMinimized ? '+' : '-'}
          </motion.button>
          <motion.button
            onClick={() => setIsClosed(true)}
            className={styles.controlBtn}
            title="Fechar"
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.92 }}
          >
            &times;
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {!isMinimized && (
          <motion.div
            className={styles.widgetBody}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div className={styles.statRow} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 }}>
              <FaServer className={styles.icon} />
              <span>{dict.status.uptime}: </span>
              <span className={styles.value}>{formatUptime(uptime + 86400 * 15 + 3600 * 4)}</span>
            </motion.div>
            <motion.div className={styles.statRow} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
              <FaCoffee className={styles.icon} />
              <span>{dict.status.coffee}: </span>
              <span className={styles.value}>1,402</span>
            </motion.div>
            <motion.div className={styles.statRow} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
              <FaBug className={styles.icon} />
              <span>{dict.status.bugs}: </span>
              <span className={styles.value}>47</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
