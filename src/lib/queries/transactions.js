import { createClient } from '../supabase/server'
import { redirect } from 'next/navigation'

export async function getTransactions() {
	const supabase = await createClient()

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (userError || !user) {
		redirect('/login')
	}

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
		.order('transaction_date', { ascending: false })
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Unable to retrieve transactions:', error)
		return []
	}

	return data ?? []
}
