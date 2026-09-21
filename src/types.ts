export type CardType =
  | 'pediasure_can'
  | 'pediasure_logo'
  | 'pediasure_10_can'
  | 'pediasure_10_logo'
  | 'glucerna_can'
  | 'glucerna_logo'
  | 'ensure_advance_can'
  | 'ensure_advance_logo';

export interface CardItem {
  id: string;
  type: CardType;
  image: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameScreen = 'HOME' | 'PLAYING' | 'WIN' | 'GAMEOVER';

export interface GameSettings {
  timerSeconds: number; // e.g. 60
  soundEnabled: boolean;
  winAutoResetSeconds: number; // e.g. 6
  showTimerHud: boolean;
}
