export function getAvailableCategories(categories, allocatedCategories) {
	const allocatedNames = new Set(
		allocatedCategories.map((item) => item.category.trim().toLowerCase()),
	)

	return categories.filter(
		(category) =>
			category.type === 'expense' &&
			category.is_active !== false &&
			!allocatedNames.has(category.name.trim().toLowerCase()),
	)
}
