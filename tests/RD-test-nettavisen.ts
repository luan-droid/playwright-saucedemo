import { test, expect } from '@playwright/test';

test('nettavisen.no er oppe og går', async ({ page }) => {
  // Gå til nettavisen.no
  await page.goto('https://www.nettavisen.no');

  // Godta cookies hvis popup/modal vises i iframe
  try {
    const cookieFrame = page.frameLocator('iframe[src*="privacy"], iframe[id*="sp_message_iframe"], iframe[title*="cookie"]');
    await cookieFrame.locator('button.sp_choice_type_11[aria-label="Godta alle"]').waitFor({ timeout: 10000 });
    await cookieFrame.locator('button.sp_choice_type_11[aria-label="Godta alle"]').click({ force: true });
    console.log('✅ Klikket Godta alle i cookie-popup');
  } catch (e) {
    console.log('Ingen cookie-popup funnet eller kunne ikke klikke Godta alle:', e.message);
  }

  // Sjekk at forsiden lastes inn
  await expect(page).toHaveTitle(/Nettavisen/i);
  await expect(page.locator('body')).toBeVisible();

  // Ta et skjermbilde av forsiden
  await page.screenshot({ path: 'nettavisen-forside.png', fullPage: true });

  console.log('✅ nettavisen.no forside ble vist og skjermbilde tatt');
});
