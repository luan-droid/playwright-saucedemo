import { test, expect } from '@playwright/test';
import { users } from '../fixtures/testData';

test('US-01 Vellykket innlogging med standard_user', async ({ page }) => {
  // Gå til siden
  await page.goto('https://www.saucedemo.com');

  // Fyll inn brukernavn og passord
  await page.fill('#user-name', users.standard.username);
  await page.fill('#password', users.standard.password);
  await page.click('#login-button');

  // Verifiser at URL endres til /inventory.html
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Verifiser at bruker ser produktlisten
  await expect(page.locator('.inventory_list')).toBeVisible();

  // Verifiser at handlekurv-ikon er synlig i headeren
  await expect(page.locator('.shopping_cart_link')).toBeVisible();

  console.log('✅ Alle akseptansekriterier oppfylt!');
});                                 