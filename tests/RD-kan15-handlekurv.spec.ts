


import { test, expect } from '@playwright/test';

test('Fullføre kjøp – med logging og screenshots', async ({ page }, testInfo) => {
  const log = (msg: string) => console.log(`✅ ${msg}`);

  const screenshot = async (name: string) => {
    const filePath = testInfo.outputPath(name);
    await page.screenshot({ path: filePath });
    log(`Screenshot lagret: ${name}`);
  };

  try {
    // 1. Login første gang
    log('Åpner SauceDemo');
    await page.goto('https://www.saucedemo.com/');
    await screenshot('01-login.png');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
    await screenshot('02-inventory.png');

    // 2. Legg produkt i handlekurv
    const price = await page.locator('.inventory_item_price').first().textContent();
    log(`Pris registrert: ${price}`);

    await page.locator('[data-test^="add-to-cart"]').first().click();
    await page.locator('.shopping_cart_link').click();
    await screenshot('03-cart.png');

    // 3. Checkout steg 1
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Ola');
    await page.locator('[data-test="lastName"]').fill('Nordmann');
    await page.locator('[data-test="postalCode"]').fill('0123');
    await screenshot('04-checkout-step-one.png');

    await page.locator('[data-test="continue"]').click();

    // 4. Checkout steg 2
    const summaryPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(summaryPrice).toBe(price);
    await screenshot('05-summary.png');

    // 5. Fullfør kjøp
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');

    await screenshot('06-confirmation.png');
    log('Kjøp fullført');

  } catch (error) {
    // ✅ Screenshot ved feil i SAMME mappe
    await page.screenshot({
      path: testInfo.outputPath('ERROR.png'),
      fullPage: true,
    });

    console.error('❌ Test feilet – screenshot lagret');
    throw error;
  }
});
