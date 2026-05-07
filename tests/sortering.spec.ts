import { test, expect } from '@playwright/test';
import { users } from '../fixtures/testData';

test.describe('Sortering av produkter', () => {
  test.beforeEach(async ({ page }) => {
    // Gå til siden
    await page.goto('https://www.saucedemo.com');

    // Logg inn som standard bruker
    await page.fill('#user-name', users.standard.username);
    await page.fill('#password', users.standard.password);
    await page.click('#login-button');

    // Vent til vi er på inventory siden
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Sortering A–Z fungerer korrekt', async ({ page }) => {
    // Screenshot før sortering
    await page.screenshot({ path: 'test-results/screenshots/01-foran-sortering-az.png' });

    // Åpne dropdown for sortering
    await page.selectOption('[data-test="product-sort-container"]', 'az');
    
    // Screenshot etter sortering
    await page.screenshot({ path: 'test-results/screenshots/02-etter-sortering-az.png' });

    // Hent alle produktnavn
    const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();

    // Verifiser at produktene er sortert A-Z
    const sortedNames = [...productNames].sort();
    
    console.log('📦 Produkter (A-Z):');
    console.log('Fra siden:', productNames);
    console.log('Forventet sortering:', sortedNames);
    
    expect(productNames).toEqual(sortedNames);

    console.log('✅ Sortering A–Z fungerer!');
  });

  test('Sortering Z–A fungerer korrekt', async ({ page }) => {
    // Screenshot før sortering
    await page.screenshot({ path: 'test-results/screenshots/03-foran-sortering-za.png' });

    // Åpne dropdown for sortering
    await page.selectOption('[data-test="product-sort-container"]', 'za');
    
    // Screenshot etter sortering
    await page.screenshot({ path: 'test-results/screenshots/04-etter-sortering-za.png' });

    // Hent alle produktnavn
    const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();

    // Verifiser at produktene er sortert Z-A
    const sortedNames = [...productNames].sort().reverse();
    
    console.log('📦 Produkter (Z-A):');
    console.log('Fra siden:', productNames);
    console.log('Forventet sortering:', sortedNames);
    
    expect(productNames).toEqual(sortedNames);

    console.log('✅ Sortering Z–A fungerer!');
  });

  test('Sortering pris lav–høy fungerer korrekt', async ({ page }) => {
    // Screenshot før sortering
    await page.screenshot({ path: 'test-results/screenshots/05-foran-sortering-lohi.png' });

    // Åpne dropdown for sortering
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
    
    // Screenshot etter sortering
    await page.screenshot({ path: 'test-results/screenshots/06-etter-sortering-lohi.png' });

    // Hent alle priser og konverter til tall
    const priceElements = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

    // Verifiser at prisene er sortert fra lav til høy
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    console.log('💰 Priser (Lav–Høy):');
    console.log('Fra siden:', prices);
    console.log('Forventet sortering:', sortedPrices);
    
    expect(prices).toEqual(sortedPrices);

    console.log('✅ Sortering pris lav–høy fungerer!');
  });

  test('Sortering pris høy–lav fungerer korrekt', async ({ page }) => {
    // Screenshot før sortering
    await page.screenshot({ path: 'test-results/screenshots/07-foran-sortering-hilo.png' });

    // Åpne dropdown for sortering
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');
    
    // Screenshot etter sortering
    await page.screenshot({ path: 'test-results/screenshots/08-etter-sortering-hilo.png' });

    // Hent alle priser og konverter til tall
    const priceElements = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

    // Verifiser at prisene er sortert fra høy til lav
    const sortedPrices = [...prices].sort((a, b) => b - a);
    
    console.log('💰 Priser (Høy–Lav):');
    console.log('Fra siden:', prices);
    console.log('Forventet sortering:', sortedPrices);
    
    expect(prices).toEqual(sortedPrices);

    console.log('✅ Sortering pris høy–lav fungerer!');
  });
});
