import { expect } from '@playwright/test';
import { CatalogApiResponse, CatalogProduct, InstallmentPrice } from '@app-types/catalog.types';

export const catalogApi = {
  path: '/bff/pages/products',
  query: { section: 'consumer', type: 'phone', lang: 'sr' },
  installments: 36,
} as const;

export const RSD_PRICE = /^\d+\.\d{2}$/;

export function isCatalogApiUrl(url: URL): boolean {
  return url.pathname === catalogApi.path && url.searchParams.get('type') === catalogApi.query.type;
}

export function assertCatalogResponse(body: unknown): asserts body is CatalogApiResponse {
  const res = body as CatalogApiResponse;
  expect(res.status, 'body.status').toBe(200);
  expect(Array.isArray(res.data?.products), 'data.products is an array').toBe(true);
  expect(res.data.products.length, 'product list is not empty').toBeGreaterThan(0);
  expect(Array.isArray(res.data.pageData?.filters), 'data.pageData.filters is an array').toBe(true);

  for (const p of res.data.products) {
    expect(p.id, 'product.id').toEqual(expect.any(Number));
    expect(p.model?.trim(), `model of product ${p.id}`).toBeTruthy();
    expect(p.manufacturer?.name?.trim(), `manufacturer of product ${p.id}`).toBeTruthy();
    expect(Array.isArray(p.tariffPackages), `tariffPackages of product ${p.id}`).toBe(true);
  }
}

export function cosmosRate(product: CatalogProduct): InstallmentPrice | undefined {
  return product.assignedTariffPackage?.prices?.cosmos?.find(
    (c) => c.installments === catalogApi.installments,
  );
}
