import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const Accreditation: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white border-b border-gray-100 py-8 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center relative z-10 py-12">
          {/* Cambridge Excellence Authority - Visionary Centered Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center max-w-4xl"
          >
            {/* The Seal of Global Excellence */}
            <div className="relative group mb-10">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-50/50 via-slate-50/80 to-blue-50/50 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative p-12 md:p-16 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,51,102,0.06)] transition-all duration-700">
                <img 
                  src="/cambridge-official.png" 
                  alt="Cambridge University Press & Assessment" 
                  className="h-20 md:h-28 w-auto object-contain"
                  loading="eager"
                />
              </div>
            </div>

            {/* Authoritative Messaging */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="h-px w-8 bg-lia-red" />
                <span className="text-[11px] md:text-[12px] font-black text-lia-red uppercase tracking-[0.4em] md:tracking-[0.6em]">
                  {t('accreditation.title')}
                </span>
                <div className="h-px w-8 bg-lia-red" />
              </div>
              
              <h4 className="text-2xl md:text-3xl font-black text-lia-navy tracking-tight uppercase max-w-2xl leading-tight px-4">
                {t('accreditation.subtitle')}
              </h4>
              
              <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed opacity-80 px-4">
                {t('accreditation.curriculum')} & {t('accreditation.standards')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Redundant text removed */}
      
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[10rem] font-black text-gray-50/50 -z-10 select-none whitespace-nowrap pointer-events-none tracking-tighter">
        CAMBRIDGE INTERNATIONAL EDUCATION
      </div>
    </div>
  );
};
