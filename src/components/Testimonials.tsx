import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Testimonial[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lia_testimonials');
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      setData(TESTIMONIALS);
    }
  }, []);

  const getTranslatedText = (testimonial: Testimonial) => {
    const defaultTestimonial = TESTIMONIALS.find(t => t.id === testimonial.id);
    if (defaultTestimonial && defaultTestimonial.text === testimonial.text) {
      const key = `item${testimonial.id}`;
      return t(`testimonials.${key}`);
    }
    return testimonial.text;
  };

  return (
    <section className="py-24 bg-lia-navy relative overflow-hidden" id="testimonials">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#E31E2415,transparent)] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center space-x-3 mb-4 px-6 py-2 bg-white/10 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-black text-white uppercase tracking-[0.4em]">
              {t('testimonials.title')}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t('testimonials.subtitle')}
          </h2>
        </div>

        {/* Dynamic Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((testimonial, idx) => {
            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group h-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] relative hover:bg-white/10 transition-all duration-500 shadow-2xl flex flex-col"
              >
                <Quote className="text-white absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity" size={40} />
                
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[17px] text-white/90 font-medium leading-relaxed mb-10 italic">
                  "{getTranslatedText(testimonial)}"
                </p>

                <div className="flex items-center space-x-4 mt-auto pt-8 border-t border-white/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-white/20 object-cover"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-white opacity-70 font-black text-[9px] uppercase tracking-[0.2em]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
