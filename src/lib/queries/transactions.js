import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getTransactions() {
    const {supabase, user} = await requireUser()
    
	const { data, error } = await supabase
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
		.order('transaction_date', { ascending: false })
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Unable to retrieve transactions:', error)
		return []
	}

	return data ?? []
}
