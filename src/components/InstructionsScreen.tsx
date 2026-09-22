import React, { useState, useEffect } from 'react';
import { Timer, Sparkles, Layers, Trophy, ArrowRight } from 'lucide-react';
import { GameSettings } from '../types';
import { soundManager } from '../utils/audio';

interface InstructionsScreenProps {
  settings: GameSettings;
  onStartGame: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({
  settings,
  onStartGame,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(settings.instructionsSeconds);

  // Countdown timer to start game automatically
  useEffect(() => {
    if (secondsLeft <= 0) {
      onStartGame();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onStartGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onStartGame]);

  const handleManualStart = () => {
    soundManager.playClick();
    onStartGame();
  };

  const progressPercentage =
    ((settings.instructionsSeconds - secondsLeft) / settings.instructionsSeconds) * 100;

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1080x1920 Background with Abbott Logo and bottom waves */}
      <img
        src="/assets/screens/bg_board.png"
        alt="Abbott Instructions Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Main Content Area - Positioned safely below the Abbott logo (y > 17%) */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[86%] max-w-[620px] bottom-[6%] flex flex-col justify-between items-center z-10">
        {/* Title Section */}
        <div className="text-center w-full">
          <h1
            className="text-[clamp(28px,5.2vw,46px)] font-black tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            style={{
              background: 'linear-gradient(180deg, #F9E7B9 0%, #E5B25D 60%, #C98F32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CÓMO JUGAR
          </h1>
          <p className="mt-1 text-[clamp(11px,1.8vw,16px)] font-bold tracking-widest text-[#00A3E0] uppercase">
            Encuentra las 8 parejas idénticas
          </p>
        </div>

        {/* PROMINENT CONFIG TIMER HIGHLIGHT CARD */}
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#001736]/90 via-[#002654]/85 to-[#001736]/90 border border-[#E5B25D]/60 backdrop-blur-md shadow-[0_0_30px_rgba(229,178,93,0.25)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D49D42] to-[#F3D88C] flex items-center justify-center shadow-lg shadow-[#D49D42]/40 shrink-0">
              <Timer className="w-8 h-8 text-[#001736] animate-pulse" />
            </div>
            <div>
              <div className="text-[clamp(10px,1.5vw,13px)] font-bold text-white/70 uppercase tracking-widest">
                Tiempo límite configurado
              </div>
              <div className="text-[clamp(20px,3.8vw,32px)] font-black text-[#F3D88C] tracking-wide">
                {settings.timerSeconds} SEGUNDOS
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/50 text-[#00A3E0] text-[clamp(10px,1.4vw,12px)] font-bold uppercase tracking-wider shadow-sm">
              8 PAREJAS
            </span>
          </div>
        </div>

        {/* 3 Step Instruction Cards */}
        <div className="w-full space-y-3 sm:space-y-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#001026]/75 border border-white/15 backdrop-blur-md flex items-center gap-4 shadow-lg hover:border-[#00A3E0]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/20 border border-[#00A3E0]/50 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6 text-[#00A3E0]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[clamp(14px,2.2vw,18px)] text-white">
                1. Toca y voltea 2 cartas
              </h3>
              <p className="text-[clamp(11px,1.6vw,14px)] text-white/75 mt-0.5 leading-snug">
                Selecciona cualquier carta del tablero para descubrir los productos Abbott.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#001026]/75 border border-white/15 backdrop-blur-md flex items-center gap-4 shadow-lg hover:border-[#E5B25D]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#E5B25D]/20 border border-[#E5B25D]/50 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#E5B25D]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[clamp(14px,2.2vw,18px)] text-white">
                2. Encuentra las parejas
              </h3>
              <p className="text-[clamp(11px,1.6vw,14px)] text-white/75 mt-0.5 leading-snug">
                Memoriza las posiciones y empareja las cartas idénticas de PediaSure, Glucerna y Ensure.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#001026]/75 border border-white/15 backdrop-blur-md flex items-center gap-4 shadow-lg hover:border-emerald-400/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[clamp(14px,2.2vw,18px)] text-white">
                3. ¡Completa el tablero!
              </h3>
              <p className="text-[clamp(11px,1.6vw,14px)] text-white/75 mt-0.5 leading-snug">
                Descubre las 8 parejas antes de que termine el tiempo para ganar.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action & Countdown Section */}
        <div className="w-full flex flex-col items-center gap-3">
          {/* Automatic Countdown bar */}
          <div className="w-full flex items-center justify-between text-[clamp(11px,1.5vw,14px)] text-white/70 tracking-wider">
            <span>Iniciando juego automáticamente...</span>
            <span className="font-mono font-bold text-[#F3D88C] text-sm">
              {secondsLeft}s
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#00A3E0] to-[#E5B25D] transition-all duration-1000 ease-linear rounded-full shadow-[0_0_8px_#E5B25D]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Large Golden CTA Button */}
          <button
            onClick={handleManualStart}
            className="mt-2 w-full py-4 rounded-full cursor-pointer overflow-hidden transition-all duration-200 active:scale-95 shadow-[0_0_35px_rgba(229,178,93,0.4)] hover:shadow-[0_0_50px_rgba(243,216,140,0.7)] group border border-white/30 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(180deg, #E6BA67 0%, #D49D42 50%, #B87B24 100%)',
            }}
          >
            <span className="text-[clamp(20px,3.8vw,32px)] font-black tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] uppercase">
              ¡EMPEZAR AHORA!
            </span>
            <ArrowRight className="w-7 h-7 text-white group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
