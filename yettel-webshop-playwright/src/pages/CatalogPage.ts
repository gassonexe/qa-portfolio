import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { SortOption } from '@app-types/catalog.types';

export class CatalogPage extends BasePage {
  private readonly phonesCategoryLink: Locator;
  private readonly resultsCountText: Locator;
  private readonly activeFilterChips: Locator;
  private readonly planDropdownArrow: Locator;
  private readonly sortButton: Locator;

  constructor(page: Page) {
    super(page);
    this.phonesCategoryLink = page
      .locator('#category-selector')
      .getByRole('link', { name: 'Telefoni' });
    this.resultsCountText = page.getByRole('article').getByText('uređaja');
    this.activeFilterChips = page.getByRole('button', { name: /\sclose$/ });
    this.planDropdownArrow = page.locator('svg').nth(3);
    this.sortButton = page.getByRole('button', { name: 'sorting-sliderSortiraj' });
  }

  productCard(name: string): Locator {
    return this.page.getByText(name);
  }

  productMonthlyPrice(price: string): Locator {
    return this.page.getByText(price).first();
  }

  activeFilterChip(label: string): Locator {
    return this.page.getByRole('button', { name: `${label} close` });
  }

  sortRadio(option: SortOption): Locator {
    return this.page.getByRole('radio', { name: option });
  }
  
    planPriceLabel(plan: string): Locator {
    return this.page.getByText(`uz ${plan}`).first();
  }

  async openPhonesCatalog(): Promise<void> {
    await this.goto();
    await this.phonesCategoryLink.click();
    await expect(this.resultsCountText).toBeVisible();
  }

  async filterByBrand(brand: string): Promise<void> {
    await this.page.getByRole('button', { name: brand }).click();
  }

  async filterByRam(ram: string): Promise<void> {
    await this.page.getByRole('button', { name: ram }).click();
  }

    async filterByPlan(plan: string): Promise<void> {
    await this.planDropdownArrow.click();
    await this.page
      .locator('[id^="react-select-"][id*="-option-"]')
      .getByText(plan)
      .click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortButton.hover();
    await this.sortRadio(option).check();
  }

  async getResultsCount(): Promise<number> {
    const text = await this.resultsCountText.innerText();
    const match = text.match(/\d+/);
    if (!match) {
      throw new Error(`Unable to parse results count from: "${text}"`);
    }
    return Number(match[0]);
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