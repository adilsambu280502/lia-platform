import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Bot, Palette, Waves, Trophy, PenTool, 
  BookOpen, Music, Monitor, Dumbbell, 
  Sword, Coins, Globe, Library 
} from 'lucide-react';
import { ACTIVITIES } from '../constants';

const iconMap: Record<string, any> = {
  Bot,
  Palette,
  Waves,
  Trophy,
  PenTool,
  BookOpen,
  Music,
  Monitor,
  Dumbbell,
  Sword,
  Coins,
  Globe,
  Library,
};

export const Activities: React.FC = () => {
  const { t } = useTranslation();



  return (
    <section className="py-24 bg-white" id="activities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4"
          >
            {t('activities.title')}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#003366] mb-6"
          >
            {t('activities.subtitle')}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t('commitment.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACTIVITIES.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={activity.id}
                className="group p-10 bg-white rounded-3xl border border-gray-100 hover:border-[#E31E24] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-center"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-[#E31E24] transition-colors duration-500">
                  <Icon className="text-[#003366] group-hover:text-white transition-colors duration-500" size={40} />
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-[#003366] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 group-hover:bg-[#003366] group-hover:text-white transition-colors duration-500">
                  {t('news.academic')}
                </span>
                <h4 className="text-2xl font-bold text-[#003366] mb-4">
                  {activity.name}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {activity.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
