import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { MonthlyBreakdown } from '@app-types/checkout.types';

export class ProductDetailPage extends BasePage {
  private readonly configuratorTitle: Locator;
  private readonly summaryRows: Locator;

  readonly colorOptions: Locator;
  readonly tariffOptions: Locator;
  readonly summary: Locator;
  readonly summaryContext: Locator;
  readonly tariffStepValue: Locator;
  readonly buyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.configuratorTitle = page.getByText('Izaberi svoju kombinaciju');
    this.colorOptions = page.getByRole('radiogroup', { name: 'Boja' }).getByRole('radio');
    this.tariffOptions = page.getByRole('radiogroup', { name: 'Tarifni paket' }).getByRole('radio');
    this.summary = page.getByRole('region', { name: 'Rezime kupovine' });
    this.summaryContext = this.summary.locator('.pdp-summary__context');
    this.summaryRows = this.summary.locator('.pdp-summary__row');
    this.tariffStepValue = page.locator('#pdp-step-tariff [data-test-step-value]');
    this.buyButton = this.summary.getByRole('button', { name: 'Kupi na rate' });
  }

  colorOption(name: string): Locator {
    return this.colorOptions.and(this.page.getByRole('radio', { name, exact: true }));
  }

  tariffOption(name: string): Locator {
    return this.tariffOptions.and(this.page.getByRole('radio', { name, exact: true }));
  }

  async waitForConfigurator(): Promise<void> {
    await expect(this.configuratorTitle).toBeVisible();
    await expect(this.summary).toBeVisible();
  }

  async selectColor(name: string): Promise<void> {
    await this.colorOption(name).check();
  }

  async selectTariff(name: string): Promise<void> {
    await this.tariffOption(name).check();
  }

  async getUnselectedColorName(): Promise<string | undefined> {
    const names = await this.colorOptions.evaluateAll((els) =>
      els.filter((e) => e.getAttribute('aria-checked') !== 'true').map((e) => e.getAttribute('aria-label') ?? ''),
    );
    return names.find(Boolean);
  }

  // Each tariff card advertises the device rate that applies with it, e.g. "uređaj 6.326 RSD/mes.".
  async getAdvertisedPrices(tariff: string): Promise<{ device: number; tariff: number }> {
    const text = await this.tariffOption(tariff).innerText();
    const device = text.match(/uređaj\s+([\d.]+)\s*RSD/);
    const plan = text.match(/([\d.]+)\s*RSD\s*mesečno/);
    if (!device || !plan) {
      throw new Error(`Unable to parse prices from tariff card "${tariff}": "${text}"`);
    }
    return { device: parseRsd(device[1]), tariff: parseRsd(plan[1]) };
  }

  async getMonthlyBreakdown(): Promise<MonthlyBreakdown> {
    return {
      device: await this.summaryAmount(/^Uređaj$/),
      tariff: await this.summaryAmount(/^Tarifa/),
      total: await this.summaryAmount(/^Ukupno mesečno$/),
    };
  }

  async buy(): Promise<void> {
    await this.buyButton.click();
  }

  private async summaryAmount(label: RegExp): Promise<number> {
    const row = this.summaryRows.filter({ has: this.page.locator('.pdp-summary__label', { hasText: label }) });
    return parseRsd(await row.locator('.pdp-summary__amount').innerText());
  }
}

function parseRsd(value: string): number {
  return Number(value.trim().replace(/\./g, ''));
}
