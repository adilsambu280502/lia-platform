import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save } from 'lucide-react';

interface CMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const CMSModal: React.FC<CMSModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  subtitle, 
  children 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-lia-navy/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-3xl font-black text-lia-navy tracking-tight">{title}</h2>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">{subtitle}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-slate-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-10 space-y-8 h-[500px] overflow-y-auto">
              {children}
            </div>

            <div className="p-10 bg-slate-50 flex justify-end space-x-6 border-t border-slate-200">
              <button 
                onClick={onClose}
                className="px-8 py-5 text-slate-500 font-black uppercase tracking-widest hover:text-lia-navy transition-colors text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={onSave}
                className="px-10 py-5 bg-lia-navy text-white font-black rounded-3xl hover:bg-lia-navy-dark transition-all flex items-center space-x-3 shadow-premium active:scale-95"
              >
                <Save size={20} />
                <span>Guardar Alterações</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
