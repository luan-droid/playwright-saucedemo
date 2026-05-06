import { test, expect } from '@playwright/test';

test('logg inn og se produkter', async ({ page }) => {
  // Gå til siden
  await page.goto('https://www.saucedemo.com');

  // Fyll inn brukernavn og passord
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  //test noe
  
  // Sjekk at vi kom inn
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  console.log('✅ Innlogging fungerer!');
});