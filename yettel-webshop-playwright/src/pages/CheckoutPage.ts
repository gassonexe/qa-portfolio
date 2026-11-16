import { expect, Locator, Page, Route } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { OrderRequest } from '@app-types/checkout.types';
import { isOrderApiUrl } from '@api/checkout.api';

export class CheckoutPage extends BasePage {
  readonly accessoriesHeading: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;
  readonly unexpectedError: Locator;

  constructor(page: Page) {
    super(page);
    this.accessoriesHeading = page.getByText('Dodatna oprema za tvoj');
    this.continueButton = page.getByRole('button', { name: 'Nastavi', exact: true });
    this.backButton = page.getByRole('button', { name: 'Nazad', exact: true });
    this.unexpectedError = page.getByText('Došlo je do neočekivane greške!');
  }

  async waitForAccessoriesStep(): Promise<void> {
    await expect(this.page).toHaveURL(/\/Dodaci/);
    await expect(this.accessoriesHeading).toBeVisible();
  }

  /**
   * Answers the "create order" request inside the test browser so it never reaches Yettel,
   * and resolves with the payload the page tried to send.
   */
  async interceptOrderRequest(): Promise<{ payload: Promise<OrderRequest> }> {
    let resolvePayload!: (payload: OrderRequest) => void;
    const payload = new Promise<OrderRequest>((resolve) => (resolvePayload = resolve));

    await this.page.route(isOrderApiUrl, async (route: Route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      resolvePayload(route.request().postDataJSON() as OrderRequest);
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: 200, data: {} }) });
    });

    return { payload };
  }
}
