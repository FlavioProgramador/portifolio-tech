'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Contact.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { dict } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = dict.contact.terminal.install;
  const emailHref = 'mailto:flavionegocios2004@gmail.com';
  const githubHref = 'https://github.com/FlavioProgramador';
  const linkedinHref = 'https://www.linkedin.com/in/flavio-costa-8aaa71377/';
  const whatsappHref = 'https://wa.me/5521983646126';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className={styles.contact} id="contato">
      <div className={styles.terminalContainer}>
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            <p className={styles.outputSuccess}>{dict.contact.terminal.success}</p>
            <p className={styles.outputInfo}>{dict.contact.terminal.info}</p>
            
            <div className={styles.actionGrid}>
              <a href={emailHref} className={styles.actionBtn}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.email}
              </a>
              <a href={githubHref} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.github}
              </a>
              <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.linkedin}
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                <span className={styles.btnPrefix}>&gt;</span> {dict.contact.terminal.whatsapp}
              </a>
            </div>

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem' }}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                setStatusMsg(null);
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message: messageBody })
                  });
                  const json = await res.json();
                  if (res.ok) {
                    setStatusMsg('Mensagem enviada com sucesso!');
                    setName(''); setEmail(''); setMessageBody('');
                  } else {
                    setStatusMsg(json.error || 'Erro ao enviar mensagem');
                  }
                } catch (err) {
                  console.error(err);
                  setStatusMsg('Erro de rede ao enviar mensagem');
                } finally {
                  setSending(false);
                }
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: '0.6rem' }} required />
                  <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, padding: '0.6rem' }} required />
                </div>
                <div>
                  <textarea placeholder="Mensagem" value={messageBody} onChange={e => setMessageBody(e.target.value)} rows={4} style={{ width: '100%', padding: '0.6rem' }} required />
                </div>
                <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <button type="submit" className={styles.actionBtn} disabled={sending}>
                    {sending ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                  {statusMsg && <span style={{ color: '#9be7c4' }}>{statusMsg}</span>}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerText}>
          {`console.log("${dict.contact.footer} ♥ por Flávio da Costa Marques · ${new Date().getFullYear()}");`}
        </span>
      </footer>
    </section>
  );
}
