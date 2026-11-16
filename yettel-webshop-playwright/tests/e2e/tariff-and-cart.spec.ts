import { test, expect } from '@fixtures/pom.fixture';
import { bundleSelection } from '@data/product.data';

test.describe('Tariff selection and cart', () => {
  test.beforeEach(async ({ catalogPage, productDetailPage }) => {
    await catalogPage.openPhonesCatalog();
    await catalogPage.openFirstProduct();
    await productDetailPage.waitForConfigurator();
  });

  test('selecting a tariff updates the monthly device installment and total', async ({ productDetailPage }) => {
    const before = await productDetailPage.getMonthlyBreakdown();
    const advertised = await productDetailPage.getAdvertisedPrices(bundleSelection.tariff);

    await productDetailPage.selectTariff(bundleSelection.tariff);

    await expect(productDetailPage.tariffOption(bundleSelection.tariff)).toBeChecked();
    await expect(productDetailPage.tariffStepValue).toHaveText(bundleSelection.tariff);
    await expect(productDetailPage.summaryContext).toContainText(bundleSelection.tariff);
    await expect.poll(() => productDetailPage.getMonthlyBreakdown()).toEqual({
      device: advertised.device,
      tariff: advertised.tariff,
      total: advertised.device + advertised.tariff,
    });
    expect(advertised.device, 'device installment differs from the preselected tariff').not.toBe(before.device);
  });

  test('selecting a colour variant updates the purchase summary', async ({ productDetailPage }) => {
    const color = await productDetailPage.getUnselectedColorName();
    test.skip(!color, 'First catalog device has only one colour');

    await productDetailPage.selectColor(color!);

    await expect(productDetailPage.colorOption(color!)).toBeChecked();
    await expect(productDetailPage.summaryContext).toContainText(color!);
  });

  test('buying adds the selected device, colour and tariff bundle to the cart', async ({ page, productDetailPage, checkoutPage }) => {
    await productDetailPage.selectTariff(bundleSelection.tariff);
    const color = await productDetailPage.getUnselectedColorName();
    if (color) await productDetailPage.selectColor(color);
    await expect(page).toHaveURL(/[?&]tariff=\d+/);

    const params = new URL(page.url()).searchParams;
    const order = await checkoutPage.interceptOrderRequest();

    await productDetailPage.buy();
    await checkoutPage.waitForAccessoriesStep();
    await checkoutPage.continueButton.click();

    const [product] = (await order.payload).selectedProducts;
    expect(product.tariffPackageId).toBe(Number(params.get('tariff')));
    if (color) expect(product.colorId).toBe(Number(params.get('color')));
    expect(product.installments).toBe(bundleSelection.installments);
    expect(product.purchaseType).toBe('cosmos');
    await expect(page).toHaveURL(/\/Kupovina/);
  });
});
