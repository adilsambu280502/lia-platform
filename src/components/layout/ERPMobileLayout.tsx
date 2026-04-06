import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSelector } from '../LanguageSelector';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  Menu,
  LogOut,
  Home
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

interface ERPMobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
  menuItems: NavItem[];
  onLogout?: () => void;
}

export const ERPMobileLayout: React.FC<ERPMobileLayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  menuItems,
  onLogout
}) => {
  // We'll show the top 4 items + a "More" menu for mobile bottom nav
  const bottomNavItems = menuItems.slice(0, 4);
  const remainingItems = menuItems.slice(4);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to handle tab selection from menu
  const handleMenuSelect = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-8 py-5 flex justify-between items-center font-sans shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-lia-navy rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-blue-900/10">
              <img src="/logo.png" alt="LIA" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tighter text-lia-navy">LIA Portal</span>
          </div>
        <div className="flex items-center space-x-1">
          <LanguageSelector />
          <button 
            onClick={() => window.location.href = '/'}
            className="p-2 text-slate-400 hover:text-lia-navy transition-colors"
            title="Página Inicial"
          >
            <Home size={20} />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 text-lia-red hover:bg-red-50 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 py-6"
      >
        {children}
      </motion.main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-2 py-3 pb-safe-offset-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center w-16 group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-lia-navy text-white shadow-lg shadow-blue-900/20 scale-110' 
                  : 'text-slate-400'
              }`}>
                <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1.5 font-bold tracking-tight transition-colors duration-300 ${
                activeTab === item.id ? 'text-lia-navy' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute -top-3 w-1 h-1 bg-lia-navy rounded-full"
                />
              )}
            </button>
          ))}
          {/* More Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center w-16 transition-colors ${isMenuOpen ? 'text-lia-navy' : 'text-slate-400'}`}
          >
            <div className={`p-2 rounded-xl transition-transform ${isMenuOpen ? 'bg-slate-100 scale-110' : ''}`}>
              <Menu size={20} strokeWidth={isMenuOpen ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] mt-1.5 font-bold tracking-tight ${isMenuOpen ? 'text-lia-navy' : 'text-slate-400'}`}>Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-20 left-4 right-4 z-40 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-4 bg-slate-50 border-b border-slate-100/50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Mais Opções</span>
              </div>
              <div className="p-2 flex flex-col">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuSelect(item.id)}
                      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                        isActive ? 'bg-slate-50 text-lia-navy' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${isActive ? 'bg-white shadow-sm text-lia-navy' : 'text-slate-400'}`}>
                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-lia-navy' : ''}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
