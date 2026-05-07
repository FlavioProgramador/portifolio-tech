'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ContactMessage } from '@/lib/contact-messages';

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact/messages')
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages || []);
      })
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: '4rem 10%' }}>
      <h1>Mensagens recebidas</h1>
      <p><Link href="/">Voltar ao site</Link></p>

      {loading && <p>Carregando...</p>}

      {!loading && messages.length === 0 && (
        <p>Nenhuma mensagem encontrada.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{m.name} &lt;{m.email}&gt;</strong>
              <small>{new Date(m.receivedAt).toLocaleString()}</small>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>{m.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
