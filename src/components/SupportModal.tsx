import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Phone, ExternalLink } from 'lucide-react';
import { CONTACTS } from '../constants';
import { useTranslation } from 'react-i18next';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const SupportModal: React.FC<SupportModalProps> = ({ 
  isOpen, 
  onClose, 
  title 
}) => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open(CONTACTS.whatsapp, '_blank');
    onClose();
  };

  const handleCall = () => {
    window.location.href = `tel:${CONTACTS.phone.replace(/\s/g, '')}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#003366]/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white"
          >
            {/* Header decorativo */}
            <div className="bg-gradient-to-br from-[#003366] to-[#001F3F] p-8 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31E24] opacity-20 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <button 
                onClick={onClose}
                title="Fechar"
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white p-2 rounded-2xl shadow-lg">
                  <img src="/logo.png" alt="LIA" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {title || t('cta.supportTitle')}
                  </h3>
                  <p className="text-xs text-white/70 font-bold uppercase tracking-widest">
                    Apoio Directo LIA
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-4 bg-gray-50/50">
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                Como prefere falar com a nossa equipa administrativa? Escolha o canal mais conveniente para si.
              </p>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full group flex items-center p-5 bg-white border border-slate-100 hover:border-[#25D366]/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#25D366]/10 text-[#128C7E] rounded-2xl flex items-center justify-center mr-4 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">WhatsApp Instantâneo</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{CONTACTS.phone}</p>
                </div>
                <div className="text-slate-300 group-hover:text-[#25D366] transition-colors">
                   <ExternalLink className="w-5 h-5" />
                </div>
              </button>

              {/* Phone Call Button */}
              <button
                onClick={handleCall}
                className="w-full group flex items-center p-5 bg-white border border-slate-100 hover:border-[#003366]/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 text-lia-navy rounded-2xl flex items-center justify-center mr-4 group-hover:bg-lia-navy group-hover:text-white transition-all duration-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Chamada de Voz</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seg - Sex: 07:30 - 17:00</p>
                </div>
                <div className="text-slate-300 group-hover:text-lia-navy transition-colors">
                   <Phone className="w-4 h-4 opacity-40" />
                </div>
              </button>

              <div className="pt-4 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  Luanda International Academy · Excelência
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
