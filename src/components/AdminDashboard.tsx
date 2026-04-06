import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ImageIcon, 
  Newspaper, 
  GraduationCap,
  FileSearch,
  Mail,
  HelpCircle,
  ExternalLink,
  LogOut
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
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-white/60 backdrop-blur-xl p-4 rounded-3xl border border-white/40 shadow-premium sticky top-4 z-50">
        {/* Brand Area - fixed width/shrink-0 */}
        <div className="flex items-center space-x-4 shrink-0 px-2 border-r border-slate-100 pr-6">
          <img src="/logo.png" alt="LIA Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
          <div className="hidden sm:flex flex-col">
            <h1 className="text-lg font-black tracking-tight leading-none uppercase">Admin Panel</h1>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-0.5">Gestão Centralizada LIA</p>
          </div>
        </div>

        {/* Dynamic Tabs Navigation - Optimized for space and visibility */}
        <nav className="flex justify-center flex-1 min-w-0 px-2 lg:px-4">
          <div className="flex items-center space-x-1 bg-slate-100/50 p-1 rounded-2xl w-full max-w-3xl overflow-x-auto no-scrollbar scroll-smooth shadow-inner-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-[9px] font-black transition-all duration-300 whitespace-nowrap uppercase tracking-[0.15em] shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-white text-lia-navy shadow-premium' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <tab.icon size={12} className={activeTab === tab.id ? 'text-lia-red' : ''} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Global Navigation Actions Group - shrink-0 to prevent hiding */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-slate-100/50 p-1 rounded-2xl flex items-center space-x-1">
            <div className="px-2 border-r border-slate-200">
              <LanguageSelector showLabel={true} />
            </div>
            
            <div className="flex items-center space-x-1">
              <button 
                onClick={onOpenSupport}
                className="group flex items-center space-x-2 px-4 py-2.5 bg-white text-slate-500 font-black rounded-xl text-[9px] uppercase tracking-widest hover:text-lia-navy hover:shadow-sm transition-all active:scale-95 border border-white"
                title="Suporte Técnico LIA"
              >
                <HelpCircle size={14} className="group-hover:text-lia-red transition-colors" />
                <span className="hidden xl:inline">Suporte</span>
              </button>

              <button 
                onClick={() => window.location.href = '/'}
                className="group flex items-center space-x-2 px-4 py-2.5 bg-white text-lia-navy font-black rounded-xl text-[9px] uppercase tracking-widest hover:shadow-sm transition-all active:scale-95 border border-white"
                title="Sair para o Site Público"
              >
                <ExternalLink size={14} className="group-hover:text-lia-red transition-colors" />
                <span className="hidden lg:inline">Ir para o Site</span>
              </button>

              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2.5 bg-lia-red text-white font-black rounded-xl text-[9px] uppercase tracking-widest shadow-premium hover:bg-[#c41a1f] transition-all active:scale-95"
                title="Encerrar Sessão no Painel"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
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
