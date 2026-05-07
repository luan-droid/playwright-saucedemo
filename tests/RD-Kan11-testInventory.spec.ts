import { test, expect } from '@playwright/test';

test('Alle produkter vises på inventory-siden', async ({ page }) => {
  // Gå til siden
  await page.goto('https://www.saucedemo.com');

  // Logg inn
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Sjekk at siden laster uten feil
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Sjekk at alle 6 produkter vises
  const productItems = page.locator('.inventory_item');
  await expect(productItems).toHaveCount(6);

  // Sjekk at hvert produkt har navn, pris og bilde
  for (let i = 0; i < 6; i++) {
    const product = productItems.nth(i);
    
    // Sjekk produktnavn
    const productName = product.locator('.inventory_item_name');
    await expect(productName).toBeVisible();
    
    // Sjekk pris
    const productPrice = product.locator('.inventory_item_price');
    await expect(productPrice).toBeVisible();
    
    // Sjekk bilde
    const productImage = product.locator('img');
    await expect(productImage).toBeVisible();
  }
});
