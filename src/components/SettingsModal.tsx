import React from 'react';
import { GameSettings } from '../types';
import { X, Volume2, VolumeX, Clock, RotateCcw, Maximize, Minimize, HelpCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  isFullscreen,
  onToggleFullscreen,
}) => {
  if (!isOpen) return null;

  const timerOptions = [
    { label: '30 seg', value: 30 },
    { label: '45 seg', value: 45 },
    { label: '60 seg (Estándar)', value: 60 },
    { label: '90 seg', value: 90 },
    { label: '120 seg', value: 120 },
  ];

  const instructionsDelayOptions = [
    { label: '3 seg', value: 3 },
    { label: '5 seg (Estándar)', value: 5 },
    { label: '7 seg', value: 7 },
    { label: '10 seg', value: 10 },
  ];

  const resetDelayOptions = [
    { label: '5 seg', value: 5 },
    { label: '7 seg (Estándar)', value: 7 },
    { label: '10 seg', value: 10 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#001736] border border-[#E5B25D]/50 rounded-2xl p-6 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E5B25D] shadow-[0_0_8px_#E5B25D]" />
            <h2 className="text-xl font-bold tracking-wide text-[#F3D88C]">
              Configuración del Stand
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-5">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-[#00A3E0]" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/40" />
              )}
              <span className="font-medium text-sm">Efectos de Sonido</span>
            </div>
            <button
              onClick={() =>
                onSaveSettings({
                  ...settings,
                  soundEnabled: !settings.soundEnabled,
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-[#00A3E0]' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-[#E5B25D]" />
              ) : (
                <Maximize className="w-5 h-5 text-[#E5B25D]" />
              )}
              <span className="font-medium text-sm">Pantalla Completa (Kiosko)</span>
            </div>
            <button
              onClick={onToggleFullscreen}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              {isFullscreen ? 'Salir' : 'Activar'}
            </button>
          </div>

          {/* Game Timer limit */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-[#E5B25D]" />
              <label className="font-medium text-sm">Tiempo límite de partida</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timerOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    onSaveSettings({ ...settings, timerSeconds: opt.value })
                  }
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    settings.timerSeconds === opt.value
                      ? 'bg-[#E5B25D]/20 border-[#E5B25D] text-[#F3D88C] shadow-[0_0_10px_rgba(229,178,93,0.3)]'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions screen duration */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-[#00A3E0]" />
              <label className="font-medium text-sm">Duración pantalla instrucciones</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {instructionsDelayOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    onSaveSettings({
                      ...settings,
                      instructionsSeconds: opt.value,
                    })
                  }
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    settings.instructionsSeconds === opt.value
                      ? 'bg-[#00A3E0]/20 border-[#00A3E0] text-cyan-300 shadow-[0_0_10px_rgba(0,163,224,0.3)]'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auto reset delay on win screen */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <RotateCcw className="w-5 h-5 text-[#E5B25D]" />
              <label className="font-medium text-sm">
                Reinicio automático tras ganar
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {resetDelayOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    onSaveSettings({
                      ...settings,
                      winAutoResetSeconds: opt.value,
                    })
                  }
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    settings.winAutoResetSeconds === opt.value
                      ? 'bg-[#E5B25D]/20 border-[#E5B25D] text-[#F3D88C] shadow-[0_0_10px_rgba(229,178,93,0.3)]'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D49D42] to-[#B87B24] text-white font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
