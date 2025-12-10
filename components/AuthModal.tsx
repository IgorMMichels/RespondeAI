import React, { useState } from 'react';
import { X, CheckCircle, Shield, CreditCard, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'signup' | 'trial'>('signup');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('trial');
    }, 1000);
  };

  const handleStartTrial = () => {
    setLoading(true);
    // Simulate Payment API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'signup' ? (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Mantenha esta resposta!</h2>
              <p className="text-slate-600 mt-2">Crie uma conta gratuita para copiar este texto e salvar a reputação da sua marca.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Profissional</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="voce@suaempresa.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                <input 
                  type="password" 
                  required 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar Conta Grátis'}
              </button>
            </form>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              Ao se cadastrar, você concorda com nossos Termos de Uso.
            </p>
          </div>
        ) : (
          <div className="p-8 bg-gradient-to-b from-blue-50 to-white">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Conta Criada!</h2>
              <p className="text-slate-600 mt-2">Comece seu teste gratuito de 7 dias para desbloquear recursos ilimitados.</p>
            </div>

            <div className="bg-white border border-blue-100 rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-800">Plano Pro</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">RECOMENDADO</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Respostas Ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Todos os Tons de Voz
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Suporte Multi-idioma
                </li>
              </ul>
              <div className="text-center border-t border-slate-100 pt-3">
                <p className="text-2xl font-bold text-slate-900">R$ 29,90<span className="text-sm text-slate-500 font-normal">/mês</span></p>
                <p className="text-xs text-slate-500">Cobrado após 7 dias.</p>
              </div>
            </div>

            <button 
              onClick={handleStartTrial}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-green-200 active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Começar Teste Grátis de 7 Dias
                </>
              )}
            </button>
            <button onClick={onClose} className="w-full mt-3 text-slate-400 text-sm hover:text-slate-600">
              Talvez depois
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;