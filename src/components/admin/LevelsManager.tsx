import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Edit2, 
  Eye, 
  Save 
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import { EducationLevel } from '../../types';
import { CMSModal } from './CMSModal';
import { toast } from 'sonner';

export const LevelsManager: React.FC = () => {
  const { siteContent, updateEducationLevel } = useData();
  const { educationLevels } = siteContent;
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<EducationLevel | null>(null);
  const [formData, setFormData] = useState<Partial<EducationLevel>>({});

  const handleEdit = (level: EducationLevel) => {
    setEditItem(level);
    setFormData(level);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editItem) {
      updateEducationLevel(editItem.id, formData);
      toast.success('Nível de ensino atualizado!');
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Oferta Educativa</h1>
          <p className="text-slate-500 font-medium">Fase de Proposta: Gere os níveis de ensino e respetivos destaques.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {educationLevels.map((level) => (
          <div key={level.id} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col relative">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={level.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={level.name} 
              />
              {/* Premium Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-lia-navy via-lia-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="px-4 py-2 bg-lia-red text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg inline-block w-fit">
                    Nível Académico
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {level.name}
                  </h3>
                  <p className="text-white/70 text-xs font-bold line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {level.description || 'Programas curriculares de excelência cambridge.'}
                  </p>
                </div>
              </div>

              {/* Edit Action Button */}
              <button 
                onClick={() => handleEdit(level)}
                className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white hover:text-lia-navy transition-all opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0"
                title="Editar Nível"
              >
                <Edit2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CMSModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        title="Editar Oferta Educativa"
        subtitle="Live CMS Demo"
      >
        <div className="space-y-8">
           <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nome do Nível / Sessão</label>
            <input 
              type="text" 
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              placeholder="Ex: Ensino Infantil"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">URL da Imagem</label>
            <input 
              type="text" 
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              placeholder="Cole o URL da imagem (Unsplash, etc)"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Descrição Breve</label>
            <textarea 
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all text-base font-medium leading-relaxed"
              placeholder="Descreva o foco deste nível de ensino..."
            />
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
             <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Preview no Card</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Real-time Sync</span>
            </div>
            <div className="max-w-[280px] mx-auto aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl bg-slate-200">
               {formData.image && (
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-lia-navy/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-lg font-black text-white leading-tight">{formData.name || 'Título'}</h3>
              </div>
            </div>
          </div>
        </div>
      </CMSModal>
    </motion.div>
  );
};
