import { Token, TokenCategory } from '@/types/token';

const tokenNames = [
  { name: 'Stellar Pulse', symbol: 'STLR' },
  { name: 'Quantum Leap', symbol: 'QLEP' },
  { name: 'Nebula Finance', symbol: 'NEBU' },
  { name: 'Cosmic Protocol', symbol: 'COSM' },
  { name: 'Orbit Token', symbol: 'ORBT' },
  { name: 'Galaxy Chain', symbol: 'GLXY' },
  { name: 'Meteor Network', symbol: 'MTOR' },
  { name: 'Supernova', symbol: 'NOVA' },
  { name: 'Asteroid DAO', symbol: 'ASTD' },
  { name: 'Solar Flare', symbol: 'SLFR' },
  { name: 'Lunar Phase', symbol: 'LUNR' },
  { name: 'Star Forge', symbol: 'STFG' },
  { name: 'Comet Trail', symbol: 'COMT' },
  { name: 'Eclipse Protocol', symbol: 'ECLI' },
  { name: 'Constellation', symbol: 'CNST' },
];

const getRandomPrice = () => Math.random() * 1000;
const getRandomChange = () => (Math.random() - 0.5) * 40;
const getRandomVolume = () => Math.random() * 10000000;
const getRandomMarketCap = () => Math.random() * 100000000;
const getRandomLiquidity = () => Math.random() * 5000000;
const getRandomHolders = () => Math.floor(Math.random() * 50000);

export const generateMockTokens = (category: TokenCategory, count: number = 15): Token[] => {
  return Array.from({ length: count }, (_, i) => {
    const tokenData = tokenNames[i % tokenNames.length];
    return {
      id: `${category}-${i}`,
      name: tokenData.name,
      symbol: tokenData.symbol,
      price: getRandomPrice(),
      priceChange24h: getRandomChange(),
      volume24h: getRandomVolume(),
      marketCap: getRandomMarketCap(),
      liquidity: getRandomLiquidity(),
      category,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      holders: getRandomHolders(),
      priceFlash: null,
    };
  });
};

export const updateTokenPrice = (token: Token): Token => {
  const priceChange = (Math.random() - 0.5) * token.price * 0.02; // ±2% change
  const newPrice = Math.max(0.01, token.price + priceChange);
  const priceFlash = priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : null;
  
  return {
    ...token,
    price: newPrice,
    priceChange24h: token.priceChange24h + (priceChange / token.price) * 100,
    priceFlash: priceFlash as 'up' | 'down' | null,
  };
};
