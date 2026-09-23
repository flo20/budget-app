import { Car, ShieldCheck, Plane, House, Wallet } from 'lucide-react'

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

export function getGoalIcon(category) {
	switch (category) {
		case 'general':
			return Wallet
		case 'vehicle':
			return Car
		case 'home':
			return House
		case 'travel':
			return Plane
		case 'safety_net':
			return ShieldCheck
		default:
			return Wallet
	}
}

export function getProgress(goal) {
	const target = Number(goal.target_amount || 0)
	const saved = Number(goal.saved_amount || 0)

	if (target <= 0) return 0

	return Math.min(100, (saved / target) * 100)
}

