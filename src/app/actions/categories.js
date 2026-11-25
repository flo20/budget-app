'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'

export async function createCategory(_previousState, formData) {
	const { supabase, user } = await requireUser()

    //Names received from the form field
	const name = String(formData.get('name') ?? '').trim()
	const type = String(formData.get('type') ?? '')

	// Validate category name
	if (!name || name.length > 50) {
		return {
			success: false,
			error: 'Enter a category name between 1 and 50 characters.',
			category: null,
		}
	}

	// Prevent the use of reserved category names
	if (['other', '__create__'].includes(name.toLowerCase())) {
		return {
			success: false,
			error: 'This category name is reserved.',
			category: null,
		}
	}

	// Validate category type
	if (!['income', 'expense'].includes(type)) {
		return {
			success: false,
			error: 'Invalid category type.',
			category: null,
		}
	}

	// Check for existing categories
	const { data: existingCategories, error: lookupError } = await supabase
		.from('categories')
		.select('name')
		.eq('type', type)

	if (lookupError) {
		console.error('Category lookup error:', lookupError)

		return {
			success: false,
			error: 'Unable to validate category.',
			category: null,
		}
	}

	const alreadyExists = existingCategories.some(
		(category) => category.name.trim().toLowerCase() === name.toLowerCase(),
	)

	if (alreadyExists) {
		return {
			success: false,
			error: 'This category already exists.',
			category: null,
		}
	}

	// Create the category
	const { data, error } = await supabase
		.from('categories')
		.insert({
			user_id: user.id,
			name,
			type,
			icon: 'tag',
			is_default: false,
			is_active: true,
		})
		.select('id, name, type, icon, is_default, is_active')
		.single()

	if (error) {
		console.error('Category creation error:', error)

		return {
			success: false,
			error:
				error.code === '23505'
					? 'This category already exists.'
					: 'Unable to create category.',
			category: null,
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
		category: data,
	}
}
