import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getBudgetAllocations(budgetMonth) {
	const { supabase, user } = await requireUser()

	if (!/^\d{4}-\d{2}-01$/.test(budgetMonth)) {
		throw new Error('A valid budget month is required.')
	}

	const startDate = budgetMonth

	const start = new Date(`${budgetMonth}T00:00:00`)
	start.setUTCMonth(start.getUTCMonth() + 1)

	const nextMonth = start.toISOString().slice(0, 10)

	const [budgetsResult, transactionsResult] = await Promise.all([
		supabase
			.from('category_budgets')
			.select('id, category, monthly_limit, budget_month')
			.eq('user_id', user.id)
			.eq('budget_month', budgetMonth)
			.order('created_at', { ascending: true }),

		supabase
			.from('transactions')
			.select('id, category, amount, transaction_type, transaction_date')
			.eq('user_id', user.id)
			.eq('transaction_type', 'expense')
			.gte('transaction_date', startDate)
			.lt('transaction_date', nextMonth),
	])

	if (budgetsResult.error) {
		console.error('Unable to retrieve allocations:', budgetsResult.error)
		throw new Error('Unable to retrieve budget allocations.')
	}

	if (transactionsResult.error) {
		console.error(
			'Unable to retrieve monthly transactions:',
			transactionsResult.error,
		)

		throw new Error('Unable to retrieve monthly spending.')
	}

	return {
		budgets: budgetsResult.data ?? [],
		transactions: transactionsResult.data ?? [],
	}
}

