import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ImageIcon, 
  Newspaper, 
  GraduationCap,
  FileSearch,
  Mail,
  HelpCircle
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
  onOpenSupport?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onOpenSupport }) => {
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
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 text-[#003366]">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-sm sticky top-4 z-50">
        {/* Brand Area */}
        <div className="flex items-center space-x-4 shrink-0 px-2 border-r border-slate-100 pr-6">
          <img src="/logo.png" alt="LIA Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight leading-none uppercase">Admin Panel</h1>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Gestão Centralizada LIA</p>
          </div>
        </div>

        {/* Dynamic Tabs Navigation - Optimized for Center Flow */}
        <nav className="flex-1 flex justify-center">
          <div className="flex items-center space-x-1 bg-slate-100/50 p-1 rounded-2xl w-fit overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-[10px] font-black transition-all duration-300 whitespace-nowrap uppercase tracking-widest ${
                  activeTab === tab.id 
                    ? 'bg-white text-lia-navy shadow-premium' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <tab.icon size={14} className={activeTab === tab.id ? 'text-lia-red' : ''} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Global Navigation Actions Group */}
        <div className="flex items-center space-x-2 shrink-0 bg-slate-100/50 p-1 rounded-2xl">
          <div className="px-2 border-r border-slate-200">
            <LanguageSelector showLabel={true} />
          </div>
          
          <div className="flex items-center space-x-1">
            <button 
              onClick={onOpenSupport}
              className="group flex items-center space-x-2 px-4 py-2.5 bg-white text-slate-500 font-black rounded-xl text-[9px] uppercase tracking-widest hover:text-lia-navy hover:shadow-sm transition-all active:scale-95 border border-white"
              title="Suporte Técnico"
            >
              <HelpCircle size={14} className="group-hover:text-lia-red transition-colors" />
              <span className="hidden xl:inline">Suporte</span>
            </button>

            <button 
              onClick={() => window.location.href = '/'}
              className="group flex items-center space-x-2 px-4 py-2.5 bg-white text-lia-navy font-black rounded-xl text-[9px] uppercase tracking-widest hover:shadow-sm transition-all active:scale-95 border border-white"
              title="Ver Site Público"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" height="14" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                className="group-hover:text-lia-red transition-colors"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Ver Site</span>
            </button>

            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2.5 bg-lia-red text-white font-black rounded-xl text-[9px] uppercase tracking-widest shadow-premium hover:bg-[#c41a1f] transition-all active:scale-95"
              title="Encerrar Sessão"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" height="14" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="min-h-[600px]">
        <ActiveComponent />
      </div>
    </div>
  );
};
