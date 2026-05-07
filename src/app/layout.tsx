import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor/Cursor';
import SplashScreen from '@/components/SplashScreen/SplashScreen';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ParticlesBackground from '@/components/ParticlesBackground/ParticlesBackground';
import SystemStatus from '@/components/SystemStatus/SystemStatus';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira' });

export const metadata: Metadata = {
  title: 'Flávio da Costa Marques | Dev Fullstack',
  description: 'Portfólio de Flávio da Costa Marques. Projetos em React, Node, Python, Django e mais.',
  openGraph: {
    title: 'Flávio da Costa Marques | Desenvolvedor Fullstack',
    description: 'Transformo ideias em código limpo e eficiente. Veja meus projetos, trajetória e skills.',
    url: 'https://flavio.dev',
    siteName: 'Flávio.dev',
    images: [
      {
        url: 'https://flavio.dev/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flávio da Costa Marques | Dev Fullstack',
    description: 'Criando experiências digitais focadas em alta performance e escalabilidade.',
    images: ['https://flavio.dev/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${firaCode.variable}`}>
      <body>
        <LanguageProvider>
          <ParticlesBackground />
          <SplashScreen />
          <ScrollProgress />
          <Cursor />
          <SystemStatus />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
