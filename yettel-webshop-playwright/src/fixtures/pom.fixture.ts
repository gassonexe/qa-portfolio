import { test as base, expect } from '@playwright/test';
import { CatalogPage } from '@pages/CatalogPage';
import { ProductDetailPage } from '@pages/ProductDetailPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { blockOrderWrites } from '@api/checkout.api';

type PomFixtures = {
  catalogPage: CatalogPage;
  productDetailPage: ProductDetailPage;
  checkoutPage: CheckoutPage;
  orderGuard: string[];
};

export const test = base.extend<PomFixtures>({
  orderGuard: [
    async ({ page }, use) => {
      await use(await blockOrderWrites(page));
    },
    { auto: true },
  ],
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect };
