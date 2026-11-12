import { test, expect } from '@fixtures/pom.fixture';
import { catalogFilters, sortLowestPrice } from '@data/catalog.data';
import { SORT_ORDER_BY } from '@app-types/catalog.types';

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

  test('plan filter updates every device price to the selected plan', async ({ catalogPage }) => {
    await catalogPage.filterByPlan(catalogFilters.plan);

    const labels = catalogPage.cardPlanLabels();
    await expect(labels.first()).toBeVisible();
    await expect
      .poll(async () => {
        const texts = await labels.allInnerTexts();
        return texts.every((t) => t.replace(/\s+/g, ' ').trim().endsWith(`uz ${catalogFilters.plan}`));
      })
      .toBe(true);
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
    await expect(catalogPage.activeFilterChip(catalogFilters.brand)).toBeVisible();
    await catalogPage.filterByRam(catalogFilters.ram);
    await expect(catalogPage.activeFilterChip(catalogFilters.ram)).toBeVisible();

    await catalogPage.clearAllFilters();

    await expect.poll(() => catalogPage.getResultsCount()).toBe(initialCount);
  });

  test('sort by lowest price orders devices by ascending monthly price', async ({ catalogPage, page }) => {
    await catalogPage.sortBy(sortLowestPrice);

    await expect(page).toHaveURL(new RegExp(`orderBy=${SORT_ORDER_BY[sortLowestPrice]}`));
    await expect(catalogPage.sortRadio(sortLowestPrice)).toBeChecked();
    await expect
      .poll(async () => {
        const prices = await catalogPage.getMonthlyPrices();
        return prices.length > 1 && prices.every((p, i) => i === 0 || prices[i - 1] <= p);
      })
      .toBe(true);
  });
});
