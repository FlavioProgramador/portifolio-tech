'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import styles from './Contact.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

const outputVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const outputItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 }
};

export default function Contact() {
  const { dict } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = dict.contact.terminal.install;
  const emailHref = 'mailto:flavionegocios2004@gmail.com';
  const githubHref = 'https://github.com/FlavioProgramador';
  const linkedinHref = 'https://www.linkedin.com/in/flavio-costa-8aaa71377/';
  const whatsappHref = 'https://wa.me/5521983646126';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i += 1;
      if (i > fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: messageBody })
      });
      const json = await res.json() as { error?: string };

      if (res.ok) {
        setStatusMsg('Mensagem enviada com sucesso!');
        setName('');
        setEmail('');
        setMessageBody('');
      } else {
        setStatusMsg(json.error || 'Erro ao enviar mensagem');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Erro de rede ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.contact} id="contato">
      <motion.div
        className={styles.terminalContainer}
        initial={{ opacity: 0, y: 42, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className={styles.terminalHeader}>
          <div className={`${styles.dot} ${styles.dotRed}`}></div>
          <div className={`${styles.dot} ${styles.dotYellow}`}></div>
          <div className={`${styles.dot} ${styles.dotGreen}`}></div>
          <div className={styles.terminalTitle}>bash - {dict.contact.terminal.user}:~</div>
        </div>
        <div className={styles.terminalBody}>
          <div className={styles.commandLine}>
            <span className={styles.prompt}>{dict.contact.terminal.user}:~$</span>
            <span className={styles.typing}>{typedText}</span>
            <span className={styles.cursor}></span>
          </div>

          <motion.div
            className={styles.output}
            variants={outputVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p className={styles.outputSuccess} variants={outputItem}>
              {dict.contact.terminal.success}
            </motion.p>
            <motion.p className={styles.outputInfo} variants={outputItem}>
              {dict.contact.terminal.info}
            </motion.p>

            <motion.div className={styles.actionGrid} variants={outputItem}>
              <motion.a href={emailHref} className={styles.actionBtn} whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.email}
              </motion.a>
              <motion.a href={githubHref} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.github}
              </motion.a>
              <motion.a href={linkedinHref} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.linkedin}
              </motion.a>
              <motion.a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.whatsapp}
              </motion.a>
            </motion.div>

            <motion.div
              variants={outputItem}
              style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem' }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 1, padding: '0.6rem' }} required />
                  <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, padding: '0.6rem' }} required />
                </div>
                <div>
                  <textarea placeholder="Mensagem" value={messageBody} onChange={(e) => setMessageBody(e.target.value)} rows={4} style={{ width: '100%', padding: '0.6rem' }} required />
                </div>
                <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <motion.button type="submit" className={styles.actionBtn} disabled={sending} whileTap={{ scale: 0.97 }}>
                    {sending ? 'Enviando...' : 'Enviar Mensagem'}
                  </motion.button>
                  <AnimatePresence>
                    {statusMsg && (
                      <motion.span
                        style={{ color: '#9be7c4' }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        {statusMsg}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className={styles.footerText}>
          {`console.log("${dict.contact.footer} \u2665 por Fl\u00e1vio da Costa Marques \u00b7 ${new Date().getFullYear()}");`}
        </span>
      </motion.footer>
    </section>
  );
}
