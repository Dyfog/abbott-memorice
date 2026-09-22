import React from 'react';
import { CardItem } from '../types';
import { CardComponent } from './CardComponent';
import { RotateCcw, Timer, Award } from 'lucide-react';

interface BoardScreenProps {
  cards: CardItem[];
  matchedPairs: number;
  timeRemaining: number;
  showTimerHud: boolean;
  onCardClick: (card: CardItem) => void;
  onRestart: () => void;
}

export const BoardScreen: React.FC<BoardScreenProps> = ({
  cards,
  matchedPairs,
  timeRemaining,
  showTimerHud,
  onCardClick,
  onRestart,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemaining <= 10;

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Background Graphic (1080x1920) */}
      <img
        src="/assets/screens/bg_board.png"
        alt="Abbott Memorice Board Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Elegant Status HUD below Abbott Logo */}
      {showTimerHud && (
        <div className="absolute top-[16%] left-0 right-0 px-[8%] flex items-center justify-between z-20 pointer-events-auto">
          {/* Timer Pill */}
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
              isTimeCritical
                ? 'bg-red-950/70 border-red-500/80 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                : 'bg-black/35 border-[#E5B25D]/40 text-[#F3D88C] shadow-[0_0_10px_rgba(229,178,93,0.2)]'
            }`}
          >
            <Timer className="w-5 h-5 text-[#E5B25D]" />
            <span className="font-mono font-bold text-[clamp(14px,2.2cqw,22px)] tracking-wider">
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Matched Pairs Pill */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/35 border border-[#E5B25D]/40 text-[#F3D88C] backdrop-blur-md shadow-[0_0_10px_rgba(229,178,93,0.2)]">
            <Award className="w-5 h-5 text-[#00A3E0]" />
            <span className="font-semibold text-[clamp(13px,2cqw,20px)] tracking-wide">
              {matchedPairs} / 8 parejas
            </span>
          </div>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            title="Reiniciar juego"
            className="p-2 rounded-full bg-black/35 border border-white/20 text-white/80 hover:text-white hover:bg-black/60 transition-all active:scale-90"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 4x4 Grid of 16 Cards */}
      <div className="absolute top-[21.5%] left-1/2 -translate-x-1/2 w-[86%] max-w-[880px] z-10">
        <div className="grid grid-cols-4 gap-[clamp(8px,1.5cqw,16px)]">
          {cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={onCardClick}
              disabled={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
