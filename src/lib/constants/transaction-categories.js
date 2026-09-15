export const EXPENSE_CATEGORIES = [
	'Housing',
	'Groceries',
	'Utilities',
	'Transport',
	'Recreation',
	'Healthcare',
	'Service',
	'Other',
]

export const INCOME_CATEGORIES = ['Salary', 'Bonus', 'Freelance', 'Other']


export function getAvailableCategories(
	allocatedCategories,
	unallocatedCategories,
) {
	const allocatedNames = new Set(
		allocatedCategories.map((item) => item.category),
	)

	const transactionCategoryNames = unallocatedCategories.map(
		(item) => item.category,
	)

	return [
		...new Set([...EXPENSE_CATEGORIES, ...transactionCategoryNames]),
	].filter((category) => !allocatedNames.has(category))
}
