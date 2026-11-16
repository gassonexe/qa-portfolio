import { CatalogFilterData, SortOption } from '@app-types/catalog.types';

export const catalogFilters: CatalogFilterData = {
  brand: 'Samsung',
  ram: '> 8 GB',
  // Must not be the default plan (Yettel Mobile XL), otherwise selecting it changes nothing.
  plan: 'Yettel Mobile M',
};

export const sortLowestPrice: SortOption = 'Od najniže cene';
