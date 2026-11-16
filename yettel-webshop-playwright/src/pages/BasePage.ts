import { Locator, Page } from '@playwright/test';

export class BasePage {
  private readonly acceptAllCookiesLink: Locator;
  private cookieHandlerRegistered = false;

  constructor(protected readonly page: Page) {
    this.acceptAllCookiesLink = page.getByRole('link', { name: 'Dozvoli sve' });
  }

  async goto(): Promise<void> {
    await this.dismissCookiesWhenShown();
    await this.page.goto('./', { waitUntil: 'domcontentloaded' });
  }

  // The consent banner appears a few seconds after load, so accept it whenever it shows up.
  private async dismissCookiesWhenShown(): Promise<void> {
    if (this.cookieHandlerRegistered) return;
    await this.page.addLocatorHandler(this.acceptAllCookiesLink, async (link) => {
      await link.click();
    });
    this.cookieHandlerRegistered = true;
  }
}
