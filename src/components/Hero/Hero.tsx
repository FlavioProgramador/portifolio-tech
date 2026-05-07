'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './Hero.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ROLES = ["Full Stack", "Front-end", "Back-end"];
const FLOATING_ELEMENTS = [
  { label: '< />', y: -34, x: 18, rotate: 72, duration: 8.5, delay: 0.1 },
  { label: '{ }', y: -58, x: -16, rotate: 135, duration: 10.2, delay: 0.6 },
  { label: '[ ]', y: -42, x: 22, rotate: 96, duration: 7.8, delay: 1.1 },
  { label: '()', y: -64, x: -24, rotate: 168, duration: 11.4, delay: 0.3 },
  { label: '=>', y: -50, x: 12, rotate: 118, duration: 9.6, delay: 1.8 },
  { label: ';;', y: -28, x: -18, rotate: 54, duration: 6.9, delay: 2.4 }
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { dict } = useLanguage();

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const currentRole = ROLES[currentRoleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setCurrentText(
          currentRole.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30, // max rotation 15deg
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  } satisfies Variants;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.backgroundGlow} />
      
      {/* Many Floating Elements for Depth */}
      {FLOATING_ELEMENTS.map((element, i) => (
        <motion.div 
          key={i}
          className={`${styles.floatingElement} ${styles[`float${i+1}`]}`}
          animate={{ 
            y: [0, element.y, 0],
            x: [0, element.x, 0],
            rotate: [0, element.rotate, 0]
          }}
          transition={{ 
            duration: element.duration, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: element.delay
          }}
        >
          {element.label}
        </motion.div>
      ))}

      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className={styles.greeting}>
            {dict.hero.greeting.toUpperCase()}
          </motion.span>
          
          <motion.h1 variants={itemVariants} className={styles.title}>
            Flávio da Costa<br/>
            <span className={styles.titleHighlight}>Marques</span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className={styles.subtitle}>
            {dict.hero.rolePrefix} <span className="text-gradient">{currentText}</span><span className={styles.cursor}>|</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className={styles.description}>
            {dict.hero.description}
          </motion.p>
          
          <motion.div variants={itemVariants} className={styles.ctaContainer}>
            <motion.a 
              href="#projetos" 
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 243, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              {dict.hero.ctaProjects}
            </motion.a>
            <motion.a 
              href="#contato" 
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              {dict.hero.ctaContact}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.5, delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          }}
        >
          <div className={styles.imageWrapper}>
            {/* Efeito de brilho super animado ao fundo */}
            <motion.div 
              className={styles.imageGlow}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.9, 0.6],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Foto e sobreposições */}
            <motion.div
              className={styles.imageInner}
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image 
                src="/minhafoto.png" 
                alt="Flávio da Costa Marques" 
                width={500} 
                height={500}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageOverlay} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
