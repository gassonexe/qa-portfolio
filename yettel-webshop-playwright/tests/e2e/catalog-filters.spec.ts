import { test, expect } from '@fixtures/pom.fixture';
import { catalogFilters, sortLowestPrice } from '@data/catalog.data';

test.describe('Catalog filters', () => {
  let initialCount: number;

  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.openPhonesCatalog();
    initialCount = await catalogPage.getResultsCount();
  });

  test('brand filter shows chip and narrows results', async ({ catalogPage }) => {
    await catalogPage.filterByBrand(catalogFilters.brand);
    await expect(catalogPage.activeFilterChip(catalogFilters.brand)).toBeVisible();
    await expect.poll(() => catalogPage.getResultsCount()).toBeLessThan(initialCount);
  });

  test('RAM filter shows chip and narrows results', async ({ catalogPage }) => {
    await catalogPage.filterByRam(catalogFilters.ram);
    await expect(catalogPage.activeFilterChip(catalogFilters.ram)).toBeVisible();
    await expect.poll(() => catalogPage.getResultsCount()).toBeLessThan(initialCount);
  });

  test('plan filter updates device prices to the selected plan', async ({ catalogPage }) => {
    await catalogPage.filterByPlan(catalogFilters.plan);
    await expect(catalogPage.planPriceLabel(catalogFilters.plan)).toBeVisible();
  });

  test('combined brand + RAM filters narrow further than brand alone', async ({ catalogPage }) => {
    await catalogPage.filterByBrand(catalogFilters.brand);
    await expect(catalogPage.activeFilterChip(catalogFilters.brand)).toBeVisible();
    const brandOnly = await catalogPage.getResultsCount();

    await catalogPage.filterByRam(catalogFilters.ram);
    await expect(catalogPage.activeFilterChip(catalogFilters.ram)).toBeVisible();
    await expect.poll(() => catalogPage.getResultsCount()).toBeLessThanOrEqual(brandOnly);
  });

  test('removing all active filters restores full results', async ({ catalogPage }) => {
    await catalogPage.filterByBrand(catalogFilters.brand);
    await catalogPage.filterByRam(catalogFilters.ram);
    await expect(catalogPage.activeFilterChip(catalogFilters.ram)).toBeVisible();

    await catalogPage.clearAllFilters();

    await expect.poll(() => catalogPage.getResultsCount()).toBe(initialCount);
  });

  test('sort by lowest price selects the option', async ({ catalogPage }) => {
    await catalogPage.sortBy(sortLowestPrice);
    await expect(catalogPage.sortRadio(sortLowestPrice)).toBeChecked();
  });
});