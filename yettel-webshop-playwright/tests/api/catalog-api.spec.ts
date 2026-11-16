import { test, expect } from '@fixtures/pom.fixture';
import { assertCatalogResponse, catalogApi, cosmosRate, isCatalogApiUrl, RSD_PRICE } from '@api/catalog.api';
import { catalogFilters } from '@data/catalog.data';

test.describe('Catalog API', () => {
  test('catalog API returns a valid product payload with prices', async ({ request }) => {
    const response = await request.get(catalogApi.path, { params: catalogApi.query });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body: unknown = await response.json();
    assertCatalogResponse(body);

    const brandProducts = body.data.products.filter((p) => p.manufacturer.name === catalogFilters.brand);
    expect(brandProducts.length, `${catalogFilters.brand} products in API`).toBeGreaterThan(0);

    for (const p of brandProducts) {
      const rate = cosmosRate(p);
      expect.soft(rate, `${p.model}: ${catalogApi.installments}-installment cosmos price`).toBeDefined();
      if (!rate) continue;
      expect.soft(rate.price, `${p.model}: price is an RSD amount`).toMatch(RSD_PRICE);
      expect.soft(Number(rate.price), `${p.model}: price > 0`).toBeGreaterThan(0);
    }
  });

  test('API product count matches rendered product cards', async ({ catalogPage }) => {
    const responsePromise = catalogPage.waitForCatalogResponse();
    await catalogPage.openPhonesCatalog();
    const body: unknown = await (await responsePromise).json();
    assertCatalogResponse(body);

    const all = body.data.products;
    await expect(catalogPage.productCards).toHaveCount(all.length);
    await expect.poll(() => catalogPage.getResultsCount()).toBe(all.length);

    await catalogPage.filterByBrand(catalogFilters.brand);
    await expect(catalogPage.activeFilterChip(catalogFilters.brand)).toBeVisible();

    const brandModels = all
      .filter((p) => p.manufacturer.name === catalogFilters.brand)
      .map((p) => p.model.trim());

    await expect(catalogPage.productCards).toHaveCount(brandModels.length);
    expect((await catalogPage.getVisibleModelNames()).sort()).toEqual([...brandModels].sort());
  });

  test('known issue BUG-001: catalog API 500 is shown as an empty result list', async ({ page, catalogPage }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'BUG-001 (see README): API 500 renders "0 uređaja" + empty state instead of a service error.',
    });

    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => pageErrors.push(err));

    await page.route(isCatalogApiUrl, (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ status: 500, message: 'Internal Server Error' }),
      }),
    );

    const responsePromise = catalogPage.waitForCatalogResponse();
    await catalogPage.navigateToPhonesCatalog();
    expect((await responsePromise).status()).toBe(500);

    await expect(catalogPage.emptyStateMessage).toBeVisible();
    await expect.poll(() => catalogPage.getResultsCount()).toBe(0);
    await expect(catalogPage.productCards).toHaveCount(0);
    await expect(catalogPage.phonesCategoryLink).toBeVisible();
    expect(pageErrors.map((e) => e.message)).toEqual([]);
  });
});
