const { test, expect } = require('@playwright/test');

test('should land on home page after Okta login', async ({ page }) => {
  await page.goto('/');

  // Confirm we landed on the app — works for any environment
  await expect(page).toHaveURL(/#\//);

  // Confirm the page is not showing the Okta login screen
  await expect(page.getByText('Sign In')).not.toBeVisible();
});