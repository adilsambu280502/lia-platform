import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Save 
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import { toast } from 'sonner';
import { Slide } from '../../types';
import { CMSModal } from './CMSModal';

export const SliderManager: React.FC = () => {
  const { siteContent, updateSlide } = useData();
  const { slides } = siteContent;
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<Slide | null>(null);
  const [activeSlide, setActiveSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState<Partial<Slide>>({});

  const handleEdit = (slide: Slide) => {
    setActiveSlide(slide);
    setEditItem(slide);
    setFormData(slide);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editItem) {
      updateSlide(editItem.id, formData);
      toast.success('Slide atualizado com sucesso!');
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Slider</h1>
          <p className="text-slate-500 font-medium">Controle os destaques visuais do website.</p>
        </div>
        <button className="px-8 py-4 bg-lia-red text-white font-black rounded-2xl hover:bg-lia-red-dark transition-all flex items-center space-x-3 shadow-premium">
          <Plus size={20} />
          <span>Novo Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center gap-12 group hover:shadow-premium transition-all duration-500">
            <div className="w-full lg:w-96 h-64 rounded-[2rem] overflow-hidden relative flex-shrink-0 shadow-xl border-4 border-slate-50">
              <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6">
                <button 
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-lia-navy transition-all shadow-lg"
                  title="Pré-visualizar Slide"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 min-w-0 py-2">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg tracking-widest border border-slate-200">Slide #{slide.id}</span>
                <span className="flex items-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span>Ativo no Site</span>
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{slide.headline}</h3>
              <p className="text-slate-500 text-lg line-clamp-2 mb-8 font-medium leading-relaxed max-w-2xl">{slide.subheadline}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2.5 bg-lia-navy/5 text-lia-navy text-[10px] font-black uppercase tracking-widest rounded-xl border border-lia-navy/10">Botão 1: {slide.cta}</span>
                {slide.cta2 && (
                  <span className="px-5 py-2.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100">Botão 2: {slide.cta2}</span>
                )}
              </div>
            </div>
            <div className="flex lg:flex-col gap-4">
              <button 
                onClick={() => handleEdit(slide)}
                className="p-5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-lia-navy hover:text-white transition-all border border-slate-200 shadow-sm hover:shadow-lg transform hover:-translate-y-1 active:scale-95"
                title="Editar Conteúdo"
              >
                <Edit2 size={24} />
              </button>
              <button 
                className="p-5 bg-slate-50 text-slate-400 hover:text-white rounded-2xl hover:bg-lia-red transition-all border border-slate-100 hover:border-lia-red shadow-sm active:scale-95"
                title="Remover Slide"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CMSModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        title="Editar Slide"
        subtitle="CMS Engine v2.0"
      >
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Título Principal</label>
              <input 
                type="text" 
                value={formData.headline || ''}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="Insira o título do slide"
                className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">URL da Imagem</label>
              <input 
                type="text" 
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="URL da imagem (Unsplash, etc)"
                className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Texto do Botão (CTA)</label>
              <input 
                type="text" 
                value={formData.cta || ''}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                placeholder="Ex: Ver Programas"
                className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Texto Secundário (CTA 2)</label>
              <input 
                type="text" 
                value={formData.cta2 || ''}
                onChange={(e) => setFormData({ ...formData, cta2: e.target.value })}
                placeholder="Ex: Contactar"
                className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Descrição Detalhada</label>
            <textarea 
              rows={4}
              value={formData.subheadline || ''}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              placeholder="Descreva o destaque deste slide"
              className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all text-base font-medium leading-relaxed"
            />
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Live Preview</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Real-time</span>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-premium relative bg-slate-200">
              {formData.image && (
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
              )}
              <div className="absolute inset-0 bg-black/40 p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black text-white mb-2">{formData.headline || 'Título do Slide'}</h4>
                <p className="text-sm text-white/80 font-bold mb-4 line-clamp-1">{formData.subheadline || 'Descrição...'}</p>
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-lia-red text-white font-black rounded-full text-[10px] uppercase tracking-widest">
                    {formData.cta || 'CTA 1'}
                  </button>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-black rounded-full text-[10px] uppercase tracking-widest">
                    {formData.cta2 || 'CTA 2'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CMSModal>
    </motion.div>
  );
};
