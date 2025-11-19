import { memo } from 'react';
import { Token } from '@/types/token';
import { formatPrice, formatPercentage, formatVolume, formatMarketCap, formatNumber } from '@/lib/utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenRowProps {
  token: Token;
  onClick?: () => void;
}

export const TokenRow = memo(({ token, onClick }: TokenRowProps) => {
  const isPositiveChange = token.priceChange24h >= 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        'grid grid-cols-[auto_1fr_auto_auto_auto_auto] md:grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer',
        token.priceFlash === 'up' && 'animate-price-flash-up',
        token.priceFlash === 'down' && 'animate-price-flash-down'
      )}
    >
      {/* Token Info */}
      <div className="flex items-center gap-3 col-span-2 md:col-span-1">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          {token.symbol.slice(0, 2)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-foreground truncate">{token.name}</div>
          <div className="text-sm text-muted-foreground">{token.symbol}</div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="font-mono text-foreground font-medium">{formatPrice(token.price)}</div>
      </div>

      {/* 24h Change */}
      <div className="text-right">
        <div className={cn(
          'flex items-center justify-end gap-1 font-medium',
          isPositiveChange ? 'text-success' : 'text-destructive'
        )}>
          {isPositiveChange ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{formatPercentage(token.priceChange24h)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="text-right hidden md:block">
        <div className="font-mono text-muted-foreground">{formatVolume(token.volume24h)}</div>
      </div>

      {/* Market Cap */}
      <div className="text-right hidden md:block">
        <div className="font-mono text-muted-foreground">{formatMarketCap(token.marketCap)}</div>
      </div>

      {/* Liquidity */}
      <div className="text-right">
        <div className="font-mono text-muted-foreground">{formatVolume(token.liquidity)}</div>
      </div>
    </div>
  );
});

TokenRow.displayName = 'TokenRow';
