import { TokenCategory } from '@/types/token';
import { cn } from '@/lib/utils';
import { Sparkles, Target, CheckCircle2 } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: TokenCategory;
  onCategoryChange: (category: TokenCategory) => void;
}

const categories: { value: TokenCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'new-pairs', label: 'New Pairs', icon: <Sparkles className="h-4 w-4" /> },
  { value: 'final-stretch', label: 'Final Stretch', icon: <Target className="h-4 w-4" /> },
  { value: 'migrated', label: 'Migrated', icon: <CheckCircle2 className="h-4 w-4" /> },
];

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex gap-2 p-1 bg-muted/50 rounded-lg w-fit">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
            selectedCategory === category.value
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          {category.icon}
          <span className="hidden sm:inline">{category.label}</span>
        </button>
      ))}
    </div>
  );
};
