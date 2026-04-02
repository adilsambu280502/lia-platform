import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageSelector } from './LanguageSelector';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
  portalType?: 'parent' | 'admin';
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack, portalType }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (
        (email === 'parent@lia.ao' && password === 'password') ||
        (email === 'admin@lia.ao' && password === 'admin')
      ) {
        setError('');
        onLogin();
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans relative">
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <button onClick={onBack} className="mb-8 text-[#003366] font-bold text-sm hover:underline flex items-center justify-center space-x-2 mx-auto">
            <span>← Voltar ao Website</span>
          </button>
          <div className="flex flex-col items-center justify-center mb-8">
            {imageError ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="h-24 w-24 bg-[#003366] rounded-3xl flex items-center justify-center text-white text-4xl font-black tracking-tighter shadow-xl shadow-blue-900/20 mb-4 border border-white/50 ring-4 ring-[#003366]/5"
              >
                LIA
              </motion.div>
            ) : (
              <img 
                src="/logo.png" 
                alt="LIA Logo" 
                className="h-24 w-auto object-contain drop-shadow-lg mb-4"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-[#003366] tracking-tight">
            {portalType === 'admin' ? 'Portal do Administrador' : 'Portal do Encarregado'}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Introduza as suas credenciais para aceder.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100"
        >
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <h4 className="text-sm font-bold text-blue-800 mb-2">Credenciais de Acesso (Demonstração):</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Encarregado:</strong> email: <span className="font-mono">parent@lia.ao</span> | senha: <span className="font-mono">password</span></p>
              <p><strong>Administrador:</strong> email: <span className="font-mono">admin@lia.ao</span> | senha: <span className="font-mono">admin</span></p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.ao"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#003366] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Palavra-passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#003366] transition-all"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#003366] focus:ring-[#003366]" />
                <span className="text-xs font-bold text-gray-500">Lembrar-me</span>
              </label>
              <a href="#" className="text-xs font-bold text-[#E31E24] hover:underline">Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#003366] text-white font-bold rounded-2xl hover:bg-[#002244] transition-all flex items-center justify-center space-x-3 shadow-xl disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar no Portal</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-center space-x-2 text-gray-400">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Acesso Seguro SSL</span>
          </div>
        </motion.div>

        <p className="text-center mt-10 text-xs font-medium text-gray-400">
          Problemas no acesso? Contacte o suporte da LIA.
        </p>
      </div>
    </div>
  );
};
