import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Save, 
  BookOpen, 
  GraduationCap, 
  History,
  Layout
} from 'lucide-react';
import { toast } from 'sonner';

interface PageAssets {
  home: { commitmentImg1: string; commitmentImg2: string };
  about: { hero: string };
  teaching: { hero: string };
}

const DEFAULT_ASSETS: PageAssets = {
  home: {
    commitmentImg1: '/images/home-compromisso-1.jpg',
    commitmentImg2: '/images/home-compromisso-2.jpg'
  },
  about: {
    hero: '/images/about-visao.jpg'
  },
  teaching: {
    hero: '/images/teaching-curriculo.jpg'
  }
};

export const PageManager: React.FC = () => {
  const [assets, setAssets] = useState<PageAssets>(() => {
    const saved = localStorage.getItem('lia_page_assets');
    return saved ? JSON.parse(saved) : DEFAULT_ASSETS;
  });

  const handleSave = () => {
    localStorage.setItem('lia_page_assets', JSON.stringify(assets));
    toast.success('Alterações de página guardadas com sucesso.');
  };

  const updateAsset = (page: keyof PageAssets, field: string, value: string) => {
    setAssets(prev => ({
      ...prev,
      [page]: { ...prev[page], [field]: value }
    }));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#003366] uppercase">Gestão de Ativos por Página</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Imagens e Criativos Institucionais</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-4 bg-lia-red text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-premium hover:bg-lia-red-dark transition-all"
        >
          <Save size={14} />
          <span>Guardar Configurações</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About Page */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-white overflow-hidden flex flex-col">
          <div className="bg-lia-navy p-6 flex items-center space-x-3 text-white">
            <History size={20} className="text-lia-red" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Página: Sobre a LIA</h3>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-2">Imagem de Herói (Topo)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={assets.about.hero} 
                  title="URL da Imagem de Herói - Sobre"
                  placeholder="Introduza o link da imagem..."
                  onChange={(e) => updateAsset('about', 'hero', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold text-lia-navy focus:bg-white focus:shadow-premium transition-all" 
                />
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-100">
                  <img src={assets.about.hero} alt="Pré-visualização Hero Sobre" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Page (Commitment) */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-white overflow-hidden flex flex-col">
          <div className="bg-lia-navy p-6 flex items-center space-x-3 text-white">
            <Layout size={20} className="text-lia-red" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Página: Home (Compromisso)</h3>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-2">Imagem 1 (Alunos)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={assets.home.commitmentImg1} 
                  title="URL da Imagem 1"
                  placeholder="Introduza o link..."
                  onChange={(e) => updateAsset('home', 'commitmentImg1', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold text-lia-navy focus:bg-white focus:shadow-premium transition-all" 
                />
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 h-32">
                  <img src={assets.home.commitmentImg1} alt="Pré-visualização 1" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-2">Imagem 2 (Biblioteca)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={assets.home.commitmentImg2} 
                  title="URL da Imagem 2"
                  placeholder="Introduza o link..."
                  onChange={(e) => updateAsset('home', 'commitmentImg2', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold text-lia-navy focus:bg-white focus:shadow-premium transition-all" 
                />
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 h-32">
                  <img src={assets.home.commitmentImg2} alt="Pré-visualização 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Page */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-white overflow-hidden flex flex-col">
          <div className="bg-lia-navy p-6 flex items-center space-x-3 text-white">
            <BookOpen size={20} className="text-lia-red" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Página: O Nosso Ensino</h3>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-2">Imagem de Herói (Topo)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={assets.teaching.hero} 
                  title="URL da Imagem de Herói - Ensino"
                  placeholder="Introduza o link da imagem..."
                  onChange={(e) => updateAsset('teaching', 'hero', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold text-lia-navy focus:bg-white focus:shadow-premium transition-all" 
                />
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-gray-100">
                  <img src={assets.teaching.hero} alt="Pré-visualização Hero Ensino" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
