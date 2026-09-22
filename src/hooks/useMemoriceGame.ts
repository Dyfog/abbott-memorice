import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CardItem, CardType, GameScreen, GameSettings } from '../types';
import { soundManager } from '../utils/audio';

const CARD_DEFINITIONS: { type: CardType; label: string }[] = [
  { type: 'pediasure_can', label: 'PediaSure' },
  { type: 'pediasure_logo', label: 'PediaSure' },
  { type: 'pediasure_10_can', label: 'PediaSure 10+' },
  { type: 'pediasure_10_logo', label: 'PediaSure 10+' },
  { type: 'glucerna_can', label: 'Glucerna' },
  { type: 'glucerna_logo', label: 'Glucerna' },
  { type: 'ensure_advance_can', label: 'Ensure Advance' },
  { type: 'ensure_advance_logo', label: 'Ensure Advance' },
];

function generateShuffledDeck(): CardItem[] {
  const deck: CardItem[] = [];

  CARD_DEFINITIONS.forEach((def, typeIdx) => {
    for (let copy = 1; copy <= 2; copy++) {
      deck.push({
        id: `card-${typeIdx}-${copy}-${Math.random().toString(36).substring(2, 7)}`,
        type: def.type,
        image: `/assets/cards/${def.type}.png`,
        label: def.label,
        isFlipped: false,
        isMatched: false,
      });
    }
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function useMemoriceGame() {
  const [screen, setScreen] = useState<GameScreen>('HOME');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [settings, setSettings] = useState<GameSettings>({
    timerSeconds: 60,
    soundEnabled: true,
    winAutoResetSeconds: 7,
    instructionsSeconds: 5,
    gameOverAutoResetSeconds: 5,
    showTimerHud: true,
  });

  // Keep soundManager enabled state in sync
  useEffect(() => {
    soundManager.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  const autoResetTimeoutRef = useRef<number | null>(null);

  const clearAutoResetTimeout = useCallback(() => {
    if (autoResetTimeoutRef.current) {
      clearTimeout(autoResetTimeoutRef.current);
      autoResetTimeoutRef.current = null;
    }
  }, []);

  // Launch golden confetti celebration on WIN
  const fireVictoryConfetti = useCallback(() => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#E5B25D', '#00A3E0', '#FFFFFF', '#F3D88C'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Transition from HOME to INSTRUCTIONS view
  const goToInstructions = useCallback(() => {
    clearAutoResetTimeout();
    soundManager.playClick();
    setScreen('INSTRUCTIONS');
  }, [clearAutoResetTimeout]);

  // Start actual board game
  const startGame = useCallback(() => {
    clearAutoResetTimeout();
    soundManager.playClick();
    const newDeck = generateShuffledDeck();
    setCards(newDeck);
    setSelectedCards([]);
    setIsLocked(false);
    setMatchedPairs(0);
    setTimeRemaining(settings.timerSeconds);
    setIsTimerRunning(true);
    setScreen('PLAYING');
  }, [clearAutoResetTimeout, settings.timerSeconds]);

  // Return to home screen
  const goToHome = useCallback(() => {
    clearAutoResetTimeout();
    setIsTimerRunning(false);
    setScreen('HOME');
  }, [clearAutoResetTimeout]);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerRunning || screen !== 'PLAYING') return;

    if (timeRemaining <= 0) {
      setIsTimerRunning(false);
      soundManager.playGameOver();
      setScreen('GAMEOVER');
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          soundManager.playGameOver();
          setScreen('GAMEOVER');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, screen, timeRemaining]);

  // Card click handler
  const handleCardClick = useCallback(
    (card: CardItem) => {
      if (isLocked) return;
      if (card.isFlipped || card.isMatched) return;

      soundManager.playFlip();

      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      setCards(updatedCards);

      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);

      if (newSelected.length === 2) {
        setIsLocked(true);
        const [cardA, cardB] = newSelected;

        if (cardA.type === cardB.type) {
          setTimeout(() => {
            soundManager.playMatch();
            setCards((prev) =>
              prev.map((c) =>
                c.id === cardA.id || c.id === cardB.id
                  ? { ...c, isMatched: true }
                  : c
              )
            );
            setSelectedCards([]);
            setIsLocked(false);

            setMatchedPairs((prevCount) => {
              const newCount = prevCount + 1;
              if (newCount === 8) {
                setIsTimerRunning(false);
                setTimeout(() => {
                  soundManager.playWin();
                  fireVictoryConfetti();
                  setScreen('WIN');

                  if (settings.winAutoResetSeconds > 0) {
                    autoResetTimeoutRef.current = window.setTimeout(() => {
                      setScreen('HOME');
                    }, settings.winAutoResetSeconds * 1000);
                  }
                }, 500);
              }
              return newCount;
            });
          }, 350);
        } else {
          setTimeout(() => {
            soundManager.playMismatch();
            setCards((prev) =>
              prev.map((c) =>
                c.id === cardA.id || c.id === cardB.id
                  ? { ...c, isFlipped: false }
                  : c
              )
            );
            setSelectedCards([]);
            setIsLocked(false);
          }, 850);
        }
      }
    },
    [cards, selectedCards, isLocked, fireVictoryConfetti, settings.winAutoResetSeconds]
  );

  return {
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
  };
}
