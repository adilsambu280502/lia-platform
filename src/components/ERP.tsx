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

        {/* ── NOTAS ── */}
        {activeTab === 'grades' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>Pautas & Notas</h1>
                <p className="text-sm text-slate-500 font-medium">Ano letivo 2025/26 — <span className="text-lia-navy font-bold">{currentStudent.grade}</span></p>
              </div>
              <button onClick={handleExport} className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Download size={15} /><span>Exportar</span>
              </button>
            </div>
            {[
              { subject: 'Matemática', t1: '18.5', t2: '19.0', t3: '—', final: '18.8', status: 'high', icon: '📐' },
              { subject: 'Português', t1: '16.5', t2: '17.5', t3: '—', final: '17.0', status: 'mid', icon: '📖' },
              { subject: 'Inglês', t1: '18.0', t2: '18.5', t3: '—', final: '18.3', status: 'high', icon: '🌍' },
              { subject: 'Ciências Nat.', t1: '15.5', t2: '16.0', t3: '—', final: '15.8', status: 'mid', icon: '🔬' },
              { subject: 'História', t1: '17.0', t2: '17.5', t3: '—', final: '17.3', status: 'high', icon: '🏛️' },
              { subject: 'Educação Física', t1: '19.5', t2: '20.0', t3: '—', final: '19.8', status: 'high', icon: '⚽' },
            ].map((row, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-5 flex items-center gap-4">
                <div className="text-2xl w-10 text-center flex-shrink-0">{row.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm">{row.subject}</p>
                  <div className="flex gap-3 mt-1.5 flex-wrap">
                    {[['1.º T', row.t1], ['2.º T', row.t2], ['3.º T', row.t3]].map(([label, val]) => (
                      <span key={label} className="text-[10px] font-bold text-slate-400">{label}: <span className="text-slate-700">{val}</span></span>
                    ))}
                  </div>
                </div>
                <span className={`text-xl font-black px-4 py-2 rounded-xl ${row.status === 'high' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{row.final}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── BOLETIM ── */}
        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>Boletim Escolar</h1>
                <p className="text-sm text-slate-500 font-medium">{currentStudent.name} — {currentStudent.grade}</p>
              </div>
              <button onClick={handleExport} className="flex items-center space-x-2 px-4 py-2.5 bg-lia-navy text-white rounded-xl text-sm font-bold hover:bg-[#002244] transition-all shadow-premium">
                <Download size={15} /><span>Baixar PDF</span>
              </button>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-lia-navy to-[#0a4f8e] p-6 text-white">
                <div className="flex items-center gap-4">
                  <img src={currentStudent.avatar} alt={currentStudent.name} className="w-14 h-14 rounded-2xl border-2 border-white/30" />
                  <div>
                    <p className="font-black text-lg">{currentStudent.name}</p>
                    <p className="text-white/70 text-sm font-medium">{currentStudent.grade} · Ano Letivo 2025/26</p>
                    <p className="text-white/60 text-xs mt-1">Currículo Cambridge International</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">Média Global</p>
                    <p className="text-4xl font-black">{currentStudent.stats.average}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Assiduidade', value: currentStudent.stats.attendance, color: 'text-emerald-600' },
                  { label: 'Comportamento', value: currentStudent.stats.behavior, color: 'text-purple-600' },
                  { label: 'Propinas', value: currentStudent.stats.tuition, color: 'text-amber-600' },
                  { label: 'Escalão', value: 'Excelência', color: 'text-lia-red' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`font-black text-sm ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Observações do Diretor de Turma</p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 rounded-2xl p-4">
                  {currentStudent.name} demonstra um percurso académico consistentemente positivo. Revela elevada maturidade, espírito de equipa e excelente postura na sala de aula. É um exemplo para a turma e um prazer tê-lo/la na LIA.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── MENSAGENS ── */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>Mensagens</h1>
            {[
              { author: 'Prof. Ana Silva', role: 'Matemática', time: 'Há 2h', excerpt: 'O João tem demonstrado grande evolução em álgebra. Está de parabéns pelo esforço e dedicação nas últimas semanas.', unread: true, avatar: 'AS' },
              { author: 'Direção Pedagógica', role: 'Escola', time: 'Há 1 dia', excerpt: 'Circular n.º 12/2026 — Decorrem as renovações de matrícula para o próximo ano letivo. Prazo limite: 30 de Abril.', unread: true, avatar: 'DP' },
              { author: 'Secretaria LIA', role: 'Administrativo', time: 'Há 3 dias', excerpt: 'O seu pagamento de Março foi processado com sucesso. Obrigado pela pontualidade!', unread: false, avatar: 'SL' },
              { author: 'Prof. Carlos Neto', role: 'Educação Física', time: 'Há 1 semana', excerpt: 'As inscrições para a equipa de futebol estão abertas. O João tem perfil para participar.', unread: false, avatar: 'CN' },
            ].map((msg, idx) => (
              <div key={idx} className={`bg-white/80 backdrop-blur-xl rounded-2xl border shadow-sm p-5 flex gap-4 cursor-pointer hover:shadow-premium transition-all ${msg.unread ? 'border-lia-navy/20' : 'border-white'}`}>
                <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-sm ${msg.unread ? 'bg-lia-navy text-white' : 'bg-slate-100 text-slate-500'}`}>{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-black text-slate-900 text-sm">{msg.author}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.role}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {msg.unread && <span className="w-2 h-2 bg-lia-red rounded-full" />}
                      <span className="text-[10px] text-slate-400 font-bold">{msg.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2 font-medium">{msg.excerpt}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── NOTIFICAÇÕES ── */}
        {activeTab === 'notifications' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>Notificações</h1>
            {[
              { title: 'Nova nota registada', desc: 'Matemática — Teste de Álgebra: 19.0 valores', time: 'Hoje, 09:15', color: 'bg-emerald-50 text-emerald-600', icon: GraduationCap },
              { title: 'Reunião de Pais agendada', desc: '05 de Abril às 17h30 — Sala de Reuniões A', time: 'Hoje, 08:00', color: 'bg-blue-50 text-blue-600', icon: Calendar },
              { title: 'Propina de Março confirmada', desc: 'Pagamento processado com sucesso — 95.000 Kz', time: 'Ontem, 14:22', color: 'bg-amber-50 text-amber-600', icon: CreditCard },
              { title: 'Nova mensagem da Escola', desc: 'Prof. Ana Silva enviou uma mensagem sobre o progresso do João', time: 'Há 2 dias', color: 'bg-purple-50 text-purple-600', icon: MessageSquare },
              { title: 'Entrega de trabalho amanhã', desc: 'Ciências Naturais — Relatório do Laboratório', time: 'Há 3 dias', color: 'bg-red-50 text-red-600', icon: FileText },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-5 flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── PAGAMENTOS ── */}
        {activeTab === 'payments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>Pagamentos & Propinas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Propina Mensal', value: '95.000 Kz', icon: CreditCard, color: 'text-lia-navy', bg: 'bg-blue-50' },
                { label: 'Saldo em Dívida', value: '0 Kz', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Próximo Vencimento', value: '01 Maio', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((card, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-5 flex items-center gap-4">
                  <div className={`p-2.5 ${card.bg} ${card.color} rounded-xl`}><card.icon size={20} /></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</p><p className="font-black text-slate-900 text-lg">{card.value}</p></div>
                </div>
              ))}
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Histórico de Pagamentos 2025/26</p>
              </div>
              {[
                { month: 'Março 2026', amount: '95.000 Kz', status: 'Pago', date: '28 Mar 2026', ref: 'LIA-2026-03' },
                { month: 'Fevereiro 2026', amount: '95.000 Kz', status: 'Pago', date: '26 Fev 2026', ref: 'LIA-2026-02' },
                { month: 'Janeiro 2026', amount: '95.000 Kz', status: 'Pago', date: '29 Jan 2026', ref: 'LIA-2026-01' },
                { month: 'Dezembro 2025', amount: '95.000 Kz', status: 'Pago', date: '27 Dez 2025', ref: 'LIA-2025-12' },
              ].map((pay, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <CreditCard size={16} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-sm">{pay.month}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{pay.date} · Ref: {pay.ref}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 text-sm">{pay.amount}</p>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{pay.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── HISTÓRICO ── */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 tracking-tight`}>Histórico Académico</h1>
            {[
              { year: '2024/25', grade: '6.º Ano A', avg: '17.8', status: 'Aprovado', icon: '🏆' },
              { year: '2023/24', grade: '5.º Ano A', avg: '17.2', status: 'Aprovado', icon: '⭐' },
              { year: '2022/23', grade: '4.º Ano A', avg: '16.5', status: 'Aprovado', icon: '✅' },
              { year: '2021/22', grade: '3.º Ano B', avg: '15.8', status: 'Aprovado', icon: '✅' },
            ].map((record, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-5 flex gap-4 items-center">
                <span className="text-2xl">{record.icon}</span>
                <div className="flex-1">
                  <p className="font-black text-slate-900 text-sm">{record.grade}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{record.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lia-navy text-xl">{record.avg}</p>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{record.status}</span>
                </div>
              </div>
            ))}
          </motion.div>
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
