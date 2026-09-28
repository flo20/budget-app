'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import { isValidBudgetMonth } from '@/lib/utils/month'

export async function createBudgetNotes(formData) {
	const { supabase, user } = await requireUser()

	const content = formData.get('content')?.trim()
	const budgetMonth = formData.get('notebudgetMonth')

	if (!content) {
		return {
			success: false,
			error: 'Enter a note.',
		}
	}

	if (content.length > 280) {
		return {
			success: false,
			error: 'Budget notes cannot exceed 280 characters.',
		}
	}

	if (!isValidBudgetMonth(budgetMonth)) {
		return {
			success: false,
			error: 'Invalid budget month.',
		}
	}

	const { error } = await supabase.from('budget_notes').insert({
		user_id: user.id,
		content,
		budget_month: budgetMonth,
	})

	if (error) {
		console.error('Unable to create budget note:', error)

		return {
			success: false,
			error: 'Unable to save the note.',
		}
	}

	revalidatePath('/dashboard')
}

export async function toggleBudgetNote(formData) {
	const { supabase } = await requireUser()

	const noteId = formData.get('noteId')
	const budgetMonth = formData.get('notebudgetMonth')
	const resolved = formData.get('resolved') === 'true'

	if (!noteId) {
		throw new Error('Note ID is required.')
	}

	if (!isValidBudgetMonth(budgetMonth)) {
		throw new Error('Invalid budget month.')
	}

	const { error } = await supabase
		.from('budget_notes')
		.update({
			is_resolved: resolved,
			resolved_at: resolved ? new Date().toISOString() : null,
		})
		.eq('id', noteId)

	if (error) {
		console.error('Unable to update budget note:', error)
		return {
			success: false,
			error: 'Unable to update the note.',
		}
	}

	revalidatePath('/dashboard')
}

export async function editBudgetNote(formData) {
	const { supabase } = await requireUser()

	const noteId = formData.get('noteId')
	const content = formData.get('content')?.trim()

	if (!noteId) {
		return {
			success: false,
			error: 'Note ID is required.',
		}
	}

	if (!content) {
		return {
			success: false,
			error: 'Note cannot be empty.',
		}
	}

	if (content.length > 280) {
		return {
			success: false,
			error: 'Budget notes cannot exceed 280 characters.',
		}
	}

	const { error } = await supabase
		.from('budget_notes')
		.update({
			content,
		})
		.eq('id', noteId)

	if (error) {
		console.error('Unable to edit budget note:', error)

		return {
			success: false,
			error: 'Unable to edit the note.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function deleteBudgetNote(formData) {
	const { supabase } = await requireUser()

	const noteId = formData.get('noteId')
	const budgetMonth = formData.get('notebudgetMonth')

	if (!noteId) {
		return {
			success: false,
			error: 'Note ID is required.',
		}
	}

	if (!isValidBudgetMonth(budgetMonth)) {
		return {
			success: false,
			error: 'Note ID is required.',
		}
	}

	const { error } = await supabase
		.from('budget_notes')
		.delete()
		.eq('id', noteId)

	if (error) {
		console.error('Unable to delete budget note:', error)
		return {
			success: false,
			error: 'Unable to delete the note.',
		}
	}

	revalidatePath('/dashboard')
}
