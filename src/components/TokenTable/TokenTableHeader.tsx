import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortField, SortDirection } from '@/types/token';
import { cn } from '@/lib/utils';

interface TokenTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

interface HeaderCellProps {
  field: SortField;
  label: string;
  className?: string;
  isActive: boolean;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

const HeaderCell = ({ field, label, className, isActive, direction, onSort }: HeaderCellProps) => {
  const Icon = isActive ? (direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        'flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
        isActive && 'text-primary',
        className
      )}
    >
      {label}
      <Icon className="h-4 w-4" />
    </button>
  );
};

export const TokenTableHeader = ({ sortField, sortDirection, onSort }: TokenTableHeaderProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] md:grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 bg-muted/50 rounded-lg mb-3">
      <div className="col-span-2 md:col-span-1">
        <span className="text-sm font-medium text-muted-foreground">Token</span>
      </div>

      <HeaderCell
        field="price"
        label="Price"
        className="justify-end"
        isActive={sortField === 'price'}
        direction={sortDirection}
        onSort={onSort}
      />

      <HeaderCell
        field="priceChange24h"
        label="24h %"
        className="justify-end"
        isActive={sortField === 'priceChange24h'}
        direction={sortDirection}
        onSort={onSort}
      />

      <HeaderCell
        field="volume24h"
        label="Volume"
        className="justify-end hidden md:flex"
        isActive={sortField === 'volume24h'}
        direction={sortDirection}
        onSort={onSort}
      />

      <HeaderCell
        field="marketCap"
        label="Market Cap"
        className="justify-end hidden md:flex"
        isActive={sortField === 'marketCap'}
        direction={sortDirection}
        onSort={onSort}
      />

      <HeaderCell
        field="liquidity"
        label="Liquidity"
        className="justify-end"
        isActive={sortField === 'liquidity'}
        direction={sortDirection}
        onSort={onSort}
      />
    </div>
  );
};
