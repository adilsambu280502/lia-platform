import React from 'react';
import { motion } from 'motion/react';
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center font-sans shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#003366] rounded-lg flex items-center justify-center">
            <img src="/logo.png" alt="LIA" className="w-5 h-5 object-contain brightness-0 invert" />
          </div>
          <span className="text-lg font-black tracking-tighter text-[#003366]">LIA Portal</span>
        </div>
        <div className="flex items-center space-x-2">
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
          <button className="flex flex-col items-center justify-center w-16 text-slate-400">
            <div className="p-2 rounded-xl">
              <Menu size={20} />
            </div>
            <span className="text-[10px] mt-1.5 font-bold tracking-tight">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
