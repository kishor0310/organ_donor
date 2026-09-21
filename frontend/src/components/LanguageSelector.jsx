import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = ({ isMobile = false }) => {
  const { language, currentLanguage, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="w-full py-2" ref={dropdownRef}>
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-primary-500" />
          <span>{t('nav.selectLanguage', 'Select Language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20 font-bold'
                    : 'bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base">{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-primary-400 dark:hover:border-primary-500 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-all duration-200 shadow-sm text-xs font-semibold backdrop-blur-md group"
        title={t('nav.selectLanguage', 'Select Language')}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-primary-500 group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-2xl z-50 overflow-hidden animate-scale-in py-1.5">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('nav.selectLanguage', 'Select Language')}</span>
            <span className="text-primary-500 text-[10px] bg-primary-50 dark:bg-primary-950/50 px-1.5 py-0.5 rounded-full font-mono">
              {languages.length}
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto py-1 scrollbar-thin">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors group ${
                    isSelected
                      ? 'bg-primary-50/80 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {lang.name}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
