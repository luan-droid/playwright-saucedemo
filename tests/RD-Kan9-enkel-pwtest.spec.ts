import { test, expect } from '@playwright/test';

test('feilmelding ved feil passord', async ({ page }) => {
  // Gå til siden en gang for å sikre at vi er på riktig side
  await page.goto('https://www.saucedemo.com');

  // Fyll inn brukernavn riktig, men feil passord
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'feil_passord');
  await page.click('#login-button');

  // Sjekk at feilmelding vises under innloggingsskjema
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();

  // Sjekk at bruker forblir på innloggingssiden
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // Sjekk at feilmelding inneholder spesifikk tekst
  await expect(errorMessage).toContainText('Username and password do not match');
});