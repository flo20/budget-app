export const LIABILITY_TYPES = [
	{ value: 'mortgage', label: 'Mortgage' },
	{ value: 'loan', label: 'Personal loan' },
	{ value: 'credit_card', label: 'Credit card' },
	{ value: 'student_loan', label: 'Student loan' },
	{ value: 'auto_loan', label: 'Auto loan' },
	{ value: 'medical_debt', label: 'Medical debt' },
	{ value: 'other', label: 'Other' },
]

export const LIABILITY_TYPE_VALUES = LIABILITY_TYPES.map(({ value }) => value)


import {
    Coins,
    HandCoins,
    BookText,
    Hospital,
    CreditCard,
    WalletCards,
    CirclePlus, 
    CalendarSync
} from 'lucide-react'

export function getLiabilityIcon(categoryName) {
    const name = categoryName.toLowerCase()

    if (name.includes('mortgage')) {
        return <HandCoins aria-hidden="true" />
    }

    if (name.includes('loan')) {
        return <Coins aria-hidden="true" />
    }

    if (name.includes('credit')) {
        return <CreditCard aria-hidden="true" />
    }

    if (name.includes('student')) {
			return <BookText aria-hidden="true" />
		}
    if (name.includes('auto')) {
			return <CalendarSync aria-hidden="true" />
		}
    if (name.includes('medical')) {
			return <Hospital aria-hidden="true" />
		}
    if (name.includes('other')) {
        return <CirclePlus aria-hidden="true" />
    }

    return <WalletCards aria-hidden="true" />
}
