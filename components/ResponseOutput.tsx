import React, { useState } from 'react';
import { Copy, Check, Sparkles, Lock } from 'lucide-react';

interface ResponseOutputProps {
  response: string | null;
  loading: boolean;
  isUnlocked: boolean;
  onCopyAttempt: (text: string) => void;
}

const ResponseOutput: React.FC<ResponseOutputProps> = ({ response, loading, isUnlocked, onCopyAttempt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    if (!response) return;

    if (!isUnlocked) {
      onCopyAttempt(response);
      return;
    }

    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Anti-theft handler
  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isUnlocked) {
      e.preventDefault();
    }
  };

  if (!response && !loading) {
    return (
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
        <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 font-medium">Sua resposta profissional aparecerá aqui</p>
        <p className="text-slate-400 text-sm">Selecione um tom e clique em gerar para começar</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
       <div className="flex justify-between items-end">
         <label className="block text-sm font-medium text-slate-700">
          Resposta Profissional Gerada
        </label>
        {!isUnlocked && response && !loading && (
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Modo Visualização
          </span>
        )}
       </div>
      
      <div className="relative group">
        <div 
          onContextMenu={handleContextMenu}
          className={`
          w-full rounded-xl border p-6 min-h-[160px] transition-all
          ${loading ? 'bg-slate-50 border-slate-200' : 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100'}
          ${!isUnlocked && !loading ? 'no-select cursor-default' : ''}
        `}>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 font-medium animate-pulse">Criando a resposta perfeita...</p>
            </div>
          ) : (
            <div className="prose prose-blue max-w-none text-slate-800 whitespace-pre-wrap leading-relaxed select-none md:select-none">
              {response}
            </div>
          )}
        </div>

        {response && !loading && (
          <button
            onClick={handleCopyClick}
            className={`
              absolute top-3 right-3 p-2 backdrop-blur-sm border rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isUnlocked 
                ? 'bg-white/90 border-slate-200 hover:bg-slate-50 hover:text-blue-600' 
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:shadow-md animate-pulse'}
            `}
            title={isUnlocked ? "Copiar para área de transferência" : "Desbloquear para copiar"}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : isUnlocked ? (
              <Copy className="w-5 h-5" />
            ) : (
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-bold">COPIAR</span>
                <Lock className="w-3 h-3" />
              </div>
            )}
          </button>
        )}
      </div>
      
      {response && !loading && (
        <p className="text-xs text-slate-500 text-right">
          {isUnlocked 
            ? "Pronto para colar na plataforma de avaliações." 
            : "Crie uma conta gratuita para copiar e usar esta resposta."}
        </p>
      )}
    </div>
  );
};

export default ResponseOutput;