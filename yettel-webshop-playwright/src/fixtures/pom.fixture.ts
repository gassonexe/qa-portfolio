import { test as base, expect } from '@playwright/test';
import { CatalogPage } from '@pages/CatalogPage';

type PomFixtures = {
  catalogPage: CatalogPage;
};

export const test = base.extend<PomFixtures>({
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
});

export { expect };
