import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ShieldCheck, Users, Lightbulb } from 'lucide-react';

export const Commitment: React.FC = () => {
  const { t } = useTranslation();

  const [images] = React.useState(() => {
    const saved = localStorage.getItem('lia_page_assets');
    const parsed = saved ? JSON.parse(saved) : null;
    return {
      img1: parsed?.home?.commitmentImg1 || "/images/home-compromisso-1.jpg",
      img2: parsed?.home?.commitmentImg2 || "/images/home-compromisso-2.jpg"
    };
  });

  const benefits = [
    {
      title: t('features.quality'),
      description: t('commitment.description').split('.')[0] + '.',
      icon: Lightbulb
    },
    {
      title: t('accreditation.curriculum'),
      description: t('accreditation.subtitle'),
      icon: Users
    },
    {
      title: t('features.safety'),
      description: t('commitment.description').split('.')[1] || t('commitment.description'),
      icon: ShieldCheck
    },
    {
      title: t('features.multicultural'),
      description: t('footer.description'),
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-sm font-black text-[#E31E24] uppercase tracking-[0.3em] mb-6">
              {t('commitment.title')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#003366] mb-8 leading-[1.1] tracking-tighter">
              {t('commitment.subtitle')}
            </h3>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              {t('commitment.description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/5 group">
                    <benefit.icon className="text-[#E31E24]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003366] text-lg mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 leading-snug">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="rounded-[2rem] overflow-hidden shadow-2xl h-64">
                  <img 
                    src={images.img1} 
                    alt="LIA Classes" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="rounded-[2rem] overflow-hidden shadow-2xl h-48 bg-[#003366] p-8 flex flex-col justify-end text-white">
                  <span className="text-4xl font-black mb-2">100%</span>
                  <p className="text-sm font-medium opacity-80 uppercase tracking-widest">{t('features.quality')}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[2rem] overflow-hidden shadow-2xl h-48 bg-[#E31E24] p-8 flex items-center justify-center">
                   <div className="text-center">
                    <div className="text-4xl font-black text-white mb-2">3+</div>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-widest">{t('features.multicultural')}</p>
                   </div>
                </div>
                <div className="rounded-[2rem] overflow-hidden shadow-2xl h-80">
                  <img 
                    src={images.img2} 
                    alt="LIA Library" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -z-10 -bottom-20 -left-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
