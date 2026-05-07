'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SplashScreen.module.css';

const LOGS = [
  '> Inicializando sistema...',
  '> Carregando m\u00f3dulos do kernel...',
  '> Estabelecendo conex\u00e3o segura...',
  '> Resolvendo depend\u00eancias...',
  '> Acesso concedido. Bem-vindo, visitante!'
];

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Sequentially show logs
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < LOGS.length - 1) return prev + 1;
        clearInterval(textInterval);
        return prev;
      });
    }, 400);

    // Unmount splash screen after ~2.5 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 2800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.splash}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={styles.terminal}>
            <div className={styles.header}>
              <div className={`${styles.dot} ${styles.red}`}></div>
              <div className={`${styles.dot} ${styles.yellow}`}></div>
              <div className={`${styles.dot} ${styles.green}`}></div>
            </div>
            <div className={styles.body}>
              {LOGS.slice(0, textIndex + 1).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={styles.logLine}
                >
                  {log}
                </motion.div>
              ))}
              <span className={styles.cursor}></span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
