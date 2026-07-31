'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import {
	EXPENSE_CATEGORIES,
	CUSTOM_CATEGORY_OPTION,
	normalizeCategory,
} from '@/lib/constants/categories'

const normalizedExpenseCategories = EXPENSE_CATEGORIES.map(normalizeCategory)

export async function setBudgetAllocation(formData) {
	const { supabase, user } = await requireUser()

	const selectedCategory = formData.get('category')?.trim()
	const customCategory = formData.get('customCategory')?.trim()
	const monthlyLimit = Number(formData.get('monthlyLimit'))
	const budgetMonth = formData.get('budgetMonth')?.trim()
	const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION
	/*
	 * If "__custom__" was selected, use the custom input.
	 * Otherwise, use the selected predefined category.
	 */

	const rawCategory =
		selectedCategory === CUSTOM_CATEGORY_OPTION
			? customCategory
			: selectedCategory

	const category = normalizeCategory(rawCategory ?? '')

	// Make sure the user selected or entered a category.
	if (!category) {
		throw new Error('Select or enter an expense category.')
	}

	if (!/^[\p{L}\p{N} &'/-]+$/u.test(category)) {
		throw new Error('Enter a valid category name.')
	}

	// A standard category must exist in the list
	if (!isCustomCategory && !normalizedExpenseCategories.includes(category)) {
		throw new Error('Select a valid expense category.')
	}
	// Validate the custom category separately.
	if (isCustomCategory && customCategory.length > 50) {
		throw new Error('Custom category must be 50 characters or fewer.')
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		throw new Error('Enter a valid monthly limit.')
	}

	if (monthlyLimit > 9999999999.99) {
		throw new Error('Monthly limit is too large.')
	}

	/*
	 * Store the first day of the selected month.
	 */

	if (!budgetMonth || !/^\d{4}-(0[1-9]|1[0-2])-01$/.test(budgetMonth)) {
		throw new Error('Select a valid budget month.')
	}

	const { error } = await supabase.from('category_budgets').upsert(
		{
			user_id: user.id,
			category,
			monthly_limit: monthlyLimit,
			budget_month: budgetMonth,
			updated_at: new Date().toISOString(),
		},
		{
			onConflict: 'user_id,category,budget_month',
		},
	)

	if (error) {
		console.error('Unable to save category allocation:', error)
		throw new Error('Unable to save the allocation.')
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		message: 'Budget allocation saved.',
	}
}

export async function updateCategoryBudget(formData) {
	const { supabase, user } = await requireUser()

	const budgetId = formData.get('budgetId')
	const monthlyLimit = Number(formData.get('monthlyLimit'))

	if (!budgetId) {
		throw new Error('Budget allocation ID is required.')
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		throw new Error('Enter a valid monthly limit.')
	}

	const { error } = await supabase
		.from('category_budgets')
		.update({
			monthly_limit: monthlyLimit,
			updated_at: new Date().toISOString(),
		})
		.eq('id', budgetId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to update monthly limit:', error)

		return {
			success: false,
			error: 'Unable to update monthly limit.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function deleteCategoryBudget(budgetId) {
	const { supabase, user } = await requireUser()

	if (!budgetId) {
		throw new Error('Budget allocation ID is required.')
	}

	const { error } = await supabase
		.from('category_budgets')
		.delete()
		.eq('id', budgetId)
		.eq('user_id', user.id)
		.select('id')
        .maybeSingle()

	if (error) {
		console.error('Unable to delete allocation:', error)
		return { success: false, error: 'Unable to delete the allocation.' }
	}

    if (!data) {
			return {
				success: false,
				error: 'Budget allocation was not found.',
			}
		}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}
