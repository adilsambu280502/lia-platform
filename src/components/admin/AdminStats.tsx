import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Newspaper, 
  Eye, 
  CheckCircle2,
  Image as ImageIcon 
} from 'lucide-react';
import { DashboardStat } from '../../types';

export const AdminStats: React.FC = () => {
  const stats: DashboardStat[] = [
    { label: 'Visitas Hoje', value: '1,284', change: '+12%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Novas Matrículas', value: '42', change: '+5%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Mensagens Chat', value: '156', change: '+24%', icon: Newspaper, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Uptime Sistema', value: '99.9%', change: 'Estável', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentActivity = [
    { user: 'Admin', action: 'Atualizou o Slider Principal', time: 'Há 15 min', icon: ImageIcon, color: 'text-blue-600' },
    { user: 'Secretaria', action: 'Nova Matrícula: Ana Costa', time: 'Há 45 min', icon: Users, color: 'text-emerald-600' },
    { user: 'Admin', action: 'Publicou Notícia: Evento Cambridge', time: 'Há 2 horas', icon: Newspaper, color: 'text-purple-600' },
  ];

  const systemHealth = [
    { label: 'Cloud Database', status: 'Online', health: 100 },
    { label: 'Gemini AI Integration', status: 'Online', health: 100 },
    { label: 'Production Server', status: 'Online', health: 98 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Visão Geral</h1>
          <p className="text-slate-500 font-medium text-lg">Bem-vindo de volta ao centro de controlo da LIA.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-premium transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-8">Atividade Recente</h2>
          <div className="space-y-8">
            {recentActivity.map((log, idx) => (
              <div key={idx} className="flex items-center space-x-6">
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${log.color}`}>
                  <log.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900">{log.action}</p>
                  <p className="text-sm text-slate-400">{log.user} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-8">Uptime do Sistema</h2>
          <div className="space-y-8">
            {systemHealth.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-emerald-600">{item.status}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.health}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
