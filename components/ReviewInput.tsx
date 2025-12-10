import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ReviewInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const ReviewInput: React.FC<ReviewInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="space-y-3">
      <label htmlFor="review" className="block text-sm font-medium text-slate-700">
        Avaliação do Cliente
      </label>
      <div className="relative">
        <textarea
          id="review"
          rows={6}
          className="block w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-4 pl-11 bg-white resize-y"
          placeholder="Cole aqui a avaliação do cliente (mesmo com erros de digitação ou agressiva)..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <div className="absolute top-4 left-4 text-slate-400 pointer-events-none">
          <MessageSquare className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs text-slate-500">
        A IA detectará automaticamente o idioma (ex: Inglês, Espanhol, Português) e responderá no mesmo idioma.
      </p>
    </div>
  );
};

export default ReviewInput;