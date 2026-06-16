import { expect, test } from '@playwright/test';

test('home page introduces Shelf and exposes the public starter navigation', async ({ page }) => {
	await page.goto('/playground');

	const addToShelfBtn = page.getByRole('button', { name: /Add to shelf/i });
	const cancelBtn = page.getByRole('button', { name: /Cancel/i });
	const outOfStockBtn = page.getByRole('button', { name: /Out of stock/i });
	const searchInput = page.getByLabel('Search');

	await expect(addToShelfBtn).toBeVisible();
	await expect(cancelBtn).toBeVisible();
	await expect(outOfStockBtn).toBeDisabled();
	await expect(searchInput).toBeVisible();

	// -------------------------

	const firstDeleteBtn = page.getByRole('button', { name: /Delete/i }).first();
	const thirdRemoveBtn = page
		.getByLabel('Reading list')
		.getByRole('listitem')
		.nth(2)
		.getByRole('button', {
			name: /Remove/i
		});
	const piranessiRateBtn = page
		.getByLabel('Piranesi by Susanna Clarke')
		.getByRole('button', { name: /Rate This Book/i });

	await expect(firstDeleteBtn).toBeVisible();
	await expect(thirdRemoveBtn).toBeVisible();
	await expect(piranessiRateBtn).toBeVisible();

	// -------------------------

	const alert = page.getByRole('alert').getByText(/Unsaved changes will be lost/i);

	await expect(alert).toBeVisible();
});
