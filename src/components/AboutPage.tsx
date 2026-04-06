import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Heart, Globe, Shield, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState('/images/about-visao.jpg');

  useEffect(() => {
    const saved = localStorage.getItem('lia_page_assets');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.about?.hero) setImage(parsed.about.hero);
    }
  }, []);
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="bg-[#003366] py-24 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E24] opacity-10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">{t('about_page.header_title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {t('about_page.header_desc')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">{t('about_page.vision')}</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] mb-6 tracking-tight">
              {t('about_page.vision_title')}
            </h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{t('about_page.vision_p1')}</p>
              <p>{t('about_page.vision_p2')}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#E31E24] rounded-3xl transform translate-x-4 translate-y-4 opacity-20" />
            <img 
              src={image} 
              alt="Alunos da LIA" 
              className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">{t('about_page.pillars')}</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] tracking-tight">{t('about_page.pillars_title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: t('about_page.pillar_citizenship'), desc: t('about_page.pillar_citizenship_desc') },
              { icon: Award, title: t('about_page.pillar_excellence'), desc: t('about_page.pillar_excellence_desc') },
              { icon: Heart, title: t('about_page.pillar_integral'), desc: t('about_page.pillar_integral_desc') },
              { icon: Shield, title: t('about_page.pillar_safety'), desc: t('about_page.pillar_safety_desc') },
              { icon: Users, title: t('about_page.pillar_community'), desc: t('about_page.pillar_community_desc') },
              { icon: Target, title: t('about_page.pillar_critical'), desc: t('about_page.pillar_critical_desc') },
            ].map((value, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#003366] mb-6 shadow-sm group-hover:bg-[#E31E24] group-hover:text-white transition-colors">
                  <value.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-[#003366] mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
