export function normalizeMonth(value) {
	const isValidMonth =
		typeof value === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)

	if (isValidMonth) {
		return value
	}

	return new Date().toISOString().slice(0, 7)
}

export function toBudgetMonth(month) {
	if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
		throw new Error(`Invalid selected month: ${month}`)
	}

	return `${month}-01`
}

export function changeMonth(value, change) {
	const [year, month] = value.split('-').map(Number)

	const date = new Date(Date.UTC(year, month - 1 + change, 1))

	return date.toISOString().slice(0, 7)
}

export function isValidBudgetMonth(value) {
    return /^\d{4}-(0[1-9]|1[0-2])-01$/.test(value)
}
