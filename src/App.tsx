import React, { useState, useEffect } from 'react';
import { useMemoriceGame } from './hooks/useMemoriceGame';
import { HomeScreen } from './components/HomeScreen';
import { InstructionsScreen } from './components/InstructionsScreen';
import { BoardScreen } from './components/BoardScreen';
import { WinScreen } from './components/WinScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { SettingsModal } from './components/SettingsModal';
import { Settings, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from './utils/audio';

export const App: React.FC = () => {
  const {
    screen,
    cards,
    matchedPairs,
    timeRemaining,
    settings,
    setSettings,
    goToInstructions,
    startGame,
    goToHome,
    handleCardClick,
  } = useMemoriceGame();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Preload all assets to guarantee instantaneous transitions & flips
  useEffect(() => {
    const assetsToPreload = [
      '/assets/screens/bg_home.png',
      '/assets/screens/bg_board.png',
      '/assets/screens/bg_win.png',
      '/assets/screens/bg_gameover.png',
      '/assets/cards/card_back.png',
      '/assets/cards/pediasure_can.png',
      '/assets/cards/pediasure_logo.png',
      '/assets/cards/pediasure_10_can.png',
      '/assets/cards/pediasure_10_logo.png',
      '/assets/cards/glucerna_can.png',
      '/assets/cards/glucerna_logo.png',
      '/assets/cards/ensure_advance_can.png',
      '/assets/cards/ensure_advance_logo.png',
    ];

    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleSound = () => {
    setSettings((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  return (
    <div className="relative w-screen h-screen bg-[#000511] flex items-center justify-center overflow-hidden">
      {/* 
        Container with fixed 9:16 aspect ratio (1080x1920)
        Automatically fits to 100% of height while maintaining proportions,
        or expands to fill 100% on a 1080x1920 kiosk display.
      */}
      <div
        className="relative w-full h-full max-h-screen aspect-[9/16] max-w-[calc(100vh*(9/16))] bg-black overflow-hidden shadow-[0_0_80px_rgba(0,163,224,0.15)] flex flex-col"
        style={{
          boxShadow: '0 0 100px rgba(0, 30, 80, 0.8), 0 0 40px rgba(229, 178, 93, 0.15)',
        }}
      >
        {/* Subtle Abbott Logo Secret Click Area for Staff Settings (top 15% center) */}
        <div
          onDoubleClick={() => setIsSettingsOpen(true)}
          className="absolute top-0 left-1/4 right-1/4 h-[14%] z-30 cursor-default"
          title="Doble clic para ajustes de stand"
        />

        {/* Current Active Screen */}
        {screen === 'HOME' && <HomeScreen onStart={goToInstructions} />}

        {screen === 'INSTRUCTIONS' && (
          <InstructionsScreen
            settings={settings}
            onStartGame={startGame}
          />
        )}

        {screen === 'PLAYING' && (
          <BoardScreen
            cards={cards}
            matchedPairs={matchedPairs}
            timeRemaining={timeRemaining}
            showTimerHud={settings.showTimerHud}
            onCardClick={handleCardClick}
            onRestart={startGame}
          />
        )}

        {screen === 'WIN' && (
          <WinScreen
            onPlayAgain={goToHome}
            autoResetSeconds={settings.winAutoResetSeconds}
          />
        )}

        {screen === 'GAMEOVER' && (
          <GameOverScreen
            onRetry={startGame}
            onHome={goToHome}
            autoResetSeconds={settings.gameOverAutoResetSeconds}
          />
        )}

        {/* Discreet Stand Floating Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2 opacity-35 hover:opacity-100 transition-opacity duration-300">
          {/* Quick Sound Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            title={settings.soundEnabled ? 'Silenciar' : 'Activar sonido'}
            className="p-2.5 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-md hover:bg-black/70 active:scale-95 transition-all shadow-md"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-[#00A3E0]" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/50" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            className="p-2.5 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-md hover:bg-black/70 active:scale-95 transition-all shadow-md"
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5 text-[#E5B25D]" />
            ) : (
              <Maximize className="w-5 h-5 text-[#E5B25D]" />
            )}
          </button>

          {/* Stand Settings Gear */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              setIsSettingsOpen(true);
            }}
            title="Ajustes de stand"
            className="p-2.5 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-md hover:bg-black/70 active:scale-95 transition-all shadow-md"
          >
            <Settings className="w-5 h-5 text-white/80" />
          </button>
        </div>
      </div>

      {/* Operator Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={setSettings}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
};
