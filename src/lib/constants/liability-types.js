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
