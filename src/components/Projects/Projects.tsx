'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const projectsData = [
  {
    title: 'Sim Aceito',
    description: 'Plataforma completa para gestão de casamentos. Controle orçamentos, contratos, convidados e calendário em um só lugar.',
    tech: ['Django', 'PostgreSQL', 'HTMX', 'CSS', 'JS'],
    github: 'https://github.com/FlavioProgramador/Sim-Aceito-Wedding-Management',
    demo: '#',
    images: [
      '/projects/simaceito/hero.jpg',
      '/projects/simaceito/simaceitocalendario.jpg',
      '/projects/simaceito/simaceitocontratos.jpg',
      '/projects/simaceito/simaceitoitens.jpg',
      '/projects/simaceito/simaceitoorcamento.jpg',
      '/projects/simaceito/simaceitomeuscasamentos.jpg'
    ]
  },
  {
    title: 'MeteoHUB',
    description: 'Site de busca de condições climáticas em tempo real com interface moderna e responsiva.',
    tech: ['React 18', 'TypeScript', 'Vite', 'Axios', 'Recharts'],
    github: 'https://github.com/FlavioProgramador/MeteoHUB',
    demo: '#',
    video: '/projects/meteohub/meteohubvvideo.mp4'
  },
  {
    title: 'TecnoBoard',
    description: 'Dashboard interativo com foco na visualização de dados e análise de performance, construído com foco na usabilidade.',
    tech: ['React 19', 'Vite 7', 'CSS Modules'],
    github: 'https://github.com/FlavioProgramador/Tecboard',
    demo: '#',
    video: '/projects/tecnoboard/tecnoboardvideo.mp4'
  },
  {
    title: 'Jornada Viagens',
    description: 'Plataforma para planejamento e exploração de pacotes de viagens, com foco em uma experiência de usuário imersiva.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/FlavioProgramador/jornada-viagens',
    demo: '#',
    video: '/projects/jornadaviagens/jornadaviagensvideo.mp4'
  },
  {
    title: 'Gestão de Ativos Dress',
    description: 'Sistema completo para gerenciamento e controle de ativos, facilitando a visualização e manutenção.',
    tech: ['Next.js', 'Prisma ORM', 'Express'],
    github: 'https://github.com/FlavioProgramador/gestao-de-ativos-dress',
    demo: '#',
    video: '/projects/gestaoativos/gestaoativo.mp4'
  },
  {
    title: 'Controle de Notas',
    description: 'Sistema web para gerenciamento e controle de notas com interface amigável e relatórios detalhados.',
    tech: ['Django', 'SQLite', 'Html','Css', 'JavaScript'],
    github: 'https://github.com/FlavioProgramador/controle-nota-vencimento-dress',
    demo: '#',
    images: [
      '/projects/controlenotas/controlenmotas1.jpeg',
      '/projects/controlenotas/controlenmotas2.jpeg.png',
      '/projects/controlenotas/controlenotas3.png'
    ]
  },
  {
    title: 'Gerenciador de Tarefas',
    description: 'Aplicação para organizar tarefas com foco em produtividade, prioridades e acompanhamento de status.',
    tech: ['React', 'TypeScript', 'CSS Modules'],
    github: 'https://github.com/FlavioProgramador/todo-list-react',
    demo: '#',
    images: [
      '/projects/todo/todo1.jpg'
    ]
  },
    {
    title: 'Ignite Feed',
    description: 'Blog de postagems com sistema de comentários e reações, construído com foco em performance e experiência do usuário.',
    tech: ['React', 'JavaScript', 'CSS Modules'],
    github: 'https://github.com/FlavioProgramador/Ignite-Feed',
    demo: '#',
    images: [
      '/projects/Ignitefeed/ignitefeed.png'
    ]
  },
];

function ProjectSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500); // changes every 3.5 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.sliderContainer}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={styles.slide}
        >
          <Image 
            src={images[currentIndex]} 
            alt="Screenshot do Projeto" 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.projectImage} 
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProjectVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isVisible) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div className={styles.sliderContainer}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className={styles.projectVideo}
        aria-label={`Preview do projeto ${title}`}
      />
    </div>
  );
}

export default function Projects() {
  const { dict } = useLanguage();
  
  const projects = projectsData.map((proj, i) => ({
    ...proj,
    title: dict.projects.items[i]?.title || proj.title,
    description: dict.projects.items[i]?.description || proj.description
  }));

  return (
    <section className={styles.projects} id="projetos">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {dict.projects.title}
      </motion.h2>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* macOS Terminal Header */}
            <div className={styles.terminalHeader}>
              <div className={`${styles.dot} ${styles.dotRed}`}></div>
              <div className={`${styles.dot} ${styles.dotYellow}`}></div>
              <div className={`${styles.dot} ${styles.dotGreen}`}></div>
            </div>

            {/* Slider, Video or Placeholder */}
            {project.video ? (
              <ProjectVideo src={project.video} title={project.title} />
            ) : project.images ? (
              <ProjectSlider images={project.images} />
            ) : (
              <div className={styles.codePlaceholder}>
                <span>{`GET /projects/${project.title.toLowerCase().replace(/ /g, '-')}`}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{`// ${dict.projects.status}`}</span>
                <span style={{ color: 'var(--accent-purple)' }}>{`{`}</span>
                <span style={{ marginLeft: '1rem', color: 'var(--text-primary)' }}>{`"status": "online",`}</span>
                <span style={{ marginLeft: '1rem', color: 'var(--text-primary)' }}>{`"type": "repository"`}</span>
                <span style={{ color: 'var(--accent-purple)' }}>{`}`}</span>
              </div>
            )}

            <div className={styles.content}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              
              <div className={styles.techList}>
                {project.tech.map((tech, i) => (
                  <span key={i} className={styles.tech}>{tech}</span>
                ))}
              </div>
              
              <div className={styles.links}>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> {dict.projects.repo}
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> {dict.projects.demo}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
