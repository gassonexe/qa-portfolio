export interface OrderRequest {
  segment: string;
  gRecaptchaResponse: string;
  selectedProducts: OrderProduct[];
  lang: string;
}

export interface OrderProduct {
  id: number;
  productLine: string;
  purchaseType: string;
  contractDuration: number;
  tariffPackageId: number;
  colorId: number;
  installments: number;
  recycle: boolean;
  insurance: unknown;
}

export interface PdpSelection {
  tariff: string;
  installments: number;
}

export interface MonthlyBreakdown {
  device: number;
  tariff: number;
  total: number;
}
