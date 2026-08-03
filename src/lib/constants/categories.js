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

// export const CUSTOM_CATEGORY_OPTION = '__custom__'
