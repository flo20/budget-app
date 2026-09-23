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
	CalendarSync,
} from 'lucide-react'

export function getLiabilityIcon(liabilityType) {
	switch (liabilityType) {
		case 'mortgage':
			return <HandCoins aria-hidden="true" />

		case 'personal_loan':
			return <Coins aria-hidden="true" />

		case 'credit_card':
			return <CreditCard aria-hidden="true" />

		case 'student_loan':
			return <BookText aria-hidden="true" />

		case 'auto_loan':
			return <CalendarSync aria-hidden="true" />

		case 'medical_debt':
			return <Hospital aria-hidden="true" />

		case 'other':
			return <CirclePlus aria-hidden="true" />

		default:
			return <WalletCards aria-hidden="true" />
	}
}