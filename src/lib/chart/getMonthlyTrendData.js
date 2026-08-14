export function getMonthlyTrendData(cashFlowData = []) {
	if (!cashFlowData.length) {
		return {
			trendData: [],
			trendMetrics: {
				currentMonthSpending: 0,
				previousMonthSpending: 0,
				spendingChange: 0,
				spendingDifference: 0,
				threeMonthAverage: 0,
				netCashFlow: 0,
			},
		}
	}

	const currentMonth = cashFlowData[cashFlowData.length - 1]

	const previousMonth = cashFlowData[cashFlowData.length - 2]

	const currentMonthSpending = currentMonth?.expense ?? 0

	const previousMonthSpending = previousMonth?.expense ?? 0

	/*
	 * Difference in actual money spent
	 */
	const spendingDifference = currentMonthSpending - previousMonthSpending

	/*
	 * Percentage change compared with previous month
	 */
	let spendingChange = 0

	if (previousMonthSpending > 0) {
		spendingChange =
			((currentMonthSpending - previousMonthSpending) / previousMonthSpending) *
			100
	}

	/*
	 * Last 3 months
	 */
	const lastThreeMonths = cashFlowData.slice(-3)

	const threeMonthAverage =
		lastThreeMonths.length > 0
			? lastThreeMonths.reduce((total, month) => total + month.expense, 0) /
				lastThreeMonths.length
			: 0
	// Trend direction
	let trendDirection = 'stable'

	if (lastThreeMonths.length >= 3) {
		const [firstMonth, secondMonth, thirdMonth] = lastThreeMonths

		if (
			firstMonth.expense < secondMonth.expense &&
			secondMonth.expense < thirdMonth.expense
		) {
			trendDirection = 'rising'
		} else if (
			firstMonth.expense > secondMonth.expense &&
			secondMonth.expense > thirdMonth.expense
		) {
			trendDirection = 'falling'
		}
	}
	return {
		trendData: cashFlowData,
		trendMetrics: {
			currentMonthSpending,
			previousMonthSpending,
			spendingChange,
			spendingDifference,
			threeMonthAverage,
			netCashFlow: currentMonth?.net ?? 0,
			trendDirection,
		},
	}
}
