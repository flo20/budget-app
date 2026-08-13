export function getSpendingPaceData({
	transactions = [],
	categoryBudgets = [],
	pinnedPayments = [],
	budgetMonth,
}) {
	if (!budgetMonth) {
		throw new Error('budgetMonth is required')
	}

	// budgetMonth should look like: "2026-08-01"
	const [year, month] = budgetMonth.split('-').map(Number)

	const daysInMonth = new Date(year, month, 0).getDate()

	const today = new Date()

	const isCurrentMonth =
		today.getFullYear() === year && today.getMonth() + 1 === month

	const isPastMonth =
		year < today.getFullYear() ||
		(year === today.getFullYear() && month < today.getMonth() + 1)

	const currentDay = isCurrentMonth
		? today.getDate()
		: isPastMonth
			? daysInMonth
			: 0

	/*
	 * 1. MONTHLY BUDGET
	 *
	 * category_budgets:
	 * monthly_limit numeric
	 */
	const monthlyBudget = categoryBudgets.reduce(
		(total, budget) => total + Number(budget.monthly_limit),
		0,
	)

	/*
	 * 2. EXPENSE TRANSACTIONS
	 *
	 * We only want expense transactions
	 * for the spending graph.
	 */
	const expenses = transactions.filter(
		(transaction) => transaction.transaction_type === 'expense',
	)

	/*
	 * 3. GROUP EXPENSES BY DAY
	 *
	 * Example:
	 *
	 * {
	 *   1: 50,
	 *   3: 120,
	 *   8: 25
	 * }
	 */
	const spendingByDay = expenses.reduce((acc, transaction) => {
		const day = Number(transaction.transaction_date.split('-')[2])

		acc[day] = (acc[day] || 0) + Number(transaction.amount)

		return acc
	}, {})

	/*
	 * 4. TOTAL SPENT
	 */
	const totalSpent = expenses.reduce(
		(total, transaction) => total + Number(transaction.amount),
		0,
	)

	/*
	 * 5. UPCOMING BILLS
	 *
	 * We only want unpaid pinned payments.
	 *
	 * Your Supabase query can already filter
	 * these, but keeping this here makes
	 * the helper defensive.
	 */
	const unpaidPinnedPayments = pinnedPayments.filter(
		(payment) => !payment.is_paid,
	)

	const upcomingBills = unpaidPinnedPayments.reduce(
		(total, payment) => total + Number(payment.amount),
		0,
	)

	/*
	 * 6. DAILY SPENDING AVERAGE
	 *
	 * Only meaningful for current/past months.
	 */
	const averageDailySpend = currentDay > 0 ? totalSpent / currentDay : 0

	/*
	 * 7. BUILD CHART DATA
	 */
	let cumulativeSpent = 0

	const spendingPaceData = Array.from({ length: daysInMonth }, (_, index) => {
		const day = index + 1

		cumulativeSpent += spendingByDay[day] || 0

		/*
		 * Ideal budget pace.
		 *
		 * If monthly budget = 3100
		 * and month has 31 days:
		 *
		 * day 1  ≈ 100
		 * day 15 ≈ 1500
		 * day 31 = 3100
		 */
		const budgetPace =
			monthlyBudget > 0 ? (monthlyBudget / daysInMonth) * day : 0

		/*
		 * ACTUAL
		 *
		 * For current month:
		 * show actual spending only up to today.
		 *
		 * For past month:
		 * show entire month.
		 *
		 * For future month:
		 * no actual spending line.
		 */
		let actual = null

		if (isPastMonth) {
			actual = cumulativeSpent
		} else if (isCurrentMonth && day <= currentDay) {
			actual = cumulativeSpent
		}

		/*
		 * FORECAST
		 *
		 * Current month only.
		 *
		 * Starts from today and projects
		 * current average daily spending.
		 */
		let forecast = null

		if (isCurrentMonth && day >= currentDay) {
			forecast = totalSpent + averageDailySpend * (day - currentDay)
		}

		return {
			day,
			actual,
			budgetPace,
			forecast,
		}
	})

	/*
	 * 8. PROJECTED MONTH-END SPENDING
	 */
	let projectedSpending = totalSpent

	if (isCurrentMonth) {
		projectedSpending = averageDailySpend * daysInMonth
	}

	/*
	 * 9. SAFE TO SPEND PER DAY
	 */
	const remainingBudget = monthlyBudget - totalSpent

	const remainingDays = isCurrentMonth
		? Math.max(daysInMonth - currentDay, 0)
		: 0

	const safePerDay =
		remainingDays > 0 ? Math.max(remainingBudget / remainingDays, 0) : 0

	/*
	 * 10. PERIOD-END FORECAST
	 */
	const projectedRemaining = monthlyBudget - projectedSpending

	return {
		spendingPaceData,

		paceMetrics: {
			totalSpent,
			monthlyBudget,
			projectedSpending,
			safePerDay,
			upcomingBills,
			projectedRemaining,
		},

		meta: {
			year,
			month,
			daysInMonth,
			currentDay,
			isCurrentMonth,
			isPastMonth,
		},
	}
}
