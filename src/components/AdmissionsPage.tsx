import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { FAQS } from '../constants';

export const AdmissionsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    birthDate: '',
    gender: '',
    grade: '',
    parentName: '',
    relation: '',
    email: '',
    phone: '',
    previousSchool: '',
    lastGrade: '',
    requirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.studentName.trim()) newErrors.studentName = 'O nome do aluno é obrigatório.';
    if (!formData.birthDate) newErrors.birthDate = 'A data de nascimento é obrigatória.';
    if (!formData.gender) newErrors.gender = 'Por favor, selecione o género.';
    if (!formData.grade) newErrors.grade = 'Por favor, selecione o ano a candidatar.';
    if (!formData.parentName.trim()) newErrors.parentName = 'O nome do encarregado é obrigatório.';
    if (!formData.relation.trim()) newErrors.relation = 'O grau de parentesco é obrigatório.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um e-mail válido.';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório.';
    } else if (!/^\+?[0-9\s\-]{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Por favor, insira um número de telefone válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, this would send the data to a server
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to the first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 text-center relative overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#003366] opacity-5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E31E24] opacity-5 rounded-full blur-3xl -ml-32 -mb-32" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner"
          >
            <CheckCircle2 size={56} />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-[#003366] mb-6 tracking-tight"
          >
            Candidatura Submetida!
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Obrigado pelo seu interesse na LIA. A nossa equipa de admissões irá analisar a informação e entrará em contacto consigo brevemente para agendar uma visita.
          </motion.p>

          {/* Testimonial Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-12 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-100 shadow-sm">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 italic text-lg mb-6 leading-relaxed">
              "A LIA superou todas as nossas expectativas. O ambiente acolhedor e o rigor académico proporcionaram ao meu filho uma confiança incrível. Estamos muito felizes por fazer parte desta família."
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center text-white font-bold">
                MS
              </div>
              <div className="text-left">
                <p className="font-bold text-[#003366]">Maria Silva</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Encarregada de Educação</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitted(false)}
              className="px-10 py-4 bg-[#003366] text-white font-bold rounded-full hover:bg-[#002244] transition-all shadow-xl"
            >
              Voltar ao Formulário
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-[#003366] border-2 border-[#003366] font-bold rounded-full hover:bg-gray-50 transition-all"
              onClick={() => window.location.href = '/'}
            >
              Ir para a Home
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="bg-[#003366] py-24 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E24] opacity-10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Admissões</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Dê o primeiro passo para o futuro do seu filho. O nosso processo de admissão é simples e transparente.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-extrabold text-[#003366] mb-10 tracking-tight">Formulário de Candidatura</h2>
            
            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              {/* Student Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#E31E24] flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#E31E24]/10 rounded-full flex items-center justify-center text-sm">1</span>
                  <span>Informação do Aluno</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Nome Completo *</label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.studentName ? 'border-red-500' : 'border-transparent'}`}
                      placeholder="Nome do aluno"
                    />
                    {errors.studentName && <span className="text-xs text-red-500 font-medium">{errors.studentName}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Data de Nascimento *</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.birthDate ? 'border-red-500' : 'border-transparent'}`}
                    />
                    {errors.birthDate && <span className="text-xs text-red-500 font-medium">{errors.birthDate}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Género *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.gender ? 'border-red-500' : 'border-transparent'}`}
                    >
                      <option value="">Selecionar...</option>
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                      <option value="other">Outro</option>
                    </select>
                    {errors.gender && <span className="text-xs text-red-500 font-medium">{errors.gender}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Ano a Candidatar *</label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.grade ? 'border-red-500' : 'border-transparent'}`}
                    >
                      <option value="">Selecionar...</option>
                      <option value="creche">Creche</option>
                      <option value="pre-escolar">Pré-escolar</option>
                      <option value="primario">Primário</option>
                    </select>
                    {errors.grade && <span className="text-xs text-red-500 font-medium">{errors.grade}</span>}
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#E31E24] flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#E31E24]/10 rounded-full flex items-center justify-center text-sm">2</span>
                  <span>Informação do Encarregado</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Nome do Encarregado *</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.parentName ? 'border-red-500' : 'border-transparent'}`}
                      placeholder="Nome completo"
                    />
                    {errors.parentName && <span className="text-xs text-red-500 font-medium">{errors.parentName}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Parentesco *</label>
                    <input
                      type="text"
                      name="relation"
                      value={formData.relation}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.relation ? 'border-red-500' : 'border-transparent'}`}
                      placeholder="Ex: Pai, Mãe, Tutor"
                    />
                    {errors.relation && <span className="text-xs text-red-500 font-medium">{errors.relation}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                      placeholder="exemplo@email.ao"
                    />
                    {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Telefone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all ${errors.phone ? 'border-red-500' : 'border-transparent'}`}
                      placeholder="+244 ..."
                    />
                    {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#E31E24] flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#E31E24]/10 rounded-full flex items-center justify-center text-sm">3</span>
                  <span>Histórico Académico</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Escola Anterior</label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all"
                      placeholder="Nome da escola"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Último Ano Concluído</label>
                    <input
                      type="text"
                      name="lastGrade"
                      value={formData.lastGrade}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all"
                      placeholder="Ex: 2ª Classe"
                    />
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#E31E24] flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#E31E24]/10 rounded-full flex items-center justify-center text-sm">4</span>
                  <span>Necessidades Especiais ou Interesses</span>
                </h3>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Observações</label>
                  <textarea
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#003366] transition-all resize-none"
                    placeholder="Indique se o aluno tem alguma necessidade especial ou interesse específico..."
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 bg-[#E31E24] text-white font-bold rounded-2xl hover:bg-[#c41a1f] transition-all flex items-center justify-center space-x-3 shadow-xl text-lg"
              >
                <span>Submeter Candidatura</span>
                <Send size={20} />
              </motion.button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-extrabold text-[#003366] mb-8 tracking-tight">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-bold text-[#003366]">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={20} className="flex-shrink-0 ml-4" /> : <ChevronDown size={20} className="flex-shrink-0 ml-4" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-[#003366] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31E24] opacity-20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-40 transition-opacity" />
            <h4 className="text-2xl font-bold mb-6 tracking-tight relative z-10">Ainda tem dúvidas?</h4>
            <p className="text-white/80 mb-8 leading-relaxed relative z-10">
              A nossa equipa de admissões está disponível para ajudar em todo o processo.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-white text-[#003366] font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl relative z-10"
            >
              Contactar Admissões
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
