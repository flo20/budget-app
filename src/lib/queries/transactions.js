import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getTransactions(budgetMonth) {
	const { supabase, user } = await requireUser()

	let query = supabase
		.from('transactions')
		.select(
			`
				id,
				source,
				amount,
				transaction_type,
				category,
				expense_type,
				transaction_date,
				notes,
				created_at
			`,
		)
		.eq('user_id', user.id)

	if (budgetMonth) {
		const startDate = new Date(`${budgetMonth}T00:00:00`)
		const endDate = new Date(
			startDate.getFullYear(),
			startDate.getMonth() + 1,
			1,
		)

		const nextMonth = [
			endDate.getFullYear(),
			String(endDate.getMonth() + 1).padStart(2, '0'),
			'01',
		].join('-')

		query = query
			.gte('transaction_date', budgetMonth)
			.lt('transaction_date', nextMonth)
	}

	const { data, error } = await query
		.order('transaction_date', { ascending: false })
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Unable to retrieve transactions:', error)
		return []
	}

	return data ?? []
}
