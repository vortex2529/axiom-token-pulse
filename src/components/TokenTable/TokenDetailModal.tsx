import { Token } from '@/types/token';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPrice, formatPercentage, formatVolume, formatMarketCap, formatNumber } from '@/lib/utils/formatters';
import { TrendingUp, TrendingDown, Users, Droplet, DollarSign, BarChart3, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TokenDetailModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenDetailModal = ({ token, open, onOpenChange }: TokenDetailModalProps) => {
  if (!token) return null;

  const isPositiveChange = token.priceChange24h >= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
              {token.symbol.slice(0, 2)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl text-foreground">{token.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-muted-foreground">{token.symbol}</span>
                <Badge variant="outline" className="capitalize">
                  {token.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Price Section */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-foreground">
                {formatPrice(token.price)}
              </span>
              <div className={cn(
                'flex items-center gap-1 text-lg font-medium',
                isPositiveChange ? 'text-success' : 'text-destructive'
              )}>
                {isPositiveChange ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <TrendingDown className="h-5 w-5" />
                )}
                <span>{formatPercentage(token.priceChange24h)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">24h Change</p>
          </div>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">24h Volume</span>
              </div>
              <p className="text-xl font-semibold font-mono">{formatVolume(token.volume24h)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Market Cap</span>
              </div>
              <p className="text-xl font-semibold font-mono">{formatMarketCap(token.marketCap)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplet className="h-4 w-4" />
                <span className="text-sm">Liquidity</span>
              </div>
              <p className="text-xl font-semibold font-mono">{formatVolume(token.liquidity)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Holders</span>
              </div>
              <p className="text-xl font-semibold font-mono">{formatNumber(token.holders)}</p>
            </div>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Additional Information
            </h4>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">
                  {new Date(token.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Token ID</span>
                <span className="font-mono text-xs">{token.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium capitalize">{token.category.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Price Chart Placeholder */}
          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">Price chart coming soon</p>
            <p className="text-xs text-muted-foreground mt-1">
              Historical price data and trends will be displayed here
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
