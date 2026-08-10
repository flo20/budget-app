import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getLiabilities() {
	const { supabase, user } = await requireUser()

	const { data, error } = await supabase
		.from('liabilities')
		.select(
			`
                id,
                name,
                liability_type,
                current_balance,
                original_amount,
                monthly_payment,
                apr,
                created_at,
                updated_at
            `,
		)
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Unable to retrieve liabilities:', error)
		throw new Error('Unable to retrieve liabilities.')
	}

	return data ?? []
}
