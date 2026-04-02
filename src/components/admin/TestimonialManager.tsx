import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Maria António',
    role: 'Encarregada de Educação',
    text: 'Nunca ganhei nenhum jogo de xadrez mas sempre a Chinoya a me ensina como se joga.',
    image: 'https://i.pravatar.cc/150?u=maria',
  },
  {
    id: 2,
    name: 'Eraldina de Sousa',
    role: 'Encarregada de Educação',
    text: 'Cada dia a melhorar. 😄. Sempre dar sorriso a ter algo que dar para lembrar a LIA.',
    image: 'https://i.pravatar.cc/150?u=eraldina',
  },
  {
    id: 3,
    name: 'Elie Saad',
    role: 'Pai / Encarregado',
    text: 'Thank you very much, your work gets better every year!!!',
    image: 'https://i.pravatar.cc/150?u=elie',
  },
];

export const TestimonialManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lia_testimonials');
    if (saved) {
      setTestimonials(JSON.parse(saved));
    } else {
      setTestimonials(DEFAULT_TESTIMONIALS);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('lia_testimonials', JSON.stringify(testimonials));
    toast.success('Testemunhos guardados com sucesso!');
  };

  const updateTestimonial = (id: number, field: keyof Testimonial, value: string) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addTestimonial = () => {
    const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
    setTestimonials([...testimonials, {
      id: newId,
      name: 'Novo Encarregado',
      role: 'Encarregado de Educação',
      text: 'Texto do testemunho...',
      image: `https://i.pravatar.cc/150?u=${newId}`
    }]);
  };

  const removeTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#003366] uppercase">Gestão de Testemunhos</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">O que dizem as famílias</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={addTestimonial}
            className="flex items-center space-x-2 px-6 py-4 bg-gray-100 text-[#003366] font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            <Plus size={14} />
            <span>Adicionar</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-8 py-4 bg-lia-red text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-premium hover:bg-lia-red-dark transition-all"
          >
            <Save size={14} />
            <span>Guardar Configurações</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-[2.5rem] shadow-premium border border-white overflow-hidden flex flex-col relative group">
            <button
               onClick={() => removeTestimonial(t.id)}
               className="absolute top-4 right-4 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-500 hover:text-white shadow-lg"
               title="Remover Testemunho"
            >
               <Trash2 size={14} />
            </button>
            <div className="bg-lia-navy p-6 flex flex-col items-center justify-center text-white relative">
              <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden mb-4 shadow-xl">
                 <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <input
                type="text"
                value={t.image}
                onChange={(e) => updateTestimonial(t.id, 'image', e.target.value)}
                placeholder="URL da Imagem"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white text-center focus:bg-white focus:text-[#003366] transition-all"
              />
            </div>
            
            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="space-y-2">
                 <label htmlFor={`name-${t.id}`} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Nome</label>
                 <input
                   id={`name-${t.id}`}
                   type="text"
                   title={`Nome do Testemunho ${t.id}`}
                   value={t.name}
                   onChange={(e) => updateTestimonial(t.id, 'name', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-[#003366] focus:bg-white focus:shadow-premium transition-all"
                 />
              </div>
              <div className="space-y-2">
                 <label htmlFor={`role-${t.id}`} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Função / Papel</label>
                 <input
                   id={`role-${t.id}`}
                   type="text"
                   title={`Função do Testemunho ${t.id}`}
                   value={t.role}
                   onChange={(e) => updateTestimonial(t.id, 'role', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-[#003366] focus:bg-white focus:shadow-premium transition-all"
                 />
              </div>
              <div className="space-y-2 flex-1 flex flex-col">
                 <label htmlFor={`text-${t.id}`} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Testemunho</label>
                 <textarea
                   id={`text-${t.id}`}
                   title={`Texto do Testemunho ${t.id}`}
                   value={t.text}
                   onChange={(e) => updateTestimonial(t.id, 'text', e.target.value)}
                   className="w-full flex-1 min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium text-gray-600 focus:bg-white focus:shadow-premium transition-all resize-none"
                 />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
