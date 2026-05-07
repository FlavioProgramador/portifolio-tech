'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import { FaTerminal, FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOS } from '@/components/OSWrapper/OSWrapper';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHackerTheme, setIsHackerTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage: switchLang, dict } = useLanguage();
  const { toggleMinimize, closeOS } = useOS();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isHackerTheme) {
      document.body.classList.remove('theme-hacker');
    } else {
      document.body.classList.add('theme-hacker');
    }
    setIsHackerTheme(!isHackerTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: dict.nav.about, href: '#sobre' },
    { name: dict.nav.skills, href: '#skills' },
    { name: dict.nav.trajectory, href: '#experiencia' },
    { name: dict.nav.projects, href: '#projetos' },
    { name: dict.nav.contact, href: '#contato' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.osControls}>
        <button className={`${styles.osBtn} ${styles.osRed}`} onClick={closeOS} title="Desligar"></button>
        <button className={`${styles.osBtn} ${styles.osYellow}`} onClick={toggleMinimize} title="Minimizar"></button>
        <button className={`${styles.osBtn} ${styles.osGreen}`} title="Maximizar"></button>
      </div>

      <div className={styles.logo}>
        <span className="text-gradient">{'Flavio.dev'}</span>
      </div>
      
      {/* Desktop Menu */}
      <div className={styles.desktopMenu}>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.name}><a href={link.href}>{link.name}</a></li>
          ))}
        </ul>
        <button 
          className={styles.langToggle} 
          onClick={switchLang}
          title="Change Language"
        >
          {language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
        </button>
        <button 
          className={`${styles.themeToggle} ${isHackerTheme ? styles.hackerActive : ''}`} 
          onClick={toggleTheme}
          title={dict.nav.hackerMode}
        >
          <FaTerminal />
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <button className={styles.mobileToggle} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileNavLinks}>
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length }}
              >
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className={styles.langToggleMobile} 
                    onClick={() => { switchLang(); setIsMobileMenuOpen(false); }}
                  >
                    {language === 'pt' ? '🇺🇸 Switch to EN' : '🇧🇷 Mudar para PT'}
                  </button>
                  <button 
                    className={`${styles.themeToggleMobile} ${isHackerTheme ? styles.hackerActive : ''}`} 
                    onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                  >
                    <FaTerminal /> {dict.nav.hackerMode}
                  </button>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
