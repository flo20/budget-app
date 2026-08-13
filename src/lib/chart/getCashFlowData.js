export function getCashFlowData({
	transactions = [],
	endMonth,
	monthsToShow = 6,
}) {
	if (!endMonth) {
		throw new Error('endMonth is required')
	}

	const [endYear, endMonthNumber] = endMonth.split('-').map(Number)

	const monthlyMap = new Map()

	for (let i = monthsToShow - 1; i >= 0; i--) {
		const date = new Date(endYear, endMonthNumber - 1 - i, 1)

		const year = date.getFullYear()
		const month = date.getMonth() + 1

		const key = `${year}-${String(month).padStart(2, '0')}`

		monthlyMap.set(key, {
			key,
			month: date
				.toLocaleString('en-US', {
					month: 'short',
				})
				.toUpperCase(),

			income: 0,
			expense: 0,
			net: 0,
		})
	}

	transactions.forEach((transaction) => {
		const transactionMonth = transaction.transaction_date.slice(0, 7)

		const monthData = monthlyMap.get(transactionMonth)

		if (!monthData) return

		const amount = Number(transaction.amount)

		if (transaction.transaction_type === 'income') {
			monthData.income += amount
		}

		if (transaction.transaction_type === 'expense') {
			monthData.expense += amount
		}
	})

	const cashFlowData = Array.from(monthlyMap.values()).map((month) => ({
		...month,
		net: month.income - month.expense,
	}))

	return cashFlowData
}
