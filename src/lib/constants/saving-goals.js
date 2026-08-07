export const CUSTOM_CATEGORY_OPTION = '__custom__'

export const SAVINGS_GOAL_CATEGORIES = [
	{ value: 'general', label: 'General' },
	{ value: 'vehicle', label: 'Vehicle' },
	{ value: 'home', label: 'Home' },
	{ value: 'travel', label: 'Travel' },
	{ value: 'safety_net', label: 'Safety net' },
	{ value: '__custom__', label: 'Other' },
]

export const SAVINGS_GOAL_CATEGORY_VALUES = SAVINGS_GOAL_CATEGORIES.filter(
	({ value }) => value !== CUSTOM_CATEGORY_OPTION,
).map(({ value }) => value)
