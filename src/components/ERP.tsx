import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  Bell, 
  CreditCard, 
  History, 
  LogOut, 
  Search,
  ChevronRight,
  TrendingUp,
  Calendar,
  Clock,
  User,
  Settings,
  HelpCircle,
  Download,
  Filter,
  Plus,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

import { useData, Student } from '../hooks/useData';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ERPMobileLayout } from './layout/ERPMobileLayout';
import { LanguageSelector } from './LanguageSelector';
import { toast } from 'sonner';

interface ERPProps {
  onLogout: () => void;
}

export const ERP: React.FC<ERPProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const { students, loading, refreshData } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<'joao' | 'maria'>('joao');

  const currentStudent = students[selectedStudentId];
  const studentList = Object.values(students) as Student[];

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleStudentChange = async (id: 'joao' | 'maria') => {
    if (id === selectedStudentId) return;
    setSelectedStudentId(id);
    await refreshData();
  };

  const handleExport = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: 'A gerar relatório PDF...',
      success: 'Boletim exportado com sucesso!',
      error: 'Erro ao exportar relatório.',
    });
  };

  const menuItems = [
    { id: 'dashboard', label: t('erp.dashboard'), icon: LayoutDashboard },
    { id: 'grades', label: t('erp.grades'), icon: GraduationCap },
    { id: 'reports', label: t('erp.reports'), icon: FileText },
    { id: 'messages', label: t('erp.messages'), icon: MessageSquare },
    { id: 'notifications', label: t('erp.notifications'), icon: Bell },
    { id: 'payments', label: t('erp.payments'), icon: CreditCard },
    { id: 'history', label: t('erp.history'), icon: History },
  ];

  // Sidebar Component Logic
  const sidebarContent = (
    <aside className={`${isMobile ? 'hidden' : 'w-72'} bg-white/80 backdrop-blur-2xl border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-30`}>
      <div className="p-8 flex flex-col items-start space-y-4">
        <img src="/logo.png" alt="LIA Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
        <span className="text-[10px] font-black tracking-[0.1em] uppercase text-slate-400">Portal do Encarregado</span>
      </div>
      
      <div className="px-6 mb-8">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('erp.parent')}</p>
          <div className="flex items-center space-x-3">
            <img
              src="https://picsum.photos/seed/parent/100/100"
              alt="Parent"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate">Carlos Mendes</h4>
              <p className="text-[10px] text-slate-500 truncate">ID: 2026-CM99</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-[#003366] text-white shadow-md shadow-blue-900/10'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-400'} />
            <span>{item.label}</span>
            {item.id === 'messages' && (
              <span className="ml-auto w-5 h-5 bg-[#E31E24] text-white text-[10px] flex items-center justify-center rounded-full">3</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100 space-y-1">
        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <Settings size={18} />
          <span>{t('erp.settings')}</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <HelpCircle size={18} />
          <span>{t('erp.support')}</span>
        </button>
        <div className="pt-2">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-50 text-lia-navy rounded-xl text-sm font-bold hover:bg-slate-100 transition-all mb-2"
          >
            <LayoutDashboard size={18} />
            <span>Website LIA</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-[#E31E24] rounded-xl text-sm font-bold hover:bg-red-100 transition-all font-black uppercase tracking-widest text-[10px]"
          >
            <LogOut size={18} />
            <span>{t('erp.logout')}</span>
          </button>
        </div>
      </div>
    </aside>
  );

  const mainContent = (
    <main className="flex-1 overflow-y-auto">
      {/* Desktop Header - Hidden on Mobile */}
      {!isMobile && (
        <header className="sticky top-0 bg-white/70 backdrop-blur-2xl border-b border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] px-8 py-4 flex justify-between items-center z-20 font-sans">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/20 transition-all w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Student Selector */}
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200">
              {studentList.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentChange(student.id as 'joao' | 'maria')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedStudentId === student.id
                      ? 'bg-white text-lia-navy shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <img src={student.avatar} alt={student.name} className="w-5 h-5 rounded-full" />
                  <span>{student.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200" />

            <LanguageSelector />
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors" title="Notificações" aria-label="Notificações">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E31E24] rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Carlos Mendes</p>
                <p className="text-[10px] font-medium text-slate-500">Premium Plan</p>
              </div>
              <div className="w-8 h-8 bg-[#003366] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                CM
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <div className={`${isMobile ? 'p-4' : 'p-8'} max-w-7xl mx-auto pb-32`}>
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>{t('erp.dashboard')}</h1>
                <p className="text-sm text-slate-500 font-medium">Resumo de desempenho para <span className="text-[#003366] font-bold">{currentStudent.name}</span></p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleExport}
                  className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <Download size={16} />
                  <span>{t('erp.export')}</span>
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 bg-lia-navy rounded-xl text-sm font-bold text-white hover:bg-[#002244] transition-all shadow-premium">
                  <Plus size={16} />
                  <span className="truncate">{t('erp.newJustification')}</span>
                </button>
              </div>
            </div>

            {/* Mobile Student Selector */}
            {isMobile && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
                {studentList.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentChange(student.id as 'joao' | 'maria')}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all border ${
                      selectedStudentId === student.id
                        ? 'bg-white border-lia-navy text-lia-navy shadow-sm'
                        : 'bg-white/50 border-slate-100 text-slate-400'
                    }`}
                  >
                    <img src={student.avatar} alt={student.name} className="w-6 h-6 rounded-full" />
                    <span className="text-xs font-black uppercase tracking-widest">{student.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: t('erp.average'), value: currentStudent.stats.average, trend: '+0.4', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: t('erp.attendance'), value: currentStudent.stats.attendance, trend: '+1.2%', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: t('erp.behavior'), value: currentStudent.stats.behavior, trend: 'Estável', icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: t('erp.tuition'), value: currentStudent.stats.tuition, trend: 'Em dia', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, idx) => (
                <motion.div 
                  layoutId={`stat-${idx}`}
                  key={idx} 
                  className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-premium transition-all"
                >
                  {loading ? (
                    <div className="animate-pulse space-y-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                      <div className="w-16 h-3 bg-slate-100 rounded" />
                      <div className="w-12 h-6 bg-slate-200 rounded" />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2.5 ${stat.bg} ${stat.color} rounded-xl`}>
                          <stat.icon size={20} />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Performance Chart */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{t('erp.performance')}</h2>
                    <p className="text-xs text-slate-500 font-medium">Média mensal ponderada</p>
                  </div>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest p-2 px-4 focus:outline-none focus:ring-2 focus:ring-lia-navy/10" title="Filtrar por período" aria-label="Filtrar por período">
                    <option>Últimos 6 meses</option>
                    <option>Ano completo</option>
                  </select>
                </div>
                <div className="h-64 md:h-72 w-full relative">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div 
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10"
                      >
                        <div className="w-8 h-8 border-3 border-lia-navy/20 border-t-lia-navy rounded-full animate-spin" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentStudent.performance}>
                      <defs>
                        <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#003366" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                        dy={10}
                      />
                      <YAxis 
                        hide={isMobile}
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                        domain={[10, 20]}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="grade" 
                        stroke="#003366" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorGrade)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-bold text-slate-900">{t('erp.upcoming')}</h2>
                  <button className="p-2.5 text-slate-400 hover:text-[#003366] bg-slate-50 rounded-xl transition-all" title="Ver calendário" aria-label="Ver calendário">
                    <Calendar size={18} />
                  </button>
                </div>
                <div className="space-y-6">
                  {[
                    { title: 'Teste de Matemática', date: '02 Abr', time: '08:30', type: 'Avaliação', color: 'bg-red-50 text-red-600' },
                    { title: 'Reunião de Pais', date: '05 Abr', time: '17:30', type: 'Evento', color: 'bg-blue-50 text-blue-600' },
                    { title: 'Entrega de Trabalho', date: '08 Abr', time: '23:59', type: 'Tarefa', color: 'bg-emerald-50 text-emerald-600' },
                    { title: 'Visita de Estudo', date: '12 Abr', time: '09:00', type: 'Evento', color: 'bg-purple-50 text-purple-600' },
                  ].map((event, idx) => (
                    <div key={idx} className="flex items-center space-x-5 group cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-200 group-hover:bg-[#003366] group-hover:text-white group-hover:border-transparent transition-all shadow-sm">
                        <span className="text-[10px] font-black uppercase leading-none mb-1">{event.date.split(' ')[1]}</span>
                        <span className="text-sm font-black leading-none">{event.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#003366] transition-colors">{event.title}</h4>
                        <div className="flex items-center space-x-2.5">
                          <span className="text-[10px] font-bold text-slate-400">{event.time}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${event.color}`}>{event.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all border border-slate-100">
                  Ver Calendário Completo
                </button>
              </div>
            </div>

            {/* Recent Activity & Grades */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-bold text-slate-900">{t('erp.recentGrades')}</h2>
                  <button className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest hover:underline">Ver Histórico</button>
                </div>
                <div className="overflow-x-auto -mx-2 px-2 scrollbar-none">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                        <th className="pb-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Nota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 relative">
                      {loading && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                          <p className="text-xs font-bold text-lia-navy animate-pulse">A atualizar pautas...</p>
                        </div>
                      )}
                      {currentStudent.recentGrades.map((row, idx) => (
                        <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-5 text-sm font-bold text-slate-900">{row.subject}</td>
                          <td className="py-5 text-xs text-slate-500 font-medium">{row.type}</td>
                          <td className="py-5 text-xs text-slate-500 font-medium">{row.date}</td>
                          <td className="py-5 text-right">
                            <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-black ${
                              row.status === 'high' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {row.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-bold text-slate-900">{t('erp.recentComm')}</h2>
                  <button className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest hover:underline">Ir para Mensagens</button>
                </div>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { author: 'Prof. Ana Silva', subject: 'Progresso em Matemática', time: 'Há 2 horas', excerpt: 'O João demonstrou uma excelente compreensão do novo tópico de álgebra...' },
                    { author: 'Direção Pedagógica', subject: 'Circular Admissões 2026', time: 'Há 1 dia', excerpt: 'Informamos que o período de renovação de matrículas para o próximo ano...' },
                    { author: 'Secretaria', subject: 'Recibo de Pagamento', time: 'Há 3 dias', excerpt: 'O seu pagamento referente ao mês de Março foi processado com sucesso...' },
                  ].map((msg, idx) => (
                    <div key={idx} className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:border-lia-navy/20 hover:bg-white hover:shadow-premium transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-lia-navy transition-colors">{msg.author}</h4>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{msg.time}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mb-2">{msg.subject}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed font-medium">{msg.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab !== 'dashboard' && (
          <div className="flex flex-col items-center justify-center py-24 text-center px-6">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 mb-8 border border-slate-200 shadow-inner">
              <LayoutDashboard size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Módulo em Desenvolvimento</h2>
            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
              Estamos a trabalhar para lhe oferecer a melhor experiência digital. 
              Esta secção estará disponível brevemente no seu Portal Premium.
            </p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="mt-10 px-10 py-4 bg-[#003366] text-white font-black rounded-2xl hover:bg-[#002244] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/10 uppercase tracking-widest text-xs"
            >
              Voltar ao Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      {isMobile ? (
        <ERPMobileLayout 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          menuItems={menuItems}
          onLogout={onLogout}
        >
          {mainContent}
        </ERPMobileLayout>
      ) : (
        <>
          {sidebarContent}
          {mainContent}
        </>
      )}
    </div>
  );
};
