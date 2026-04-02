import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Download, 
  Trash2, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export const NewsletterManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('lia_subscribers') || '[]');
    setSubscribers(data);
  }, []);

  const handleDelete = (id: string) => {
    const updated = subscribers.filter(s => s.id !== id);
    setSubscribers(updated);
    localStorage.setItem('lia_subscribers', JSON.stringify(updated));
    toast.success('Subscritor removido com sucesso.');
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "E-mail,Data de Inscrição\n"
      + subscribers.map(s => `${s.email},${s.date}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lia_newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Lista exportada para CSV!');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#003366] mb-2 uppercase">Gestão de Newsletter</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Base de Dados de Marketing Direto</p>
        </div>
        
        <button 
          onClick={handleExport}
          disabled={subscribers.length === 0}
          className="flex items-center space-x-2 px-8 py-4 bg-[#003366] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#002244] shadow-premium transition-all disabled:opacity-50"
        >
          <Download size={14} />
          <span>Exportar para CSV (Excel)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-premium border border-white flex items-center space-x-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003366]">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Subscritores</p>
            <p className="text-3xl font-black text-[#003366] tracking-tight">{subscribers.length}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-premium border border-white flex items-center space-x-6">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado do Sistema</p>
            <p className="text-3xl font-black text-green-600 tracking-tight">Ativo</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-premium border border-white flex items-center space-x-6">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-lia-red">
            <Mail size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mails Enviados</p>
            <p className="text-3xl font-black text-lia-red tracking-tight">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-premium border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Inscrição</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <AlertCircle size={48} className="mb-4" />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Nenhum subscritor registado.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-white transition-colors">
                    <td className="px-8 py-6 font-bold text-[#003366]">{subscriber.email}</td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-lia-red opacity-50" />
                        <span>{new Date(subscriber.date).toLocaleDateString('pt-PT')}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleDelete(subscriber.id)}
                        title="Eliminar Subscritor"
                        className="p-2 text-gray-400 hover:text-lia-red hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
