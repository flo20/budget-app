import 'server-only'

import { requireUser } from '@/lib/auth/require-user'

export async function getCategories(type) {
	const { supabase } = await requireUser()

	let query = supabase
		.from('categories')
		.select('id, name, type, icon, is_default')
		.eq('is_active', true)
		.order('is_default', { ascending: false })
		.order('name', { ascending: true })

	if (type) {
		query = query.eq('type', type)
	}

	const { data, error } = await query

	if (error) {
		console.error('Error fetching categories:', error)
		throw new Error('Unable to fetch categories.')
	}

	return data ?? []
}
