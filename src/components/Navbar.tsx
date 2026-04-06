import React, { useState, useEffect } from 'react';
import { Menu, X, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const toggleMenu = (open: boolean) => {
    setIsOpen(open);
    window.dispatchEvent(new Event(open ? 'lia:navmenu:open' : 'lia:navmenu:close'));
  };

  // Scroll to top when clicking home link or logo
  const handleNavClick = (path: string) => {
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
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
          : 'bg-white/98 backdrop-blur-xl border-b border-gray-100/80 shadow-sm py-2' 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center group transition-transform hover:scale-105"
            onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
                onClick={() => handleNavClick(link.path)}
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
              onClick={() => toggleMenu(!isOpen)}
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
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[200] md:hidden bg-lia-navy flex flex-col overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => toggleMenu(false)}
              className="absolute top-5 right-5 w-10 h-10 text-white flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all"
              aria-label="Fechar menu"
            >
              <X size={22} />
            </button>

            {/* Logo at top */}
            <div className="flex items-center space-x-3 px-8 pt-8 pb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1">
                <img src="/logo.png" alt="LIA" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-black text-xl tracking-tight">LIA</span>
            </div>

            <div className="h-px bg-white/10 mx-8" />

            {/* Nav Links */}
            <div className="flex flex-col px-8 py-8 space-y-6 flex-1 justify-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => { toggleMenu(false); handleNavClick(link.path); }}
                    className={`block text-4xl font-black transition-colors py-1 ${
                      isActive(link.path) ? 'text-lia-red' : 'text-white hover:text-white/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="px-8 pb-10 space-y-4">
              <div className="h-px bg-white/10" />
              {/* Portal Button */}
              <Link
                to="/erp"
                onClick={() => toggleMenu(false)}
                className="flex items-center justify-center space-x-3 bg-white text-lia-navy px-6 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-transform"
              >
                <User size={20} />
                <span>{t('nav.parentPortal')}</span>
              </Link>
              {/* Language Switcher */}
              <div className="grid grid-cols-4 gap-2">
                {['pt', 'en', 'fr', 'ar'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`uppercase text-xs font-black py-2.5 rounded-xl transition-all border ${
                      i18n.language === lang 
                        ? 'bg-lia-red text-white border-transparent shadow-lg' 
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {lang === 'ar' ? 'ع' : lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
