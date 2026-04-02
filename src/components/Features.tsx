import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Languages, GraduationCap, Cpu, Heart } from 'lucide-react';
import { FEATURES } from '../constants';

const iconMap: Record<string, any> = {
  Languages,
  GraduationCap,
  Cpu,
  Heart,
};

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const getFeatureKey = (id: string): string => {
    switch (id) {
      case '1': return 'quality';
      case '2': return 'safety';
      case '3': return 'values';
      case '4': return 'multicultural';
      default: return 'quality';
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">
            {t('nav.about')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#003366] mb-6 tracking-tight">
            {t('features.title')}
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('commitment.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const key = getFeatureKey(feature.id);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={feature.id}
                className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-[#003366] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E31E24] transition-colors duration-500">
                  <Icon className="text-[#003366] group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h4 className="text-xl font-bold text-[#003366] mb-4 group-hover:text-white transition-colors duration-500">
                  {t(`features.${key}`)}
                </h4>
                <p className="text-gray-600 group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                  {/* For description, I'll use a generic fallback or mapping if available, 
                      or just use the title for now if descriptions weren't fully mapped in i18n yet */}
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
