import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Languages, Palette, Activity, Brain, Globe2 } from 'lucide-react';

export const TeachingPage: React.FC = () => {
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
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Oferta Educativa</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Formação Estruturada para o Futuro. Imersão multilingue e desenvolvimento integral.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pillars */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">A Nossa Abordagem</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] tracking-tight">O Método Pedagógico LIA</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Brain,
                title: 'Ensino Infantil e Primário',
                desc: 'Foco absoluto no desenvolvimento motor, cognitivo e social da criança, respeitando o ritmo individual de cada aluno.',
                color: 'bg-blue-500'
              },
              {
                icon: Languages,
                title: 'Imersão Multilingue',
                desc: 'Aulas planeadas para garantir uma aquisição de vocabulário natural e fluente nas línguas mais relevantes do cenário global.',
                color: 'bg-red-500'
              },
              {
                icon: Palette,
                title: 'Atividades de Enriquecimento',
                desc: 'Oficinas extracurriculares desenhadas para estimular a criatividade, a resolução de problemas e o trabalho de equipa.',
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
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Línguas</p>
                  <p className="font-extrabold text-[#003366]">PT, EN, FR, AR</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">Currículo Global</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] mb-6 tracking-tight">
              Preparação para um Mundo Sem Fronteiras
            </h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                A nossa matriz curricular é desenhada para ir além do ensino tradicional. Integramos o Português, Inglês e Francês no dia-a-dia dos alunos, com uma introdução pioneira ao Árabe.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  'Fluência linguística natural desde a creche',
                  'Desenvolvimento do pensamento crítico e lógico',
                  'Integração de tecnologia nas salas de aula',
                  'Forte componente de artes e desporto',
                  'Acompanhamento psicopedagógico contínuo'
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
