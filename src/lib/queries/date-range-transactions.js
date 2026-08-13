'use server'

import { requireUser } from '../auth/require-user'

export async function getTransactionsByDateRange(startDate, endDate) {
	const { supabase, user } = await requireUser()

	const { data, error } = await supabase
		.from('transactions')
		.select(
			`
    id,
    amount,
    transaction_type,
    transaction_date
    `,
		)
		.eq('user_id', user.id)
		.gte('transaction_date', startDate)
		.lt('transaction_date', endDate)
		.order('transaction_date', {
			ascending: true,
		})

	if (error) {
		console.error('Unable to retrieve transactions by date range:', error)
		return []
	}

	return data ?? []
}
