import { CatalogFilterData, CatalogProductData, SortOption } from '@app-types/catalog.types';

export const catalogFilters: CatalogFilterData = {
  brand: 'Samsung',
  ram: '> 8 GB',
  plan: 'Yettel Mobile XL',
};

export const knownProduct: CatalogProductData = {
  name: 'Galaxy Z Fold7 256GB',
  monthlyPrice: '5.976RSD/mesečno',
};

export const sortLowestPrice: SortOption = 'Od najniže cene';