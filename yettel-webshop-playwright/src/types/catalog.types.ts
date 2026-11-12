export interface CatalogFilterData {
  brand: string;
  ram: string;
  plan: string;
}

/** Visible label of each sort option, mapped to the `orderBy` query value the site sets. */
export const SORT_ORDER_BY = {
  'Od najniže cene': 'price-asc',
  'Od najviše cene': 'price-desc',
  'Nazivu brenda A-Z': 'brand-asc',
  'Nazivu brenda Z-A': 'brand-desc',
} as const;

export type SortOption = keyof typeof SORT_ORDER_BY;
