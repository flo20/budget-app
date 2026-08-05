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

//make custom categories case-insensitive
export function normalizeCategory(value) {
    return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
}

export const ASSET_TYPES = ['cash', 'investment', 'property', 'retirement', 'other']

export const SAVINGS_GOAL_CATEGORIES = [
	{ value: 'general', label: 'General' },
	{ value: 'vehicle', label: 'Vehicle' },
	{ value: 'home', label: 'Home' },
	{ value: 'travel', label: 'Travel' },
	{ value: 'safety_net', label: 'Safety net' },
	{ value: '__custom__', label: 'Other' },
]

export const CUSTOM_CATEGORY_OPTION = '__custom__'

export const SAVINGS_GOAL_CATEGORY_VALUES =
	SAVINGS_GOAL_CATEGORIES
		.filter(({ value }) => value !== CUSTOM_CATEGORY_OPTION)
		.map(({ value }) => value)

