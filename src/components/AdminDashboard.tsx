import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ImageIcon, 
  Newspaper, 
  GraduationCap,
  FileSearch,
  Mail
} from 'lucide-react';
import { AdminStats } from './admin/AdminStats';
import { SliderManager } from './admin/SliderManager';
import { NewsManager } from './admin/NewsManager';
import { LevelsManager } from './admin/LevelsManager';
import { PageManager } from './admin/PageManager';
import { NewsletterManager } from './admin/NewsletterManager';
import { TestimonialManager } from './admin/TestimonialManager';
import { MessageSquare } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: AdminStats },
    { id: 'slider', label: 'Slides', icon: ImageIcon, component: SliderManager },
    { id: 'pages', label: 'Páginas', icon: FileSearch, component: PageManager },
    { id: 'levels', label: 'Oferta', icon: GraduationCap, component: LevelsManager },
    { id: 'news', label: 'Notícias', icon: Newspaper, component: NewsManager },
    { id: 'newsletter', label: 'Newsletter', icon: Mail, component: NewsletterManager },
    { id: 'testimonials', label: 'Testemunhos', icon: MessageSquare, component: TestimonialManager },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdminStats;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 text-[#003366]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center space-x-5">
          <img src="/logo.png" alt="LIA Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
          <div className="hidden sm:block h-10 w-px bg-slate-200" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none uppercase">Admin Panel</h1>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">LIA Gestão Centralizada</p>
          </div>
        </div>

        {/* Dynamic Tabs Navigation */}
        <div className="flex items-center space-x-1 bg-white/70 backdrop-blur-xl p-1.5 rounded-2xl w-fit shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-white text-lia-navy shadow-premium scale-100' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 scale-95 opacity-70 hover:opacity-100'
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? 'text-lia-red' : ''} />
              <span className="uppercase tracking-widest text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Global Navigation Actions */}
        <div className="flex items-center space-x-3">
          <LanguageSelector />
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-lia-navy font-black rounded-xl text-[10px] uppercase tracking-widest border border-white shadow-sm hover:shadow-premium transition-all active:scale-95"
          >
            <span>Ver Site Público</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 px-6 py-3 bg-lia-red text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-premium hover:bg-lia-red-dark transition-all active:scale-95"
          >
            <span>Terminar Sessão</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        <ActiveComponent />
      </div>
    </div>
  );
};
