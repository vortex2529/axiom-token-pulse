import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/tokenTableSlice';
import { validateSearchQuery } from '@/lib/validation/tokenFilters';
import { useState } from 'react';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tokenTable.searchQuery);
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (value: string) => {
    if (validateSearchQuery(value)) {
      dispatch(setSearchQuery(value));
      setError(null);
    } else {
      setError('Search query is too long');
    }
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
    setError(null);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tokens by name or symbol..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-10 pr-10 bg-card border-border focus:border-primary"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};
