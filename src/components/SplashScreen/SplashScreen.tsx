'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const logs = [
    '> Inicializando sistema...',
    '> Carregando módulos do kernel...',
    '> Estabelecendo conexão segura...',
    '> Resolvendo dependências...',
    '> Acesso concedido. Bem-vindo, visitante!'
  ];

  useEffect(() => {
    // Sequentially show logs
    const textInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < logs.length - 1) return prev + 1;
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
              {logs.slice(0, textIndex + 1).map((log, index) => (
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
