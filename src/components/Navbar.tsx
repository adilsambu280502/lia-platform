import React, { useState, useEffect } from 'react';
import { Menu, X, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.teaching'), path: '/teaching' },
    { name: t('nav.admissions'), path: '/admissions' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isTransparent = location.pathname === '/' && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isTransparent 
          ? 'bg-transparent py-4 md:py-5'
          : 'glass shadow-premium py-2' 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center group transition-transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="LIA Logo" 
                className="h-16 md:h-24 w-auto object-contain drop-shadow-2xl transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-tight transition-all relative py-2 group ${
                  isActive(link.path)
                    ? 'text-lia-red'
                    : isTransparent ? 'text-white' : 'text-lia-navy'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-lia-red transform transition-transform duration-300 origin-left ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
            
            <Link to="/erp">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 bg-gradient-to-r from-lia-red to-lia-red-dark text-white px-7 py-3.5 rounded-full text-sm font-black shadow-premium hover:shadow-premium-hover transition-all"
              >
                <User size={18} />
                <span>{t('nav.parentPortal')}</span>
              </motion.button>
            </Link>

            {/* Premium Language Switcher */}
            <div className="relative group">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isTransparent 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-slate-100 text-lia-navy'
                }`}
              >
                <Globe size={18} className="text-lia-red" />
                <span className="text-[10px] font-black uppercase tracking-widest">{i18n.language}</span>
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <>
                    {/* Invisible backdrop to close on click outside */}
                    <div 
                      className="fixed inset-0 z-[90]" 
                      onClick={() => setLangOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-44 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden py-3 border border-white/20 z-[100]"
                    >
                      <div className="px-5 py-2 border-b border-gray-100 mb-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{t('nav.selectLanguage', 'Seleccionar Idioma')}</span>
                      </div>
                      {['pt', 'en', 'fr', 'ar'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => changeLanguage(lang)}
                          className={`flex items-center justify-between w-full px-5 py-3 text-[12px] font-bold uppercase tracking-widest transition-all hover:bg-lia-red hover:text-white group/item ${
                            i18n.language === lang ? 'text-lia-red bg-lia-red/5' : 'text-slate-900'
                          }`}
                        >
                          <span>{lang === 'ar' ? 'العربية' : lang}</span>
                          {i18n.language === lang && (
                            <motion.div 
                              layoutId="activeLang"
                              className="w-1.5 h-1.5 bg-lia-red rounded-full group-hover/item:bg-white"
                            />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Actions Row */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Quick ERP Access on Mobile */}
            <Link to="/erp">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs font-black shadow-lg ${
                  isTransparent 
                    ? 'bg-white/15 text-white border border-white/30 backdrop-blur-sm' 
                    : 'bg-lia-red text-white'
                }`}
              >
                <User size={14} />
                <span>Portal</span>
              </motion.button>
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${scrolled ? 'text-lia-navy bg-slate-100' : 'text-white bg-white/10 backdrop-blur-md'}`}
              aria-label="Abrir menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden glass-dark flex flex-col p-8 pt-24"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white p-2"
              title="Fechar menu"
              aria-label="Fechar menu"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-black transition-colors ${
                    isActive(link.path) ? 'text-lia-red' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/erp"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-3 bg-white text-lia-navy px-8 py-6 rounded-3xl text-xl font-black shadow-2xl"
              >
                <User size={24} />
                <span>{t('nav.parentPortal')}</span>
              </Link>
            </div>
            
            <div className="mt-auto flex flex-wrap justify-center gap-4 pb-8">
              {['pt', 'en', 'fr', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`uppercase text-sm font-black px-8 py-4 rounded-2xl transition-all ${
                    i18n.language === lang ? 'bg-lia-red text-white shadow-lg' : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  {lang === 'ar' ? 'العربية' : lang}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
