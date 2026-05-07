'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaPowerOff } from 'react-icons/fa';

interface OSContextType {
  isMinimized: boolean;
  isClosed: boolean;
  toggleMinimize: () => void;
  closeOS: () => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function useOS() {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within OSWrapper");
  return context;
}

export default function OSWrapper({ children }: { children: ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    // Remove scroll when minimized
    if (!isMinimized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeOS = () => {
    setIsClosed(true);
    document.body.style.overflow = 'hidden';
  };

  const turnOn = () => {
    setIsClosed(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <OSContext.Provider value={{ isMinimized, toggleMinimize, isClosed, closeOS }}>
      <motion.div
        animate={{
          scale: isMinimized ? 0 : 1,
          y: isMinimized ? '50vh' : 0,
          opacity: isMinimized ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ originY: 1, originX: 0.5, transformOrigin: "bottom center" }}
      >
        {!isClosed && children}
      </motion.div>

      <AnimatePresence>
        {isClosed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              zIndex: 999999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333'
            }}
          >
            <motion.button
              onClick={turnOn}
              whileHover={{ scale: 1.1, color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                fontSize: '4rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              title="Ligar Sistema"
            >
              <FaPowerOff />
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                marginTop: '2rem',
                fontFamily: 'var(--font-fira)',
                fontSize: '0.9rem',
                color: '#555',
                letterSpacing: '2px'
              }}
            >
              NO SIGNAL
            </motion.p>
          </motion.div>
        )}

        {isMinimized && !isClosed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              cursor: 'pointer',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-cyan)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
            onClick={toggleMinimize}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 243, 255, 0.4)' }}
            whileTap={{ scale: 0.9 }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              <FaExpand />
            </div>
            <span style={{ fontFamily: 'var(--font-fira)', fontSize: '0.8rem', fontWeight: 'bold' }}>Flavio.dev</span>
          </motion.div>
        )}
      </AnimatePresence>
    </OSContext.Provider>
  );
}
