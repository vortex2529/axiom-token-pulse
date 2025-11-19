import { useEffect, useRef } from 'react';
import { Token } from '@/types/token';
import { updateTokenPrice } from '@/lib/mockData';

export const useTokenWebSocket = (
  tokens: Token[],
  onUpdate: (updatedTokens: Token[]) => void
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate WebSocket updates every 3-5 seconds
    intervalRef.current = setInterval(() => {
      if (tokens.length === 0) return;

      // Update 2-3 random tokens
      const numUpdates = Math.floor(Math.random() * 2) + 2;
      const updatedTokens = [...tokens];

      for (let i = 0; i < numUpdates; i++) {
        const randomIndex = Math.floor(Math.random() * tokens.length);
        updatedTokens[randomIndex] = updateTokenPrice(updatedTokens[randomIndex]);
      }

      onUpdate(updatedTokens);

      // Clear flash effect after animation
      setTimeout(() => {
        const clearedTokens = updatedTokens.map(t => ({ ...t, priceFlash: null }));
        onUpdate(clearedTokens);
      }, 600);
    }, 3000 + Math.random() * 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, onUpdate]);
};
