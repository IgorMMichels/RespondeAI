import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface AdOverlayProps {
  isOpen: boolean;
  onAdComplete: () => void;
}

const AdOverlay: React.FC<AdOverlayProps> = ({ isOpen, onAdComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(5);
      setCanSkip(false);
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Placeholder for Video Ad */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          {/* Simulating a video player - In production, this would be your Ad Tag (IMA SDK, VAST, Google Ads) */}
          <div className="text-center text-slate-500">
             <p className="text-2xl font-bold mb-2">Anúncio do Patrocinador</p>
             <p className="text-sm">O vídeo do anúncio seria reproduzido aqui.</p>
             <div className="mt-4 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>

        {/* UI Overlay Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
             Patrocinado
           </div>
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition"
           >
             {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
           </button>
        </div>

        {/* Countdown / Skip Button */}
        <div className="absolute bottom-4 right-4 z-10">
          {canSkip ? (
            <button
              onClick={onAdComplete}
              className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 animate-in fade-in"
            >
              Pular Anúncio <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
              O anúncio termina em {timeLeft}s
            </div>
          )}
        </div>
        
        {/* Progress Bar Simulation */}
        <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-1000 ease-linear" style={{ width: `${(5 - timeLeft) * 20}%` }}></div>
      </div>
    </div>
  );
};

export default AdOverlay;