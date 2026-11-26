import { normalizeCategory } from '@/lib/utils/category'

export function getAvailableCategories(
	categories,
	allocatedCategories,
) {
	const allocatedNames = new Set(
		allocatedCategories.map((item) =>
			normalizeCategory(item.category),
		),
	)

	return categories.filter(
		(category) =>
			category.type === 'expense' &&
			category.is_active !== false &&
			!allocatedNames.has(
				normalizeCategory(category.name),
			),
	)
}