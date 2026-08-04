import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getBudgetNotes(budgetMonth) {
	const { supabase, user } = await requireUser()

	const { data, error } = await supabase
		.from('budget_notes')
		.select(
			`
			id,
			content,
			budget_month,
			is_resolved,
			resolved_at,
			created_at
		`,
		)
		.eq('user_id', user.id)
		.eq('budget_month', budgetMonth)
		.order('created_at', {
			ascending: false,
		})

	if (error) {
		console.error('Unable to retrieve budget notes:', error)

		throw new Error('Unable to retrieve budget notes.')
	}

	return data ?? []
}
