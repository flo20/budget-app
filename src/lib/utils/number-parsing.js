export function toValidNumber(value) {
	const number = Number(value)

	return Number.isFinite(number) ? number : 0
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