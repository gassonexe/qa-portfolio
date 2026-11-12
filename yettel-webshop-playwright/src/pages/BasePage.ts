import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  protected static readonly BASE_URL = 'https://www.yettel.rs/webshop/sr/';

  private readonly acceptAllCookiesLink: Locator;

  constructor(protected readonly page: Page) {
    this.acceptAllCookiesLink = page.getByRole('link', { name: 'Dozvoli sve' });
  }

  async goto(): Promise<void> {
    await this.page.goto(BasePage.BASE_URL, { waitUntil: 'domcontentloaded' });
  }

  async acceptCookies(): Promise<void> {
    await this.acceptAllCookiesLink.click();
    await expect(this.acceptAllCookiesLink).toBeHidden();
  }
}