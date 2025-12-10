import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center sm:justify-between max-w-5xl">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Responde AI</h1>
        </div>

        {/* Basic Badge - No Login Logic */}
        <div className="hidden sm:flex items-center gap-2">
           <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">
             100% Gratuito
           </span>
        </div>
      </div>
    </header>
  );
};

export default Header;