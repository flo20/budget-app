'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import { EXPENSE_CATEGORIES } from '@/lib/constants/transaction-categories'
import { normalizeCategory } from '@/lib/utils/category'

const normalizedExpenseCategories = EXPENSE_CATEGORIES.map(normalizeCategory)

export async function setBudgetAllocation(_previousState, formData) {
	const { supabase, user } = await requireUser()

	const selectedCategory = formData.get('category')?.trim()
	const monthlyLimit = Number(formData.get('monthlyLimit'))
	const budgetMonth = formData.get('allocationBudgetMonth')?.trim()
	const category = normalizeCategory(selectedCategory ?? '')

	// Make sure the user selected or entered a category.
	if (!category) {
		return {
			success: false,
			error: 'Select or enter an expense category.',
		}
	}

	if (!/^[\p{L}\p{N} &'/-]+$/u.test(category)) {
		return {
			success: false,
			error: 'Enter a valid category name.',
		}
	}

	// A standard category must exist in the list
	if (!normalizedExpenseCategories.includes(category)) {
		return {
			success: false,
			error: 'Select a valid expense category.',
		}
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		return {
			success: false,
			error: 'Enter a valid monthly limit.',
		}
	}

	if (monthlyLimit > 9999999999.99) {
		return {
			success: false,
			error: 'Monthly limit is too large.',
		}
	}

	/*
	 * Store the first day of the selected month.
	 */

	if (!budgetMonth || !/^\d{4}-(0[1-9]|1[0-2])-01$/.test(budgetMonth)) {
		return {
			success: false,
			error: 'Select a valid budget month.',
		}
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
		return {
			success: false,
			error: 'Unable to save the allocation.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function updateCategoryBudget(formData) {
	const { supabase, user } = await requireUser()

	const budgetId = formData.get('budgetId')
	const monthlyLimit = Number(formData.get('monthlyLimit'))

	if (!budgetId) {
		return {
			success: false,
			error: 'Budget allocation ID is required.',
		}
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		return {
			success: false,
			error: 'Enter a valid monthly limit.',
		}
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

export async function removeCategoryAllocation(budgetId) {
	const { supabase, user } = await requireUser()

	if (!budgetId) {
		return {
			success: false,
			error: 'Budget allocation ID is required.',
		}
	}

	const { data, error } = await supabase
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
