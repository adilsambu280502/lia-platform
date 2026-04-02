import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../hooks/useData';

export const HeroSlider: React.FC = () => {
  const { siteContent } = useData();
  const { slides } = siteContent;
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/80 via-[#003366]/30 to-transparent" />
          </div>

          {/* Content — safe zone: pt-24 clears the fixed navbar, pb-20 clears the slide controls */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-24 pb-20">
            <div className="max-w-xl">

              {/* Headline — scales from xl (mobile) up to 4xl (large desktop) */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.2] mb-3 md:mb-4 tracking-tight"
              >
                {slides[current].headline || t(`hero.slide${current + 1}.headline`)}
              </motion.h1>

              {/* Subheadline — hidden on mobile to save space */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hidden sm:block text-sm md:text-base text-white/80 mb-5 md:mb-6 font-medium max-w-lg leading-relaxed"
              >
                {slides[current].subheadline || t(`hero.slide${current + 1}.subheadline`)}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (current === 0) window.open('https://wa.me/244951110110', '_blank');
                    if (current === 1) document.getElementById('academic')?.scrollIntoView({ behavior: 'smooth' });
                    if (current === 2) window.location.href = '/erp';
                    if (current === 3) document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  animate={{
                    boxShadow: ['0 0 0 0 rgba(227, 30, 36, 0.4)', '0 0 0 20px rgba(227, 30, 36, 0)'],
                  }}
                  transition={{
                    boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeOut' },
                  }}
                  className="px-5 py-2.5 md:px-7 md:py-3.5 bg-gradient-to-r from-[#E31E24] to-[#c41a1f] text-white font-bold rounded-full hover:from-[#c41a1f] hover:to-[#a01519] transition-all shadow-lg text-sm md:text-base"
                >
                  {slides[current].cta || t(`hero.slide${current + 1}.cta`)}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 md:px-7 md:py-3.5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all text-sm md:text-base shadow-xl"
                >
                  {t(`hero.slide${current + 1}.cta2`, { defaultValue: slides[current].cta2 || 'Ver Notícias' })}
                </motion.button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators — repositioned for better alignment since arrows are removed */}
      <div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20"
        role="tablist"
        aria-label="Navegação dos slides"
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 transition-all duration-500 rounded-full shadow-lg ${
              current === idx ? 'w-12 bg-[#E31E24]' : 'w-6 bg-white/40 hover:bg-white/60'
            }`}
            role="tab"
            aria-selected={current === idx ? 'true' : 'false'}
            aria-label={`Ir para o slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
