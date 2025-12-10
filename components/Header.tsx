import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onTrial: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onTrial }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Responde AI</h1>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-semibold text-slate-700">Minha Conta</p>
                 <p className="text-xs text-green-600 font-medium">Plano Pro Ativo</p>
               </div>
               <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 text-blue-600 shadow-sm">
                 <User className="w-5 h-5" />
               </div>
            </div>
          ) : (
            <>
              <button 
                onClick={onLogin}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors px-2 py-2"
              >
                Entrar
              </button>
              <button 
                onClick={onTrial}
                className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95 hover:shadow-md"
              >
                Teste Grátis
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;