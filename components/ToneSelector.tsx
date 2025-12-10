import React from 'react';
import { ResponseTone } from '../types';
import { Heart, Briefcase, Handshake, Info } from 'lucide-react';

interface ToneSelectorProps {
  selectedTone: ResponseTone;
  onSelectTone: (tone: ResponseTone) => void;
  disabled: boolean;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelectTone, disabled }) => {
  
  const tones = [
    {
      value: ResponseTone.GRATEFUL,
      label: 'Grato',
      icon: <Heart className="w-5 h-5 mb-1" />,
      desc: 'Para elogios',
      color: 'hover:bg-green-50 border-green-200 text-green-700',
      activeColor: 'bg-green-100 border-green-500 ring-1 ring-green-500',
    },
    {
      value: ResponseTone.PROFESSIONAL,
      label: 'Profissional',
      icon: <Briefcase className="w-5 h-5 mb-1" />,
      desc: 'Neutro & Padrão',
      color: 'hover:bg-slate-50 border-slate-200 text-slate-700',
      activeColor: 'bg-slate-100 border-slate-500 ring-1 ring-slate-500',
    },
    {
      value: ResponseTone.DIPLOMATIC,
      label: 'Diplomático',
      icon: <Handshake className="w-5 h-5 mb-1" />,
      desc: 'Para reclamações',
      color: 'hover:bg-amber-50 border-amber-200 text-amber-700',
      activeColor: 'bg-amber-100 border-amber-500 ring-1 ring-amber-500',
    },
    {
      value: ResponseTone.CLARIFICATION,
      label: 'Esclarecer',
      icon: <Info className="w-5 h-5 mb-1" />,
      desc: 'Mal-entendidos',
      color: 'hover:bg-blue-50 border-blue-200 text-blue-700',
      activeColor: 'bg-blue-100 border-blue-500 ring-1 ring-blue-500',
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Selecione o Tom da Resposta
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onSelectTone(tone.value)}
            disabled={disabled}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
              ${selectedTone === tone.value ? tone.activeColor : `bg-white ${tone.color}`}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}
            `}
          >
            {tone.icon}
            <span className="font-semibold text-sm">{tone.label}</span>
            <span className="text-xs opacity-75 mt-1 hidden sm:block">{tone.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;