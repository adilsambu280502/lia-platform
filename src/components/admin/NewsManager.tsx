import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import { NewsItem } from '../../types';
import { CMSModal } from './CMSModal';
import { toast } from 'sonner';

export const NewsManager: React.FC = () => {
  const { siteContent, updateNews } = useData();
  const { news } = siteContent;
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<Partial<NewsItem>>({});

  const categories = ['Todos', 'Académico', 'Admissões', 'Desporto', 'Eventos'];

  const filteredNews = news.filter(item => 
    activeCategory === 'Todos' || item.category === activeCategory
  );

  const handleEdit = (item: NewsItem) => {
    setEditItem(item);
    setFormData(item);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editItem) {
      updateNews(editItem.id, formData);
      toast.success('Notícia atualizada com sucesso!');
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Notícias</h1>
          <p className="text-slate-500 font-medium">Publique e atualize as novidades da academia.</p>
        </div>
        <button className="px-8 py-4 bg-lia-red text-white font-black rounded-2xl hover:bg-lia-red-dark transition-all flex items-center space-x-3 shadow-premium">
          <Plus size={20} />
          <span>Nova Notícia</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-lia-navy text-white shadow-lg scale-105' 
                : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredNews.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-premium transition-all">
            <div className="h-56 relative overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black text-lia-navy uppercase tracking-widest shadow-sm">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <Calendar size={14} className="text-lia-red" />
                <span>{item.date}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-6 line-clamp-2 leading-tight">
                {item.title}
              </h3>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Publicado</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-lia-navy hover:text-white transition-all border border-slate-100"
                    title="Editar Notícia"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-lia-red hover:text-white transition-all border border-slate-100"
                    title="Eliminar Notícia"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CMSModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        title="Editar Notícia"
        subtitle="Publicação de Conteúdo"
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Título da Notícia</label>
            <input 
              type="text" 
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold text-lg"
              placeholder="Ex: Novo currículo internacional"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Categoria</label>
              <select 
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold"
                aria-label="Selecionar Categoria"
              >
                {categories.filter(c => c !== 'Todos').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Data de Publicação</label>
              <input 
                type="date" 
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold"
                aria-label="Data de Publicação"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">URL da Imagem</label>
            <input 
              type="text" 
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lia-navy/5 transition-all font-bold"
              placeholder="URL da imagem (Unsplash, etc)"
            />
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Imagem de Destaque (Preview)</span>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-premium relative group bg-slate-200">
              {formData.image && (
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
              )}
            </div>
          </div>
        </div>
      </CMSModal>
    </motion.div>
  );
};
