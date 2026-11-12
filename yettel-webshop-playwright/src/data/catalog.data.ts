import { CatalogFilterData, SortOption } from '@app-types/catalog.types';

export const catalogFilters: CatalogFilterData = {
  brand: 'Samsung',
  ram: '> 8 GB',
  // Not the default plan (Yettel Mobile XL), so selecting it must visibly change the prices.
  plan: 'Yettel Mobile M',
};

export const sortLowestPrice: SortOption = 'Od najniže cene';
