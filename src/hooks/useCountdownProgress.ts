import { useState, useEffect, useRef } from 'react';

/**
 * High-precision 60fps frame-synced countdown timer and progress calculation.
 * Ensures the progress bar reaches exactly 100% simultaneously with 0s remaining.
 */
export function useCountdownProgress(totalSeconds: number, onComplete: () => void) {
  const totalMs = totalSeconds * 1000;
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (totalSeconds <= 0) {
      onCompleteRef.current();
      return;
    }

    setProgress(0);
    setSecondsLeft(totalSeconds);

    let animId: number;
    let startTime: number | null = null;

    const frame = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }

      const elapsed = now - startTime;
      const currentProgress = Math.min(100, (elapsed / totalMs) * 100);
      const remaining = Math.max(0, Math.ceil((totalMs - elapsed) / 1000));

      setProgress(currentProgress);
      setSecondsLeft(remaining);

      if (elapsed >= totalMs) {
        setProgress(100);
        setSecondsLeft(0);
        onCompleteRef.current();
      } else {
        animId = requestAnimationFrame(frame);
      }
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [totalSeconds, totalMs]);

  return { progress, secondsLeft };
}
