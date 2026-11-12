import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { SortOption } from '@app-types/catalog.types';

export class CatalogPage extends BasePage {
  private readonly phonesCategoryLink: Locator;
  private readonly resultsCountText: Locator;
  private readonly filtersPanel: Locator;
  private readonly activeFilterChips: Locator;
  private readonly planCombobox: Locator;
  private readonly sortButton: Locator;

  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.phonesCategoryLink = page
      .locator('#category-selector')
      .getByRole('link', { name: 'Telefoni' });
    this.resultsCountText = page.getByRole('article').getByText('uređaja');
    this.filtersPanel = page.locator('#filters-container');
    this.activeFilterChips = page.locator('.badge-container').getByRole('button');
    this.planCombobox = page
      .locator('.tp-filters')
      .filter({ hasText: 'Tarifni paket' })
      .getByRole('combobox');
    this.sortButton = page.getByRole('button', { name: /Sortiraj/ });
    this.productCards = page.locator('.device-list-item');
  }

  productCard(name: string): Locator {
    return this.productCards.filter({ hasText: name });
  }

  /** Model name shown on a card, e.g. "Galaxy Z Fold7 256GB". */
  cardModelName(card: Locator): Locator {
    return card.locator('.brand-model__model');
  }

  /** Main monthly instalment on a card (excludes the old price and the recycling price). */
  cardMonthlyPrice(card: Locator): Locator {
    return card.locator('.product-price-modifier > .cosmos-price');
  }

  /** "Cena uređaja na 36 rata uz <plan>" label on every card. */
  cardPlanLabels(): Locator {
    return this.productCards.locator('.cosmos-label__text');
  }

  activeFilterChip(label: string): Locator {
    return this.page
      .locator('.badge-container')
      .getByRole('button', { name: `${label} close`, exact: true });
  }

  sortRadio(option: SortOption): Locator {
    return this.page.getByRole('radio', { name: option, exact: true });
  }

  async openPhonesCatalog(): Promise<void> {
    await this.goto();
    await this.phonesCategoryLink.click();
    await expect(this.resultsCountText).toBeVisible();
  }

  async filterByBrand(brand: string): Promise<void> {
    await this.filtersPanel.getByRole('button', { name: brand, exact: true }).click();
  }

  async filterByRam(ram: string): Promise<void> {
    await this.filtersPanel.getByRole('button', { name: ram, exact: true }).click();
  }

  async filterByPlan(plan: string): Promise<void> {
    // react-select renders an invisible input as the combobox; open it from the keyboard.
    await this.planCombobox.focus();
    await this.page.keyboard.press('ArrowDown');
    await this.page.getByRole('option', { name: new RegExp(`^${escapeRegExp(plan)}\\s`) }).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortButton.hover();
    // The radio input is read-only: `.check()` ticks it without triggering a sort.
    // Clicking its label is what the site listens to.
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

  /** Monthly prices of the first `limit` cards, as numbers ("5.976" -> 5976). */
  async getMonthlyPrices(limit = 20): Promise<number[]> {
    const texts = await this.productCards
      .locator('.product-price-modifier > .cosmos-price .cosmos-price__rate-value')
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
