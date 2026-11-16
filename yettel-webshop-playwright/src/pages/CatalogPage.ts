import { expect, Locator, Page, Response } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { SortOption } from '@app-types/catalog.types';
import { isCatalogApiUrl } from '@api/catalog.api';

export class CatalogPage extends BasePage {
  private readonly resultsCountText: Locator;
  private readonly filtersPanel: Locator;
  private readonly activeFilterChips: Locator;
  private readonly planCombobox: Locator;
  private readonly sortButton: Locator;

  readonly productCards: Locator;
  readonly phonesCategoryLink: Locator;
  readonly emptyStateMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.phonesCategoryLink = page
      .locator('[data-test-category-selector]')
      .getByRole('link', { name: 'Telefoni' });
    // Anchored: the empty-state <article> also contains "uređaja".
    this.resultsCountText = page.getByRole('article').getByText(/^\d+ uređaja$/);
    this.filtersPanel = page.locator('#filters-container');
    this.activeFilterChips = page.locator('.badge-container').getByRole('button');
    this.planCombobox = page
      .locator('.tp-filters')
      .filter({ hasText: 'Tarifni paket' })
      .getByRole('combobox');
    this.sortButton = page.getByRole('button', { name: /Sortiraj/ });
    this.productCards = page.locator('[data-test-device-list-item]');
    this.emptyStateMessage = page.getByText(/ne postoji ponuda uređaja/);
  }

  cardModelName(card: Locator): Locator {
    return card.locator('[data-test-brand-model] .brand-model__model');
  }

  // Main monthly rate only, not the crossed-out old price or the recycling price.
  cardMonthlyPrice(card: Locator): Locator {
    return card.locator('.product-price-modifier > .cosmos-price');
  }

  cardPlanLabels(): Locator {
    return this.productCards.locator('[data-test-cosmos-label] .cosmos-label__text');
  }

  activeFilterChip(label: string): Locator {
    return this.page
      .locator('.badge-container')
      .getByRole('button', { name: `${label} close`, exact: true });
  }

  sortRadio(option: SortOption): Locator {
    return this.page.getByRole('radio', { name: option, exact: true });
  }

  async navigateToPhonesCatalog(): Promise<void> {
    await this.goto();
    await this.phonesCategoryLink.click();
  }

  async openPhonesCatalog(): Promise<void> {
    await this.navigateToPhonesCatalog();
    await expect(this.resultsCountText).toBeVisible();
  }

  // Call before navigating: the catalog API fires once on load and filters are applied client-side.
  waitForCatalogResponse(): Promise<Response> {
    return this.page.waitForResponse((res) => isCatalogApiUrl(new URL(res.url())));
  }

  async openFirstProduct(): Promise<void> {
    await this.productCards.first().getByRole('link', { name: 'Detaljnije' }).click();
  }

  async getVisibleModelNames(): Promise<string[]> {
    const texts = await this.cardModelName(this.productCards).allInnerTexts();
    return texts.map((t) => t.trim());
  }

  async filterByBrand(brand: string): Promise<void> {
    await this.filtersPanel.getByRole('button', { name: brand, exact: true }).click();
  }

  async filterByRam(ram: string): Promise<void> {
    await this.filtersPanel.getByRole('button', { name: ram, exact: true }).click();
  }

  async filterByPlan(plan: string): Promise<void> {
    // react-select renders an invisible input as the combobox; it only opens from the keyboard.
    await this.planCombobox.focus();
    await this.page.keyboard.press('ArrowDown');
    await this.page.getByRole('option', { name: new RegExp(`^${escapeRegExp(plan)}\\s`) }).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortButton.hover();
    // The radio is read-only: .check() ticks it without sorting. The site listens to label clicks.
    await this.page.locator('label').filter({ hasText: option }).first().click();
  }

  async getResultsCount(): Promise<number> {
    const text = await this.resultsCountText.innerText();
    const match = text.match(/\d+/);
    if (!match) {
      throw new Error(`Unable to parse results count from: "${text}"`);
    }
    return Number(match[0]);
  }

  async getMonthlyPrices(limit = 20): Promise<number[]> {
    const texts = await this.cardMonthlyPrice(this.productCards)
      .locator('.cosmos-price__rate-value')
      .allInnerTexts();
    return texts.slice(0, limit).map((t) => Number(t.replace(/\./g, '')));
  }

  async clearAllFilters(): Promise<void> {
    let remaining = await this.activeFilterChips.count();
    while (remaining > 0) {
      await this.activeFilterChips.first().click();
      remaining -= 1;
      await expect(this.activeFilterChips).toHaveCount(remaining);
    }
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
