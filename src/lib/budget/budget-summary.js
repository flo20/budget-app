export function buildBudgetSummary(budgets, transactions) {
	const spendingByCategory = transactions.reduce((totals, transaction) => {
		const category = transaction.category
		const amount = Number(transaction.amount)

		if (!category || !Number.isFinite(amount)) {
			return totals
		}

		const currentCategoryTotal =
			totals[category] === undefined ? 0 : totals[category]
		const newCategoryTotal = currentCategoryTotal + amount

		totals[category] = newCategoryTotal

		return totals
	}, {})

	const allocatedCategoryNames = new Set(
		budgets.map((budget) => budget.category),
	)

	const categories = budgets.map((budget) => {
		const limit = Number(budget.monthly_limit)
		const spent = spendingByCategory[budget.category] ?? 0
		const remaining = limit - spent
		const percentageUsed = limit > 0 ? (spent / limit) * 100 : 0

		return {
			id: budget.id,
			category: budget.category,
			limit,
			spent,
			remaining,
			percentageUsed,
			progressWidth: Math.min(percentageUsed, 100),
			status: getBudgetStatus(percentageUsed),
		}
	})

	const unallocatedCategories = Object.entries(spendingByCategory)
		.filter(([category]) => !allocatedCategoryNames.has(category))
		.map(([category, spent]) => ({
			category,
			spent,
		}))
		.sort((first, second) => second.spent - first.spent)

	const totalAllocated = categories.reduce(
		(total, category) => total + category.limit,
		0,
	)
	const spentInAllocatedCategories = categories.reduce(
		(total, category) => total + category.spent,
		0,
	)

	const remainingAllocatedBudget = totalAllocated - spentInAllocatedCategories

	const totalUnallocatedSpend = unallocatedCategories.reduce(
		(total, category) => total + category.spent,
		0,
	)

	const totalSpend = spentInAllocatedCategories + totalUnallocatedSpend

	const overallPercentage =
		totalAllocated > 0 ? (spentInAllocatedCategories / totalAllocated) * 100 : 0

	return {
		categories,
		unallocatedCategories,
		totalAllocated,
		spentInAllocatedCategories,
		remainingAllocatedBudget,
		totalUnallocatedSpend,
		totalSpend,
		overallPercentage,
		overallProgressWidth: Math.min(overallPercentage, 100),
	}

	function getBudgetStatus(percentage) {
		if (percentage > 100) {
			return 'over'
		}

		if (percentage === 100) {
			return 'full'
		}

		if (percentage >= 80) {
			return 'warning'
		}

		return 'healthy'
	}
}
