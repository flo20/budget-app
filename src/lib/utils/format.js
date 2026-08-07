export function formatCurrency(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount)
}

export function formatPercentage(percentage) {
	if (!Number.isFinite(percentage)) {
		return '0%'
	}

	if (percentage > 0 && percentage < 1) {
		return '<1%'
	}

	return `${Math.round(percentage)}%`
}

export function formatTimestamp(value) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		timeZone: 'Asia/Dubai',
	}).format(new Date(value))
}

export function formatMonth(value) {
    const [year, month] = value.split('-').map(Number)

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, 1)))
}