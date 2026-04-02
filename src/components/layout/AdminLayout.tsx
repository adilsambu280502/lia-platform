import React from 'react';
import { motion } from 'motion/react';
import { Toaster } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#F1F5F9] font-sans selection:bg-[#E31E24] selection:text-white overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[40vw] rounded-full bg-slate-300/20 blur-[100px] pointer-events-none" />

      <Toaster position="top-right" expand={false} richColors />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};
