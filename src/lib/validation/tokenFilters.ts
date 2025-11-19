import { z } from 'zod';

export const searchQuerySchema = z.string()
  .trim()
  .max(100, { message: "Search query must be less than 100 characters" });

export const filterValueSchema = z.number()
  .min(0, { message: "Value must be non-negative" })
  .max(1e15, { message: "Value is too large" });

export const tokenFiltersSchema = z.object({
  minPrice: filterValueSchema.optional(),
  maxPrice: filterValueSchema.optional(),
  minVolume: filterValueSchema.optional(),
  maxVolume: filterValueSchema.optional(),
  minMarketCap: filterValueSchema.optional(),
  maxMarketCap: filterValueSchema.optional(),
  minLiquidity: filterValueSchema.optional(),
  maxLiquidity: filterValueSchema.optional(),
}).refine(
  (data) => {
    if (data.minPrice !== undefined && data.maxPrice !== undefined) {
      return data.minPrice <= data.maxPrice;
    }
    return true;
  },
  { message: "Min price must be less than or equal to max price" }
).refine(
  (data) => {
    if (data.minVolume !== undefined && data.maxVolume !== undefined) {
      return data.minVolume <= data.maxVolume;
    }
    return true;
  },
  { message: "Min volume must be less than or equal to max volume" }
);

export const validateSearchQuery = (query: string): boolean => {
  try {
    searchQuerySchema.parse(query);
    return true;
  } catch {
    return false;
  }
};
