import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Languages, Palette, Activity, Brain, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TeachingPage: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState('/images/teaching-curriculo.jpg');

  useEffect(() => {
    const saved = localStorage.getItem('lia_page_assets');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.teaching?.hero) setImage(parsed.teaching.hero);
    }
  }, []);
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="bg-[#003366] py-24 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E24] opacity-10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">{t('teaching_page.header_title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {t('teaching_page.header_desc')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pillars */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">{t('teaching_page.approach')}</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] tracking-tight">{t('teaching_page.approach_title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
              {
                icon: Brain,
                title: t('teaching_page.method_primary'),
                desc: t('teaching_page.method_primary_desc'),
                color: 'bg-blue-500'
              },
              {
                icon: Languages,
                title: t('teaching_page.method_languages'),
                desc: t('teaching_page.method_languages_desc'),
                color: 'bg-red-500'
              },
              {
                icon: Palette,
                title: t('teaching_page.method_activities'),
                desc: t('teaching_page.method_activities_desc'),
                color: 'bg-green-500'
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${pillar.color}`} />
                <div className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-110 transition-transform`}>
                  <pillar.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold text-[#003366] mb-4 tracking-tight">{pillar.title}</h4>
                <p className="text-gray-600 leading-relaxed text-lg">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Curriculum */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
          <div className="relative">
            <img 
              src={image} 
              alt="Alunos a aprender" 
              className="rounded-3xl shadow-xl object-cover h-[400px] w-full"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center text-white">
                  <Globe2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('teaching_page.langs')}</p>
                  <p className="font-extrabold text-[#003366]">{t('teaching_page.langs_list')}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">{t('teaching_page.curriculum')}</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] mb-6 tracking-tight">
              {t('teaching_page.curriculum_title')}
            </h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{t('teaching_page.curriculum_desc')}</p>
              <ul className="space-y-4 mt-8">
                {[
                  t('teaching_page.bull1'),
                  t('teaching_page.bull2'),
                  t('teaching_page.bull3'),
                  t('teaching_page.bull4'),
                  t('teaching_page.bull5')
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#E31E24]/10 rounded-full flex items-center justify-center text-[#E31E24] flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#E31E24] rounded-full" />
                    </div>
                    <span className="font-medium text-[#003366]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
