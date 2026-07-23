export function normalizeMonth(value) {
	if (/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
		return value
	}

	return new Date().toISOString().slice(0, 7)
}

export function toBudgetMonth(value) {
	return `${value}-01`
}

export function changeMonth(value, change) {
	const [year, month] = value.split('-').map(Number)

	const date = new Date(Date.UTC(year, month - 1 + change, 1))

	return date.toISOString().slice(0, 7)
}

export function formatMonth(value) {
	const [year, month] = value.split('-').map(Number)

	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(Date.UTC(year, month - 1, 1)))
}
