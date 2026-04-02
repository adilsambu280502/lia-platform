import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Heart, Globe, Shield, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Quem Somos</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Muito Mais do que uma Escola. Um Projeto Pedagógico Global focado na excelência e no desenvolvimento integral.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">A Nossa Visão</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] mb-6 tracking-tight">
              Construímos os Alicerces do Futuro
            </h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Não nos limitamos a ensinar. Sob a liderança de <strong>Geneva Caddell</strong>, a Luanda International Academy constrói os alicerces cognitivos e culturais essenciais nas primeiras etapas da vida escolar.
              </p>
              <p>
                O nosso compromisso é com o desenvolvimento integral de cada criança. Garantimos a fluência linguística e o estímulo ao pensamento crítico desde o primeiro dia de aulas, preparando os teus filhos para os desafios de um mundo sem fronteiras.
              </p>
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
            <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">Os Nossos Pilares</h2>
            <h3 className="text-4xl font-extrabold text-[#003366] tracking-tight">Valores que nos Guiam</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Cidadania Global', desc: 'Preparamos alunos para compreenderem e atuarem num mundo interligado.' },
              { icon: Award, title: 'Excelência Académica', desc: 'Rigor e inovação pedagógica em todas as disciplinas do currículo.' },
              { icon: Heart, title: 'Desenvolvimento Integral', desc: 'Foco no bem-estar emocional, social e físico de cada criança.' },
              { icon: Shield, title: 'Ambiente Seguro', desc: 'Instalações modernas e seguras na Vila Alice, Luanda.' },
              { icon: Users, title: 'Comunidade', desc: 'Parceria forte entre escola, alunos e encarregados de educação.' },
              { icon: Target, title: 'Pensamento Crítico', desc: 'Estímulo constante à resolução de problemas e criatividade.' },
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
