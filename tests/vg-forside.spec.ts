import { test, expect } from '@playwright/test';

test('viser første side på vg.no', async ({ page }) => {
  // Gå til VG.no  test
  await page.goto('https://www.vg.no');




// Finn riktig iframe for cookie-modal
const cookieFrame = page.frameLocator('iframe[src*="privacy"], iframe[id*="sp_message_iframe"], iframe[title*="cookie"]');
// Vent på at knappen skal vises i iframen
await cookieFrame.locator('button.sp_choice_type_11[aria-label="Godta alle"]').waitFor({ timeout: 10000 });
// Klikk på "Godta alle" inne i iframen
await cookieFrame.locator('button.sp_choice_type_11[aria-label="Godta alle"]').click({ force: true });


  // Sjekk at forsiden lastes inn
  await expect(page).toHaveTitle(/VG/);
  await expect(page.locator('body')).toBeVisible();

  // Ta et skjermbilde av forsiden
  await page.screenshot({ path: 'vg-forside.png', fullPage: true });

  console.log('✅ VG.no forside ble vist og skjermbilde tatt');
});
