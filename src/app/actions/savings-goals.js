'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import {
	SAVINGS_GOAL_CATEGORY_VALUES,
	CUSTOM_CATEGORY_OPTION,
} from '../../lib/constants/saving-goals'
import { normalizeCategory } from '@/lib/utils/category'

export async function createSavingsGoal(_previousState, formData) {
	const { supabase, user } = await requireUser()

	// Names received from the form fields
	const name = formData.get('name')?.trim()
	const targetAmount = Number(formData.get('targetAmount'))
	const savedAmount = Number(formData.get('savedAmount') || 0)
	const selectedCategory = formData.get('category')?.trim()
	const customCategory = formData.get('customCategory')?.trim()
	const dueDate = formData.get('dueDate') || null

	const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION

	const category = isCustomCategory
		? normalizeCategory(customCategory ?? '')
		: selectedCategory

	//Server side validation
	if (!name) {
		return {
			success: false,
			error: 'Enter a name for your savings goal.',
		}
	}

	if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
		return {
			success: false,
			error: 'Enter a valid target amount.',
		}
	}

	if (!Number.isFinite(savedAmount) || savedAmount < 0) {
		return {
			success: false,
			error: 'Enter a valid saved amount.',
		}
	}

	if (!category) {
		return {
			success: false,
			error: 'Select or enter a category.',
		}
	}

	if (category.length > 50) {
		return {
			success: false,
			error: 'Category must be 50 characters or fewer.',
		}
	}

	if (!isCustomCategory && !SAVINGS_GOAL_CATEGORY_VALUES.includes(category)) {
		return {
			success: false,
			error: 'Select a valid category.',
		}
	}
	if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
		return {
			success: false,
			error: 'Enter a valid due date.',
		}
	}

	const isCompleted = savedAmount >= targetAmount

	const goal = {
		user_id: user.id,
		name,
		target_amount: targetAmount,
		saved_amount: savedAmount,
		category,
		due_date: dueDate,
		status: isCompleted ? 'completed' : 'active',
		completed_at: isCompleted ? new Date().toISOString() : null,
	}

	const { error } = await supabase.from('savings_goals').insert(goal)

	if (error) {
		console.error('Unable to create savings goal:', error)
		return {
			success: false,
			error: 'Unable to save the savings goal.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function contributeToSavingsGoal(formData) {
	const { supabase, user } = await requireUser()

	const goalId = formData.get('goalId')
	const contributionAmount = Number(formData.get('amount'))

	if (!goalId) {
		return {
			success: false,
			error: 'Savings goal ID is required.',
		}
	}

	if (!Number.isFinite(contributionAmount) || contributionAmount <= 0) {
		return {
			success: false,
			error: 'Enter a valid contribution amount.',
		}
	}

	const { data: goal, error: goalError } = await supabase
		.from('savings_goals')
		.select('id, saved_amount, target_amount, status')
		.eq('id', goalId)
		.eq('user_id', user.id)
		.single()

	if (goalError || !goal) {
		console.error('Unable to retrieve savings goal:', goalError)
		return {
			success: false,
			error: 'Savings goal could not be found.',
		}
	}

	if (goal.status !== 'active') {
		return {
			success: false,
			error: 'You can only contribute to an active goal.',
		}
	}

	const currentSavedAmount = Number(goal.saved_amount)
	const targetAmount = Number(goal.target_amount)

	const newSavedAmount = currentSavedAmount + contributionAmount

	const isCompleted = newSavedAmount >= targetAmount

	const { error: updateError } = await supabase
		.from('savings_goals')
		.update({
			saved_amount: newSavedAmount,
			status: isCompleted ? 'completed' : 'active',
			completed_at: isCompleted ? new Date().toISOString() : null,
			updated_at: new Date().toISOString(),
		})
		.eq('id', goalId)
		.eq('user_id', user.id)

	if (updateError) {
		console.error('Unable to update savings goal:', updateError)

		return {
			success: false,
			error: 'Unable to add the contribution.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function archiveSavingsGoal(goalId) {
	const { supabase, user } = await requireUser()

	if (!goalId) {
		return {
			success: false,
			error: 'Savings goal ID is required.',
		}
	}

	const { data, error } = await supabase
		.from('savings_goals')
		.update({
			status: 'archived',
			updated_at: new Date().toISOString(),
		})
		.eq('id', goalId)
		.eq('user_id', user.id)
		.eq('status', 'completed')
		.select('id')
		.maybeSingle()

	if (error) {
		console.error('Unable to archive savings goal:', error)

		return {
			success: false,
			error: 'Unable to archive the savings goal.',
		}
	}

	if (!data) {
		return {
			success: false,
			error: 'Completed savings goal was not found.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function deleteSavedGoal(goalId) {
	const { supabase, user } = await requireUser()

	if (!goalId) {
		return {
			success: false,
			error: 'Saved goal ID is required.',
		}
	}

	const { data, error } = await supabase
		.from('savings_goals')
		.delete()
		.eq('id', goalId)
		.eq('user_id', user.id)
		.select('id')
		.maybeSingle()

	if (error) {
		console.error('Unable to delete goal:', error)
		return { success: false, error: 'Unable to delete the saved goal.' }
	}

	if (!data) {
		return {
			success: false,
			error: 'Saved goal was not found.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}
