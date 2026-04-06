import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  isDark?: boolean;
  showLabel?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isDark, showLabel }) => {
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <div className="relative group z-[100]">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${
          isDark 
            ? 'hover:bg-slate-100/10 text-white' 
            : 'hover:bg-slate-100 text-[#003366]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Globe size={18} className="text-[#E31E24]" />
          {showLabel && (
            <span className="text-[10px] font-black uppercase tracking-widest border-r border-slate-200 pr-2 mr-1">
              Idioma
            </span>
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">{i18n.language}</span>
      </button>
      
      <AnimatePresence>
        {langOpen && (
          <>
            <div 
              className="fixed inset-0" 
              onClick={() => setLangOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 md:left-auto md:right-0 mt-3 w-44 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden py-3 border border-white/20 z-[101]"
            >
              <div className="px-5 py-2 border-b border-gray-100 mb-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  {t('nav.selectLanguage', 'Seleccionar Idioma')}
                </span>
              </div>
              {['pt', 'en', 'fr', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`flex items-center justify-between w-full px-5 py-3 text-[12px] font-bold uppercase tracking-widest transition-all hover:bg-[#E31E24] hover:text-white group/item ${
                    i18n.language === lang ? 'text-[#E31E24] bg-[#E31E24]/5' : 'text-slate-900'
                  }`}
                >
                  <span>{lang === 'ar' ? 'العربية' : lang}</span>
                  {i18n.language === lang && (
                    <div className="w-1.5 h-1.5 bg-[#E31E24] rounded-full group-hover/item:bg-white" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
