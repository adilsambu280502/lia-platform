import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '../hooks/useData';
import { useTranslation } from 'react-i18next';

export const News: React.FC = () => {
  const { siteContent } = useData();
  const { news } = siteContent;
  const { t } = useTranslation();

  const getNewsKey = (id: string | number): string => {
    switch (id.toString()) {
      case '1': return 'item1';
      case '2': return 'item2';
      case '3': return 'item3';
      case '4': return 'item4';
      default: return 'item1';
    }
  };

  const getCategoryKey = (id: string | number): string => {
    switch (id.toString()) {
      case '1': return 'academic';
      case '2': return 'admissions';
      case '3': return 'activities';
      case '4': return 'arts_category';
      default: return 'academic';
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">
              {t('news_subtitle', 'LIA News')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight">
              {t('news.title')}
            </h3>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('news');
              el?.scrollIntoView({ behavior: 'smooth' });
              toast.info(t('chatbot.placeholder'), { duration: 2000 });
            }}
            className="hidden md:flex items-center space-x-2 text-[#003366] font-black uppercase tracking-widest text-xs group"
          >
            <span>{t('news.viewAll')}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item, index) => {
            const newsKey = getNewsKey(item.id);
            const categoryKey = getCategoryKey(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-premium transition-all duration-500">
                  <img 
                    src={item.image} 
                    alt={t(`news.${newsKey}`)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black text-[#003366] uppercase tracking-widest shadow-sm">
                      {t(`news.${categoryKey}`)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[#666] text-[10px] font-bold uppercase tracking-widest">
                    <Calendar size={14} className="text-[#E31E24]" />
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-lg font-black text-[#003366] line-clamp-2 leading-snug group-hover:text-[#E31E24] transition-colors">
                    {t(`news.${newsKey}`)}
                  </h4>
                  <div className="flex items-center space-x-2 text-[#003366] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t('hero.slide1.cta2', 'Ler mais')}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 md:hidden">
            <button 
                onClick={() => {
                  const el = document.getElementById('news');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  toast.info(t('chatbot.placeholder'), { duration: 2000 });
                }}
                className="w-full py-4 bg-[#f8f9fa] text-[#003366] font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center space-x-2"
            >
                <span>{t('news.viewAll')}</span>
                <ArrowRight size={16} />
            </button>
        </div>
      </div>
    </section>
  );
};
