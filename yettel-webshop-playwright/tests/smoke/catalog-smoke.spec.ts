import { test, expect } from '@fixtures/pom.fixture';

test.describe('Catalog smoke', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.openPhonesCatalog();
  });

  test('phones catalog lists devices', async ({ catalogPage }) => {
    await expect.poll(() => catalogPage.getResultsCount()).toBeGreaterThan(0);
    await expect(catalogPage.productCards.first()).toBeVisible();
  });

  test('product card shows a model name and a monthly price', async ({ catalogPage }) => {
    const firstCard = catalogPage.productCards.first();

    await expect(catalogPage.cardModelName(firstCard)).toHaveText(/\S+/);
    await expect(catalogPage.cardMonthlyPrice(firstCard)).toHaveText(
      /^\d{1,3}(\.\d{3})*\s*RSD\s*\/mesečno$/,
    );
  });
});
