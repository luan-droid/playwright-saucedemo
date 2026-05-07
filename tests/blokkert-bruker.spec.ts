import { test, expect } from '@playwright/test';


test('blocked user should see error message when trying to login', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');

    // Fill in blocked user credentials
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');

    // Click login button
    await page.click('[data-test="login-button"]');

    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out');

    // Verify user is not redirected to inventory page
    await expect(page).not.toHaveURL(/inventory/);
});

test('prøv å logge inn med blokkert bruker', async ({ page }) => {
  // Gå til siden
  await page.goto('https://www.saucedemo.com');

  // Fyll inn brukernavn og passord
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Sjekk at vi ikke kom inn
  await expect(page.locator('.error-message-container')).toBeVisible();
});
