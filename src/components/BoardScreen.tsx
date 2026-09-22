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

      {/* High-Impact Kiosk Status HUD below Abbott Logo */}
      {showTimerHud && (
        <div className="absolute top-[14.8%] left-1/2 -translate-x-1/2 w-[86%] max-w-[880px] flex items-center justify-between z-20 pointer-events-auto">
          {/* Left: Timer Badge */}
          <div
            className={`flex items-center gap-2.5 sm:gap-3.5 px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 shadow-xl ${
              isTimeCritical
                ? 'bg-red-950/85 border-red-500 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse'
                : 'bg-gradient-to-r from-[#001736]/90 to-[#00224d]/90 border-[#E5B25D]/70 text-[#F3D88C] shadow-[0_0_20px_rgba(229,178,93,0.3)]'
            }`}
          >
            <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-[#E5B25D] animate-pulse shrink-0 drop-shadow-[0_0_6px_rgba(229,178,93,0.6)]" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-white/60 -mb-0.5 sm:-mb-1">
                Tiempo
              </span>
              <span className="font-mono font-black text-[clamp(18px,3cqw,32px)] tracking-wider drop-shadow-[0_0_8px_rgba(243,216,140,0.5)]">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Center: Matched Pairs Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-gradient-to-r from-[#001736]/90 to-[#00224d]/90 border-2 border-[#00A3E0]/70 text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,163,224,0.3)]">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#00A3E0] shrink-0 drop-shadow-[0_0_6px_rgba(0,163,224,0.6)]" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-[#00A3E0]/80 -mb-0.5 sm:-mb-1">
                Parejas
              </span>
              <span className="font-black text-[clamp(16px,2.6cqw,28px)] tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                <strong className="text-[#F3D88C] drop-shadow-[0_0_6px_rgba(243,216,140,0.6)]">{matchedPairs}</strong>{' '}
                <span className="text-white/60 text-[clamp(13px,1.9cqw,20px)]">/ 8</span>
              </span>
            </div>
          </div>

          {/* Right: Kiosk-Sized Restart Button */}
          <button
            onClick={onRestart}
            title="Reiniciar juego"
            aria-label="Reiniciar juego"
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#001f47]/90 to-[#00142e]/90 border-2 border-white/30 text-white/80 hover:text-white hover:border-[#E5B25D] hover:shadow-[0_0_20px_rgba(229,178,93,0.5)] transition-all active:scale-90 flex items-center justify-center cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-5 h-5 sm:w-7 sm:h-7" />
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
