import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getSavingsGoals() {
	const { supabase, user } = await requireUser()

	const { data, error } = await supabase
		.from('savings_goals')
		.select(
			`
                id,
                name,
                target_amount,
                saved_amount,
                category,
                due_date,
                status,
                completed_at
            `,
		)
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Unable to retrieve savings goals:', error)
		throw new Error('Unable to retrieve savings goals.')
	}

	return data ?? []
}
