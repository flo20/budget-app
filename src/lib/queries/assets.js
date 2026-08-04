import 'server-only'

import { requireUser } from '../auth/require-user'

export async function getAssets() {
	const { supabase, user } = await requireUser()

	const { data, error } = await supabase
		.from('assets')
		.select(
			`
                id,
                name,
                asset_type,
                current_value,
                notes,
                created_at,
                updated_at
            `,
		)
        .eq('user_id', user.id)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Unable to retrieve assets:', error)
		throw new Error('Unable to retrieve assets.')
	}

	return data ?? []
}
