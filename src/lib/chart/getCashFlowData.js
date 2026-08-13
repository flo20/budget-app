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

	const currentMonth = cashFlowData[cashFlowData.length - 1]

	const previousMonth = cashFlowData[cashFlowData.length - 2]

	const cashFlowMetrics = {
		currentIncome: currentMonth?.income ?? 0,

		currentExpense: currentMonth?.expense ?? 0,

		netCashFlow: currentMonth?.net ?? 0,

		previousMonthNet: previousMonth?.net ?? 0,

		totalIncome: cashFlowData.reduce((sum, month) => sum + month.income, 0),

		totalExpense: cashFlowData.reduce((sum, month) => sum + month.expense, 0),
	}

	return { cashFlowData, cashFlowMetrics }
}

export function getCashFlowDateRange(budgetMonth, monthsToShow = 6) {
	const [year, month] = budgetMonth.split('-').map(Number)

	const start = new Date(year, month - monthsToShow, 1)

	const end = new Date(year, month, 1)

	function formatDate(date) {
		const year = date.getFullYear()

		const month = String(date.getMonth() + 1).padStart(2, '0')

		return `${year}-${month}-01`
	}

	return {
		startDate: formatDate(start),
		endDate: formatDate(end),
	}
}
