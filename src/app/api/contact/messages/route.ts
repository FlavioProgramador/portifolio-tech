import { NextResponse } from 'next/server';
import { listContactMessages } from '@/lib/contact-messages';

export async function GET() {
  try {
    const messages = await listContactMessages();
    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error('Failed to load contact messages', err);
    return NextResponse.json({ messages: [] });
  }
}
