import { useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCategory, setSort, toggleSortDirection, setSelectedToken } from '@/store/slices/tokenTableSlice';
import { useTokens } from '@/hooks/useTokens';
import { useDebounce } from '@/hooks/useDebounce';
import { TokenTableHeader } from './TokenTableHeader';
import { TokenRow } from './TokenRow';
import { CategoryTabs } from './CategoryTabs';
import { TokenTableSkeleton } from './TokenTableSkeleton';
import { SearchBar } from './SearchBar';
import { AdvancedFilters } from './AdvancedFilters';
import { TokenDetailModal } from './TokenDetailModal';
import { SortField, TokenCategory } from '@/types/token';

export const TokenTable = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory, sortField, sortDirection, searchQuery, filters, selectedTokenId } = useAppSelector(
    (state) => state.tokenTable
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { tokens, isLoading, error } = useTokens(selectedCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedToken = useMemo(() => {
    return tokens.find(t => t.id === selectedTokenId) || null;
  }, [tokens, selectedTokenId]);

  const filteredAndSortedTokens = useMemo(() => {
    if (!tokens) return [];

    // Filter by search query
    let filtered = tokens;
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query)
      );
    }

    // Apply advanced filters
    filtered = filtered.filter((token) => {
      return (
        token.price >= filters.minPrice &&
        token.price <= filters.maxPrice &&
        token.volume24h >= filters.minVolume &&
        token.volume24h <= filters.maxVolume &&
        token.marketCap >= filters.minMarketCap &&
        token.marketCap <= filters.maxMarketCap &&
        token.liquidity >= filters.minLiquidity &&
        token.liquidity <= filters.maxLiquidity
      );
    });

    // Sort
    return [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [tokens, sortField, sortDirection, debouncedSearchQuery, filters]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      dispatch(toggleSortDirection());
    } else {
      dispatch(setSort({ field, direction: 'desc' }));
    }
  };

  const handleCategoryChange = (category: TokenCategory) => {
    dispatch(setCategory(category));
  };

  const handleTokenClick = (tokenId: string) => {
    dispatch(setSelectedToken(tokenId));
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      dispatch(setSelectedToken(null));
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading tokens. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <SearchBar />
          <AdvancedFilters />
        </div>
      </div>

      {isLoading ? (
        <TokenTableSkeleton />
      ) : (
        <>
          <TokenTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <div className="space-y-2">
            {filteredAndSortedTokens.map((token) => (
              <TokenRow 
                key={token.id} 
                token={token}
                onClick={() => handleTokenClick(token.id)}
              />
            ))}
          </div>

          {filteredAndSortedTokens.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No tokens found matching your criteria.
            </div>
          )}
        </>
      )}

      <TokenDetailModal
        token={selectedToken}
        open={isModalOpen}
        onOpenChange={handleModalClose}
      />
    </div>
  );
};
