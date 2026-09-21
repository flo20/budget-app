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
import {
	House,
	ShoppingCart,
	Zap,
	Car,
	Clapperboard,
	WalletCards,
    Hospital,
    Toolbox, 
    CirclePlus
} from 'lucide-react'

export function getCategoryIcon(categoryName) {
    const name = categoryName.toLowerCase()

    if (name.includes('housing')) {
        return <House aria-hidden="true" />
    }

    if (name.includes('grocer')) {
        return <ShoppingCart aria-hidden="true" />
    }

    if (name.includes('utilit')) {
        return <Zap aria-hidden="true" />
    }

    if (name.includes('transport')) {
        return <Car aria-hidden="true" />
    }

    if (name.includes('recreation')) {
        return <Clapperboard aria-hidden="true" />
    }

    if (name.includes('health')) {
        return <Hospital aria-hidden="true" />
    }

    if (name.includes('service')) {
        return <Toolbox aria-hidden="true" />
    }

    if (name.includes('other')) {
        return <CirclePlus aria-hidden="true" />
    }

    return <WalletCards aria-hidden="true" />
}

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
