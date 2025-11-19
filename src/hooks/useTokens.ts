import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Token, TokenCategory } from '@/types/token';
import { generateMockTokens } from '@/lib/mockData';
import { useState, useCallback } from 'react';
import { useTokenWebSocket } from './useTokenWebSocket';

export const useTokens = (category: TokenCategory) => {
  const queryClient = useQueryClient();
  const [liveTokens, setLiveTokens] = useState<Token[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens', category],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return generateMockTokens(category);
    },
    staleTime: 30000,
  });

  // Update live tokens when data changes
  const handleUpdate = useCallback((updatedTokens: Token[]) => {
    setLiveTokens(updatedTokens);
  }, []);

  // Initialize live tokens with fetched data
  useState(() => {
    if (data) {
      setLiveTokens(data);
    }
  });

  // Set up WebSocket simulation
  useTokenWebSocket(data || [], handleUpdate);

  return {
    tokens: liveTokens.length > 0 ? liveTokens : data || [],
    isLoading,
    error,
  };
};
