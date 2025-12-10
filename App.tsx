import React, { useState } from 'react';
import Header from './components/Header';
import ToneSelector from './components/ToneSelector';
import ReviewInput from './components/ReviewInput';
import ResponseOutput from './components/ResponseOutput';
import AdOverlay from './components/AdOverlay'; // Import new Ad component
import { ResponseTone } from './types';
import { generateReviewResponse } from './services/geminiService';
import { Wand2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [reviewText, setReviewText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ResponseTone>(ResponseTone.PROFESSIONAL);
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ad State
  const [showAd, setShowAd] = useState(false);

  // 1. User clicks Generate
  const handleGenerateClick = () => {
    if (!reviewText.trim()) {
      setError("Por favor, insira uma avaliação do cliente primeiro.");
      return;
    }
    setError(null);
    
    // Trigger Ad before generating
    setShowAd(true);
  };

  // 2. Ad is finished (or skipped) -> Run AI
  const handleAdComplete = async () => {
    setShowAd(false); // Close Ad
    setIsLoading(true); // Start loading UI
    setGeneratedResponse(null);

    try {
      const response = await generateReviewResponse({
        reviewText,
        tone: selectedTone,
      });
      setGeneratedResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <div className="flex flex-col gap-8">
          
          {/* Input Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Avaliação Recebida</h2>
              <p className="text-slate-500 text-sm mb-6">Cole o feedback do cliente abaixo.</p>
              <ReviewInput 
                value={reviewText} 
                onChange={(val) => {
                  setReviewText(val);
                  if (error) setError(null);
                }} 
                disabled={isLoading}
              />
            </div>

            <div className="pt-6 border-t border-slate-100">
              <ToneSelector 
                selectedTone={selectedTone} 
                onSelectTone={setSelectedTone} 
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !reviewText.trim()}
              className={`
                w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold text-lg transition-all transform
                ${isLoading || !reviewText.trim() 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'}
              `}
            >
              <Wand2 className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Gerando...' : 'Gerar Resposta'}</span>
            </button>
            <p className="text-xs text-center text-slate-400">
              Ao clicar em gerar, um breve anúncio de vídeo será exibido para manter a plataforma gratuita.
            </p>
          </div>

          {/* Output Area - Always Below */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[300px] flex flex-col">
              <div className="flex-grow">
                <ResponseOutput 
                  response={generatedResponse} 
                  loading={isLoading} 
                />
              </div>
            </div>

            {/* Helper Tips */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">Dicas Pro:</h3>
              <ul className="space-y-2 text-xs text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Sempre revise a resposta da IA para garantir precisão factual.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Adicione um toque pessoal, como assinar com seu nome.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Tente o tom "Diplomático" mesmo para avaliações injustas para manter sua imagem.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Responde AI. 100% Gratuito.</p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Termos de Uso</a>
            <a href="#" className="hover:text-slate-600">Privacidade</a>
            <a href="#" className="hover:text-slate-600">Contato</a>
          </div>
        </div>
      </footer>

      {/* Ad Component */}
      <AdOverlay 
        isOpen={showAd} 
        onAdComplete={handleAdComplete} 
      />
    </div>
  );
};

export default App;