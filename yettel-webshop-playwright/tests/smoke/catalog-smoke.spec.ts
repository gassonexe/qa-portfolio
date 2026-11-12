import { test, expect } from '@fixtures/pom.fixture';
import { knownProduct } from '@data/catalog.data';

test.describe('Catalog smoke', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.openPhonesCatalog();
  });

  test('phones catalog lists devices', async ({ catalogPage }) => {
    await expect.poll(() => catalogPage.getResultsCount()).toBeGreaterThan(0);
  });

  test('known product card and monthly price are visible', async ({ catalogPage }) => {
    await expect(catalogPage.productCard(knownProduct.name)).toBeVisible();
    await expect(catalogPage.productMonthlyPrice(knownProduct.monthlyPrice)).toBeVisible();
  });
});