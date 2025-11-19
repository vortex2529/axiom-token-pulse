export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  category: TokenCategory;
  createdAt: string;
  holders: number;
  priceFlash?: 'up' | 'down' | null;
}

export interface TokensResponse {
  tokens: Token[];
  total: number;
}

export type SortField = 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'createdAt';
export type SortDirection = 'asc' | 'desc';
