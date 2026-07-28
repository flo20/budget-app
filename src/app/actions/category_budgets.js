'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import {
	EXPENSE_CATEGORIES,
	CUSTOM_CATEGORY_OPTION,
} from '@/lib/constants/categories'


export async function setBudgetAllocation(formData) {
	const { supabase, user } = await requireUser()

	const selectedCategory = formData.get('category')?.trim()
	const customCategory = formData.get('customCategory')?.trim()
	const monthlyLimit = Number(formData.get('monthlyLimit'))
	const budgetMonth = formData.get('budgetMonth')?.trim()

	/*
	 * If "__custom__" was selected, use the custom input.
	 * Otherwise, use the selected predefined category.
	 */
	const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION

	const category = isCustomCategory ? customCategory : selectedCategory

	// Make sure the user selected or entered a category.
	if (!category) {
		throw new Error('Select or enter an expense category.')
	}

	// A standard category must exist in the list
	if (!isCustomCategory && !EXPENSE_CATEGORIES.includes(category)) {
		throw new Error('Select a valid expense category.')
	}

	// Validate the custom category separately.
	if (isCustomCategory && customCategory.length > 50) {
		throw new Error('Custom category must be 50 characters or fewer.')
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		throw new Error('Enter a valid monthly limit.')
	}

	if (!budgetMonth || !/^\d{4}-\d{2}-01$/.test(budgetMonth)) {
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
}
