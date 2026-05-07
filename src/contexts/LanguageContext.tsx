'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { pt } from '@/locales/pt';
import { en } from '@/locales/en';

type Language = 'pt' | 'en';
type Dictionary = typeof pt;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const dict = language === 'pt' ? pt : en;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
