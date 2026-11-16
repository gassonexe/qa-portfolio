# Yettel Webshop – Playwright Tests

UI and API test automation for the phones catalog of the [Yettel Serbia webshop](https://www.yettel.rs/webshop/sr/), built with Playwright and TypeScript.

Tests run against the live production site and only read data (no orders, no accounts).

## What is covered

| Suite | File | What it checks |
|---|---|---|
| Smoke | `tests/smoke/catalog-smoke.spec.ts` | Catalog loads, cards show a model name and a monthly price in the right format |
| E2E | `tests/e2e/catalog-filters.spec.ts` | Brand, RAM and plan filters, combined filters, clearing filters, sorting by lowest price |
| API | `tests/api/catalog-api.spec.ts` | Catalog API contract, API data vs. rendered cards, behaviour when the API returns 500 |

## Project structure

```
src/
  api/        catalog API config, URL matcher and response checks
  data/       test data (filters, sort option)
  fixtures/   Playwright fixtures that provide page objects
  pages/      page objects (BasePage, CatalogPage)
  types/      TypeScript types for test data and the API response
tests/
  smoke/  e2e/  api/
```

## How to run

Requirements: Node.js 20+.

```bash
npm ci
npx playwright install chromium
```

| Command | Runs |
|---|---|
| `npm test` | all tests |
| `npm run test:smoke` | smoke tests |
| `npm run test:e2e` | filter and sort tests |
| `npm run test:api` | API tests |
| `npm run test:headed` | all tests with a visible browser |
| `npm run typecheck` | TypeScript check |
| `npm run report` | opens the HTML report of the last run |

Tests run with 2 workers, because more parallel browsers can get their connections reset by the site. If a run fails with `net::ERR_CONNECTION_RESET` or a timeout on `page.goto`, the site was not reachable. Wait a minute and run again.

CI runs on every push and pull request that changes this folder (see `.github/workflows/yettel-webshop-playwright.yml` in the repo root).

## Bugs found

### BUG-001: Catalog API failure is shown as "no devices match your filters"

| | |
|---|---|
| **Severity** | Medium |
| **Area** | Phones catalog (`/webshop/sr/Privatni-korisnici/Mobilni-telefoni/`) |
| **Environment** | Chrome desktop, production, November 2026 |
| **Automated test** | `tests/api/catalog-api.spec.ts`, "known issue BUG-001" |

**Steps to reproduce**
1. Open https://www.yettel.rs/webshop/sr/ in Chrome.
2. Open DevTools (F12), go to the **Network** tab.
3. Right-click any request, choose **Block request URL**, then edit the blocked pattern to `*bff/pages/products*`.
4. Click **Telefoni** in the category menu.

**Expected result**
The page says the catalog could not be loaded and offers a way to retry.

**Actual result**
The page shows **"0 uređaja"** and the normal empty-state message saying there are no devices for the selected filters. No filters are selected, so this message is wrong. A user would think the shop has no phones, not that something failed. The same happens when the API returns HTTP 500 (this is what the automated test does).

**Notes**
The page does not crash and there are no JavaScript errors, so the failure is handled. It is just shown with the wrong message. The automated test checks the current behaviour, so it will fail once this is fixed. That is the signal to update it.
