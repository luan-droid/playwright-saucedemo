import { test, expect } from '@playwright/test';

test('Inventory page viser alle produkter etter innlogging', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', error => pageErrors.push(error));

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(6);

  const products = page.locator('.inventory_item');
  const productCount = await products.count();
  for (let i = 0; i < productCount; i++) {
    const product = products.nth(i);
    await expect(product.locator('.inventory_item_name')).toBeVisible();
    await expect(product.locator('.inventory_item_price')).toBeVisible();
    const image = product.locator('img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', /.+/);
  }

  await expect(pageErrors).toHaveLength(0);
});
