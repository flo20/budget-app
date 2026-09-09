export function formatCurrency(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount)
}

export function formatAmount(amount) {
	return Number(amount).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	})
}

export const formatTransactionCurrency = (transaction) => {
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(Number(transaction?.amount))

	return transaction?.transaction_type === 'income'
		? `+${formattedAmount}`
		: `-${formattedAmount}`
}

export function formatChartCurrency(value) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
	}).format(value)
}

export function formatCompactCurrency(value) {
	const number = Number(value)

	if (!Number.isFinite(number)) {
		return '$0'
	}

	const absolute = Math.abs(number)

	if (absolute >= 1_000_000_000) {
		return `$${(number / 1_000_000_000).toFixed(2)}B`
	}

	if (absolute >= 1_000_000) {
		return `$${(number / 1_000_000).toFixed(2)}M`
	}

	if (absolute >= 1_000) {
		return `$${(number / 1_000).toFixed(1)}K`
	}

	return `$${number.toFixed(2)}`
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

export const formatDate = (date) => {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(new Date(`${date}T00:00:00`))
}

