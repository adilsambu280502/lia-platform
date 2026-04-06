import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Page } from '../types';
import { CONTACTS } from '../constants';

interface FooterProps {
  onPageChange?: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="flex flex-col items-start space-y-8">
            <div className="flex flex-col items-start gap-4">
              <img 
                src="/logo.png" 
                alt="Logótipo da Luanda International Academy" 
                className="h-16 md:h-20 w-auto object-contain ml-2"
                loading="lazy"
              />
              <div className="h-px w-full max-w-[120px] bg-gray-100" />
              <div className="flex flex-col items-start gap-2">
                <img 
                  src="/cambridge-official.png" 
                  alt="Cambridge University Press & Assessment" 
                  className="h-10 md:h-12 w-auto object-contain"
                  loading="lazy"
                />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Escola Internacional Registada
                </span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-xs text-sm md:text-base">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/luandainternationalacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#003366] hover:bg-[#E31E24] hover:text-white transition-all shadow-sm" 
                aria-label="Instagram da LIA"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://www.facebook.com/luandainternationalacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#003366] hover:bg-[#E31E24] hover:text-white transition-all shadow-sm" 
                aria-label="Facebook da LIA"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://www.linkedin.com/school/luanda-international-academy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#003366] hover:bg-[#E31E24] hover:text-white transition-all shadow-sm" 
                aria-label="LinkedIn da LIA"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#003366] mb-8 tracking-tight">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {[
                { key: 'home', label: t('nav.home'), path: '/' },
                { key: 'about', label: t('nav.about'), path: '/about' },
                { key: 'teaching', label: t('nav.teaching'), path: '/teaching' },
                { key: 'admissions', label: t('nav.admissions'), path: '/admissions' },
                { key: 'contact', label: t('nav.contact'), path: '/contact' }
              ].map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path}
                    onClick={() => {
                      if (link.path === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-600 hover:text-[#E31E24] transition-colors font-medium text-sm md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a 
                  href="/erp" 
                  className="inline-flex items-center space-x-2 text-[#E31E24] font-black text-sm hover:text-lia-navy transition-colors"
                >
                  <span>↗ Portal do Encarregado</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-[#003366] mb-8 tracking-tight">{t('footer.contact')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="text-[#E31E24] flex-shrink-0" size={24} />
                <span className="text-gray-600 leading-relaxed">
                  {CONTACTS.address}
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="text-[#E31E24] flex-shrink-0" size={24} />
                <span className="text-gray-600 font-medium">{CONTACTS.phone}</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="text-[#E31E24] flex-shrink-0" size={24} />
                <span className="text-gray-600 font-medium">{CONTACTS.email}</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-[#003366] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31E24] opacity-20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-40 transition-opacity" />
            <h4 className="text-2xl font-bold mb-6 tracking-tight relative z-10">{t('hero.slide1.cta')}</h4>
            <p className="text-white/80 mb-8 leading-relaxed relative z-10">
              Venha conhecer as nossas instalações e o nosso projeto educativo.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(227, 30, 36, 0.4)", "0 0 0 20px rgba(227, 30, 36, 0)"] 
              }}
              transition={{ 
                boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeOut" } 
              }}
              className="w-full py-4 bg-[#E31E24] text-white font-bold rounded-full hover:bg-[#c41a1f] transition-all flex items-center justify-center space-x-2 shadow-xl relative z-10"
              onClick={() => window.open(CONTACTS.whatsapp, '_blank')}
            >
              <MessageCircle size={20} />
              <span>WhatsApp LIA</span>
            </motion.button>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0 relative">
          <p className="text-gray-500 text-sm font-medium w-full md:w-auto">
            © 2026 Luanda International Academy. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-gray-500 md:absolute md:left-1/2 md:-translate-x-1/2">
            <a href="/privacy" className="hover:text-lia-navy transition-colors font-bold tracking-tight">Política de Privacidade</a>
            <a href="/terms" className="hover:text-lia-navy transition-colors font-bold tracking-tight">Termos de Utilização</a>
          </div>
          {/* Spacer to keep right side clear for chatbot */}
          <div className="hidden lg:block w-32" />
        </div>
      </div>
    </footer>
  );
};
