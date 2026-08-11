'use server'

import { requireUser } from '../auth/require-user'

export async function getChartData(budgetMonth) {
	const { supabase, user } = await requireUser()

	const [year, month] = budgetMonth.split('-').map(Number)

	const nextMonth =
		month === 12
			? `${year + 1}-01-01`
			: `${year}-${String(month + 1).padStart(2, '0')}-01`

	const today = new Date().toISOString().split('T')[0]

	const isCurrentMonth = today.slice(0, 7) === budgetMonth.slice(0, 7)

	const pinnedPaymentStartDate = isCurrentMonth ? today : budgetMonth

	const [transactionsResponse, budgetsResponse, paymentsResponse] =
		await Promise.all([
			supabase
				.from('transactions')
				.select(
					`
        id,
        amount,
        transaction_type,
        transaction_date,
        category,
        expense_type
        `,
				)
				.eq('user_id', user.id)
				.gte('transaction_date', budgetMonth)
				.lt('transaction_date', nextMonth)
				.order('transaction_date', { ascending: true }),

			supabase
				.from('category_budgets')
				.select(
					`
        id,
        category,
        monthly_limit,
        budget_month
        `,
				)
				.eq('user_id', user.id)
				.eq('budget_month', budgetMonth),

			supabase
				.from('pinned_payments')
				.select(
					`
        id,
        label,
        amount,
        due_date,
        is_paid,
        is_recurring_monthly
        `,
				)
				.eq('user_id', user.id)
				.eq('is_paid', false)
				.gte('due_date', pinnedPaymentStartDate)
				.lt('due_date', nextMonth)
				.order('due_date', { ascending: true }),
		])

	if (transactionsResponse.error) {
		throw new Error(transactionsResponse.error.message)
	}

	if (budgetsResponse.error) {
		throw new Error(budgetsResponse.error.message)
	}

	if (paymentsResponse.error) {
		throw new Error(paymentsResponse.error.message)
	}

	return {
		transactions: transactionsResponse.data ?? [],

		categoryBudgets: budgetsResponse.data ?? [],

		pinnedPayments: paymentsResponse.data ?? [],
	}
}
