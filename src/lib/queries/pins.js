import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getPinnedPayments() {
	const {supabase, user} = await requireUser()

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
		.eq('user_id', user.id)
		.eq('is_paid', false)
		.order('due_date', { ascending: true })

	if (error) {
		console.error('Unable to retrieve pinned paymentss:', error)
			throw new Error('Unable to retrieve pinned payments.')
	}

	return data ?? []
}
