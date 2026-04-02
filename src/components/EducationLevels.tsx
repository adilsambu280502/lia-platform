import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useData } from '../hooks/useData';

export const EducationLevels: React.FC = () => {
  const { t } = useTranslation();
  const { siteContent } = useData();
  const { educationLevels } = siteContent;

  const getLevelKey = (id: string | number): string => {
    switch (id.toString()) {
      case '1': return 'preschool';
      case '2': return 'primary';
      case '3': return 'secondary';
      default: return 'preschool';
    }
  };

  return (
    <section className="py-24 bg-gray-50" id="academic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div className="max-w-2xl mb-8 md:mb-0">
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">
              {t('education.title')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#003366] mb-6 tracking-tight">
              {t('education.subtitle')}
            </h3>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#003366] text-white font-bold rounded-full hover:bg-[#002244] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('education.explore')}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {educationLevels.map((level, index) => {
            const key = getLevelKey(level.id);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={level.id}
                className="group relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <img
                  src={level.image}
                  alt={level.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-[#003366]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-10">
                  <h4 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
                    {t(`education.${key}`)}
                  </h4>
                  <p className="text-white/80 mb-8 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {t(`education.${key}_desc`, level.description)}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#E31E24] to-[#c41a1f] text-white font-bold rounded-full text-sm hover:from-[#c41a1f] hover:to-[#a01519] transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500"
                  >
                    {t('news.viewAll')}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
