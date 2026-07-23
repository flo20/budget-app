"use server"

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'

function isValidBudgetMonth(value) {
	return /^\d{4}-(0[1-9]|1[0-2])-01$/.test(value)
}

export async function createBudgetNotes(formData) {
	const { supabase, user } = await requireUser()

	const content = formData.get('content')?.trim()
	const budgetMonth = formData.get('budgetMonth')

	if (!content) {
		throw new Error('Enter a note.')
	}

	if (content.length > 280) {
		throw new Error('Budget notes cannot exceed 280 characters.')
	}

	if (!isValidBudgetMonth(budgetMonth)) {
		throw new Error('Invalid budget month.')
	}

	const { error } = await supabase.from('budget_notes').insert({
		user_id: user.id,
		content,
		budget_month: budgetMonth,
	})

	if (error) {
		console.error('Unable to create budget note:', error)

		throw new Error('Unable to save the note.')
	}

	revalidatePath('/')
}
