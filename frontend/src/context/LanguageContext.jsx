import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LANGUAGES, translations } from '../utils/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'organ_donor_language';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Could not read language from localStorage', e);
    }
    return 'en';
  });

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const setLanguage = useCallback((newLang) => {
    if (!LANGUAGES.some(l => l.code === newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }

    // Update document attributes for accessibility and RTL
    const langObj = LANGUAGES.find(l => l.code === newLang);
    if (langObj) {
      document.documentElement.lang = langObj.code;
      document.documentElement.dir = langObj.dir || 'ltr';
    }

    // Trigger Google Translate synchronization if active
    try {
      const gtCookie = `/auto/${newLang}`;
      document.cookie = `googtrans=${gtCookie}; path=/;`;
      document.cookie = `googtrans=${gtCookie}; path=/; domain=.${window.location.hostname};`;
      
      const gtCombo = document.querySelector('.goog-te-combo');
      if (gtCombo) {
        gtCombo.value = newLang;
        gtCombo.dispatchEvent(new Event('change'));
      }
      
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));
    } catch (e) {
      // Ignore errors on restricted hosts
    }
  }, []);

  useEffect(() => {
    // Set initial document attributes
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage]);

  /**
   * Translate a given key.
   * Usage: t('nav.organs', 'Organs Info')
   */
  const t = useCallback((key, fallback) => {
    if (!key) return '';
    const langDict = translations[language] || {};
    if (langDict[key] !== undefined) {
      return langDict[key];
    }
    // Fallback to English
    const enDict = translations['en'] || {};
    if (enDict[key] !== undefined) {
      return enDict[key];
    }
    return fallback !== undefined ? fallback : key;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage,
        setLanguage,
        languages: LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
