export interface CatalogFilterData {
  brand: string;
  ram: string;
  plan: string;
}

export const SORT_ORDER_BY = {
  'Od najniže cene': 'price-asc',
  'Od najviše cene': 'price-desc',
  'Nazivu brenda A-Z': 'brand-asc',
  'Nazivu brenda Z-A': 'brand-desc',
} as const;

export type SortOption = keyof typeof SORT_ORDER_BY;

export interface CatalogApiResponse {
  status: number;
  message: string;
  metadata: { duration: string; traceId: string };
  data: CatalogApiData;
}

export interface CatalogApiData {
  pageData: {
    filters: CatalogApiFilter[];
    ebillDiscount: number;
    greenVoucherDiscount: number;
  };
  products: CatalogProduct[];
}

export interface CatalogApiFilter {
  type: string;
  value: unknown;
}

export interface CatalogProduct {
  id: number;
  model: string;
  status: number;
  order: number;
  manufacturer: { id: number; name: string };
  productPrices: { subsidy?: { installments: number; price: string } };
  assignedTariffPackage: TariffPackage;
  tariffPackages: TariffPackage[];
  sellCosmos: boolean;
}

export interface TariffPackage {
  id: number;
  name: string;
  prices: {
    cosmos: InstallmentPrice[];
    subsidy: InstallmentPrice[];
  };
}

export interface InstallmentPrice {
  price: string;
  priceOld: string;
  installments: number;
  contractDuration: number;
}
