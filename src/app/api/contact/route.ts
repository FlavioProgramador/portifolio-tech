export const runtime = 'nodejs';

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { storeContactMessage } from '@/lib/contact-messages';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.TO_EMAIL;

    if (host && port && user && pass && to) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
      });

      const mail = {
        from: `"Portfolio Site" <${user}>`,
        replyTo: email,
        to,
        subject: `Contato do site — ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
        html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`
      };

      await transporter.sendMail(mail);
    }

    const storage = await storeContactMessage({
      name,
      email,
      message,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true, emailed: Boolean(host && port && user && pass && to), storage });
  } catch (err: any) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
