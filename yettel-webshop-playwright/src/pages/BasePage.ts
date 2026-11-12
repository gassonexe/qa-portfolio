import { Locator, Page } from '@playwright/test';

export class BasePage {
  private readonly acceptAllCookiesLink: Locator;
  private cookieHandlerRegistered = false;

  constructor(protected readonly page: Page) {
    this.acceptAllCookiesLink = page.getByRole('link', { name: 'Dozvoli sve' });
  }

  /** Opens the webshop home page (resolved against `baseURL` in playwright.config.ts). */
  async goto(): Promise<void> {
    await this.dismissCookiesWhenShown();
    await this.page.goto('./', { waitUntil: 'domcontentloaded' });
  }

  /**
   * The consent banner appears asynchronously, some time after the page loads,
   * so accept it whenever it shows up instead of at a fixed point in the flow.
   */
  private async dismissCookiesWhenShown(): Promise<void> {
    if (this.cookieHandlerRegistered) return;
    await this.page.addLocatorHandler(this.acceptAllCookiesLink, async (link) => {
      await link.click();
    });
    this.cookieHandlerRegistered = true;
  }
}
