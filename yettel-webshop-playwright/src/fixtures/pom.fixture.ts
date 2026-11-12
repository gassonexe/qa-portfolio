import { test as base, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { CatalogPage } from '@pages/CatalogPage';

type PomFixtures = {
  basePage: BasePage;
  catalogPage: CatalogPage;
};

export const test = base.extend<PomFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
});

export { expect };