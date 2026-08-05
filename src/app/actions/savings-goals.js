'use server'

import { revalidatePath } from 'next/cache'
import { requireUser } from '@/lib/auth/require-user'
import {
	SAVINGS_GOAL_CATEGORY_VALUES,
	CUSTOM_CATEGORY_OPTION,
	normalizeCategory,
} from '@/lib/constants/categories'

export async function createSavingsGoal(formData) {
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
		throw new Error('Enter a name for your savings goal.')
	}

	if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
		throw new Error('Enter a valid target amount.')
	}

	if (!Number.isFinite(savedAmount) || savedAmount < 0) {
		throw new Error('Enter a valid saved amount.')
	}

	if (!category) {
		throw new Error('Select or enter a category.')
	}

	if (category.length > 50) {
		throw new Error('Category must be 50 characters or fewer.')
	}

	if (!isCustomCategory && !SAVINGS_GOAL_CATEGORY_VALUES.includes(category)) {
		console.log({
			selectedCategory,
			category,
			isCustomCategory,
			allowedCategories: SAVINGS_GOAL_CATEGORY_VALUES,
		})

		throw new Error('Select a valid category.')
	}
	if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
		throw new Error('Enter a valid due date.')
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
		throw new Error('Unable to save the savings goal.')
	}

	revalidatePath('/dashboard')

    return {
			success: true,
			error: null,
		}
}
