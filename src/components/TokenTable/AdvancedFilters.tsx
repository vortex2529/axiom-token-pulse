import { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters, resetFilters } from '@/store/slices/tokenTableSlice';
import { Separator } from '@/components/ui/separator';

export const AdvancedFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tokenTable.filters);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const handleResetFilters = () => {
    const resetValues = {
      minPrice: 0,
      maxPrice: Infinity,
      minVolume: 0,
      maxVolume: Infinity,
      minMarketCap: 0,
      maxMarketCap: Infinity,
      minLiquidity: 0,
      maxLiquidity: Infinity,
    };
    setLocalFilters(resetValues);
    dispatch(resetFilters());
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value === '' ? (field.startsWith('min') ? 0 : Infinity) : parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setLocalFilters((prev) => ({ ...prev, [field]: numValue }));
    }
  };

  const hasActiveFilters = 
    filters.minPrice > 0 || 
    filters.maxPrice !== Infinity || 
    filters.minVolume > 0 || 
    filters.maxVolume !== Infinity ||
    filters.minMarketCap > 0 ||
    filters.maxMarketCap !== Infinity ||
    filters.minLiquidity > 0 ||
    filters.maxLiquidity !== Infinity;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Sliders className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-popover border-border" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Advanced Filters</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 px-2 text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>

          <Separator />

          {/* Price Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Min</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localFilters.minPrice === 0 ? '' : localFilters.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Max</Label>
                <Input
                  type="number"
                  placeholder="∞"
                  value={localFilters.maxPrice === Infinity ? '' : localFilters.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Volume Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">24h Volume</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Min</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localFilters.minVolume === 0 ? '' : localFilters.minVolume}
                  onChange={(e) => handleInputChange('minVolume', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Max</Label>
                <Input
                  type="number"
                  placeholder="∞"
                  value={localFilters.maxVolume === Infinity ? '' : localFilters.maxVolume}
                  onChange={(e) => handleInputChange('maxVolume', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Market Cap Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Market Cap</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Min</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localFilters.minMarketCap === 0 ? '' : localFilters.minMarketCap}
                  onChange={(e) => handleInputChange('minMarketCap', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Max</Label>
                <Input
                  type="number"
                  placeholder="∞"
                  value={localFilters.maxMarketCap === Infinity ? '' : localFilters.maxMarketCap}
                  onChange={(e) => handleInputChange('maxMarketCap', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Liquidity Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Liquidity</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Min</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localFilters.minLiquidity === 0 ? '' : localFilters.minLiquidity}
                  onChange={(e) => handleInputChange('minLiquidity', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Max</Label>
                <Input
                  type="number"
                  placeholder="∞"
                  value={localFilters.maxLiquidity === Infinity ? '' : localFilters.maxLiquidity}
                  onChange={(e) => handleInputChange('maxLiquidity', e.target.value)}
                  className="h-8 text-sm"
                  min="0"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
