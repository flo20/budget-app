import 'server-only'

import { createClient } from '../supabase/server'

export async function getPinnedPayments() {
	const  supabase  = await createClient()

	const { data, error } = await supabase
		.from('pinned_payments')
		.select(
			`
            id,
			label,
			amount,
			due_date,
			is_recurring_monthly,
			is_paid,
			paid_at,
			created_at
            `,
		)
		.eq('is_paid', false)
		.order('due_date', { ascending: true })

	if (error) {
		console.error('Unable to retrieve pinned paymentss:', error)
			throw new Error('Unable to retrieve pinned payments.')
	}

	return data ?? []
}
