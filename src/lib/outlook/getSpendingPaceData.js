export function getSpendingPaceData({
	transactions,
	monthlyBudget,
	year,
	month,
}) {
	const daysInMonth = new Date(year, month, 0).getDate()

	const today = new Date()

	const isCurrentMonth =
		today.getFullYear() === year && today.getMonth() + 1 === month

	const currentDay = isCurrentMonth ? today.getDate() : daysInMonth

	// Only expenses for selected month
	const expenses = transactions.filter((transaction) => {
		if (transaction.transaction_type !== 'expense') return false

		const date = new Date(transaction.transaction_date)

		return date.getFullYear() === year && date.getMonth() + 1 === month
	})

	// Spending per day
	const spendingByDay = {}

	expenses.forEach((transaction) => {
		const date = new Date(transaction.transaction_date)
		const day = date.getDate()

		spendingByDay[day] = (spendingByDay[day] || 0) + Number(transaction.amount)
	})

	const totalSpent = expenses.reduce(
		(sum, transaction) => sum + Number(transaction.amount),
		0,
	)

	const averageDailySpend = currentDay > 0 ? totalSpent / currentDay : 0

	let cumulativeSpent = 0

	return Array.from({ length: daysInMonth }, (_, index) => {
		const day = index + 1

		cumulativeSpent += spendingByDay[day] || 0

		const budgetPace = (monthlyBudget / daysInMonth) * day

		const forecast =
			day >= currentDay
				? totalSpent + averageDailySpend * (day - currentDay)
				: null

		return {
			day,
			actual: day <= currentDay ? cumulativeSpent : null,
			budgetPace,
			forecast,
		}
	})
}
