import { Page } from '@playwright/test';

export const checkoutApi = {
  pathPrefix: '/bff/checkout/',
} as const;

export function isOrderApiUrl(url: URL): boolean {
  return url.pathname.startsWith(checkoutApi.pathPrefix);
}

// Safety net for testing a live shop: any write to the checkout API is aborted in the browser,
// so no test can ever create a real order. Tests that need the step to succeed fake the response.
export async function blockOrderWrites(page: Page): Promise<string[]> {
  const blocked: string[] = [];
  await page.route(isOrderApiUrl, (route) => {
    if (route.request().method() === 'GET') return route.fallback();
    blocked.push(`${route.request().method()} ${new URL(route.request().url()).pathname}`);
    return route.abort('blockedbyclient');
  });
  return blocked;
}
