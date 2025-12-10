import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

interface ResponseOutputProps {
  response: string | null;
  loading: boolean;
}

const ResponseOutput: React.FC<ResponseOutputProps> = ({ response, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar", err);
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
       </div>
      
      <div className="relative group">
        <div 
          className={`
          w-full rounded-xl border p-6 min-h-[160px] transition-all
          ${loading ? 'bg-slate-50 border-slate-200' : 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100'}
        `}>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 font-medium animate-pulse">Criando a resposta perfeita...</p>
            </div>
          ) : (
            <div className="prose prose-blue max-w-none text-slate-800 whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          )}
        </div>

        {response && !loading && (
          <button
            onClick={handleCopyClick}
            className="absolute top-3 right-3 p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Copiar para área de transferência"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      
      {response && !loading && (
        <p className="text-xs text-slate-500 text-right">
          Pronto para colar na plataforma de avaliações.
        </p>
      )}
    </div>
  );
};

export default ResponseOutput;