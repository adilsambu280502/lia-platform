import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100"
        >
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-lia-navy rounded-2xl flex items-center justify-center text-white shadow-premium">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-lia-navy tracking-tight uppercase">Política de Privacidade</h1>
              <p className="text-sm font-bold text-lia-red uppercase tracking-widest mt-1">LIA - Proteção de Dados</p>
            </div>
          </div>

          <div className="prose prose-lg prose-navy max-w-none space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4 flex items-center space-x-3">
                <Lock className="text-lia-red" size={24} />
                <span>1. Introdução</span>
              </h2>
              <p>
                A Luanda International Academy (LIA) está empenhada em proteger a privacidade e os dados pessoais de todos os membros da nossa comunidade, incluindo alunos, encarregados de educação, funcionários e visitantes do nosso website. Esta política descreve como recolhemos, utilizamos e protegemos as suas informações.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4 flex items-center space-x-3">
                <Eye className="text-lia-red" size={24} />
                <span>2. Recolha de Dados</span>
              </h2>
              <p>
                Recolhemos informações necessárias para a prestação de serviços educativos de excelência, tais como:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dados de identificação (nomes, data de nascimento, documentos de identidade).</li>
                <li>Informações de contacto (e-mail, telefone, morada).</li>
                <li>Dados académicos e de saúde relevantes para o bem-estar do aluno.</li>
                <li>Registos de utilização do nosso website e plataforma ERP.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4 flex items-center space-x-3">
                <FileText className="text-lia-red" size={24} />
                <span>3. Utilização da Informação</span>
              </h2>
              <p>
                Os seus dados são utilizados exclusivamente para fins académicos, administrativos e de comunicação institucional. A LIA não partilha informações pessoais com terceiros para fins de marketing sem o seu consentimento explícito.
              </p>
            </section>

            <section className="bg-lia-navy/5 p-8 rounded-3xl border border-lia-navy/10">
              <h3 className="text-xl font-bold text-lia-navy mb-4">Segurança dos Dados</h3>
              <p className="text-sm">
                Implementamos medidas de segurança técnicas e organizacionais rigorosas para garantir que as suas informações estão protegidas contra acesso não autorizado, perda ou alteração. O acesso aos dados é restrito apenas ao pessoal devidamente autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-lia-navy mb-4">4. Direitos do Utilizador</h2>
              <p>
                De acordo com as leis de proteção de dados aplicáveis, o utilizador tem o direito de aceder, retificar ou solicitar a eliminação dos seus dados pessoais. Para exercer estes direitos, contacte-nos através do e-mail: <strong>privacy@lia.ao</strong>.
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
