import React from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, Info, CheckCircle } from 'lucide-react';

export const TermsOfUse: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100"
        >
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-lia-red rounded-2xl flex items-center justify-center text-white shadow-premium">
              <Scale size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-lia-navy tracking-tight uppercase">Termos de Utilização</h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">LIA - Condições Institucionais</p>
            </div>
          </div>

          <div className="prose prose-lg prose-navy max-w-none space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4 flex items-center space-x-3">
                <Info className="text-lia-red" size={24} />
                <span>1. Aceitação dos Termos</span>
              </h2>
              <p>
                Ao aceder ao website da Luanda International Academy (LIA), concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se não concordar com algum destes termos, está proibido de usar ou aceder a este site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4 flex items-center space-x-3">
                <FileText className="text-lia-red" size={24} />
                <span>2. Direitos de Propriedade Intelectual</span>
              </h2>
              <p>
                Todo o conteúdo deste website, incluindo textos, gráficos, logótipos e imagens, é propriedade da LIA ou dos seus fornecedores de conteúdo e está protegido pelas leis de propriedade intelectual internacionais e de Angola.
              </p>
            </section>

            <section className="bg-lia-red text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <h3 className="text-2xl font-bold mb-6">Uso Autorizado</h3>
               <ul className="space-y-4 font-medium opacity-90">
                 <li className="flex items-start space-x-3">
                   <div className="mt-1 flex-shrink-0"><CheckCircle size={18} /></div>
                   <span>Uso pessoal e não comercial apenas.</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <div className="mt-1 flex-shrink-0"><CheckCircle size={18} /></div>
                   <span>Proibição de modificar ou copiar os materiais.</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <div className="mt-1 flex-shrink-0"><CheckCircle size={18} /></div>
                   <span>Proibição de tentar descompilar qualquer software no site.</span>
                 </li>
               </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4">3. Limitação de Responsabilidade</h2>
              <p>
                Os materiais no site da LIA são fornecidos "como estão". A LIA não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4">4. Legislação Aplicável</h2>
              <p>
                Qualquer reclamação relativa ao site da Luanda International Academy será regida pelas leis de Angola, sem consideração ao seu conflito de disposições legais.
              </p>
            </section>

            <div className="pt-12 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Última atualização: Abril 2026</span>
              <span>© Luanda International Academy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
