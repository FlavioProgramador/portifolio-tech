'use client';

import { useState, useEffect } from 'react';
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
    <div className={`${styles.widgetContainer} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.widgetHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.pulseDot}></div>
          <span>{dict.status.status}</span>
        </div>
        <div className={styles.controls}>
          <button onClick={() => setIsMinimized(!isMinimized)} className={styles.controlBtn} title="Minimizar">
            {isMinimized ? '+' : '−'}
          </button>
          <button onClick={() => setIsClosed(true)} className={styles.controlBtn} title="Fechar">
            &times;
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className={styles.widgetBody}>
        <div className={styles.statRow}>
          <FaServer className={styles.icon} />
          <span>{dict.status.uptime}: </span>
          <span className={styles.value}>{formatUptime(uptime + 86400 * 15 + 3600 * 4)}</span>
        </div>
        <div className={styles.statRow}>
          <FaCoffee className={styles.icon} />
          <span>{dict.status.coffee}: </span>
          <span className={styles.value}>1,402</span>
        </div>
        <div className={styles.statRow}>
          <FaBug className={styles.icon} />
          <span>{dict.status.bugs}: </span>
          <span className={styles.value}>47</span>
        </div>
      </div>
      )}
    </div>
  );
}
