import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCategory, setSort, toggleSortDirection } from '@/store/slices/tokenTableSlice';
import { useTokens } from '@/hooks/useTokens';
import { TokenTableHeader } from './TokenTableHeader';
import { TokenRow } from './TokenRow';
import { CategoryTabs } from './CategoryTabs';
import { TokenTableSkeleton } from './TokenTableSkeleton';
import { SortField, TokenCategory } from '@/types/token';

export const TokenTable = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory, sortField, sortDirection } = useAppSelector(
    (state) => state.tokenTable
  );

  const { tokens, isLoading, error } = useTokens(selectedCategory);

  const sortedTokens = useMemo(() => {
    if (!tokens) return [];

    return [...tokens].sort((a, b) => {
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
  }, [tokens, sortField, sortDirection]);

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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading tokens. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

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
            {sortedTokens.map((token) => (
              <TokenRow key={token.id} token={token} />
            ))}
          </div>

          {sortedTokens.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No tokens found.
            </div>
          )}
        </>
      )}
    </div>
  );
};
