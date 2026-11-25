'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import { normalizeCategory } from '@/lib/utils/category'

const MAX_MONTHLY_LIMIT = 9999999999.99

export async function setBudgetAllocation(_previousState, formData) {
	const { supabase, user } = await requireUser()

	const selectedCategory = String(formData.get('category') ?? '').trim()
	const monthlyLimit = Number(formData.get('monthlyLimit'))
	const budgetMonth = String(formData.get('allocationBudgetMonth') ?? '').trim()
	const category = normalizeCategory(selectedCategory)

	// Make sure the user selected or entered a category.
	if (!category) {
		return {
			success: false,
			error: 'Select an expense category.',
		}
	}

	// Validate monthly limit
	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		return {
			success: false,
			error: 'Enter a valid monthly limit.',
		}
	}

	if (monthlyLimit > MAX_MONTHLY_LIMIT) {
		return {
			success: false,
			error: 'Monthly limit is too large.',
		}
	}

	// Validate budget month
	if (!/^\d{4}-(0[1-9]|1[0-2])-01$/.test(budgetMonth)) {
		return {
			success: false,
			error: 'Select a valid budget month.',
		}
	}

	// Retrieve available expense categories
	const { data: expenseCategories, error: categoryError } = await supabase
		.from('categories')
		.select('name')
		.eq('type', 'expense')
		.eq('is_active', true)

	if (categoryError) {
		console.error('Category lookup error:', categoryError)

		return {
			success: false,
			error: 'Unable to validate category.',
		}
	}

	// Verify that the selected category exists
	const validCategory = expenseCategories.find(
		(item) => normalizeCategory(item.name) === category,
	)

	if (!validCategory) {
		return {
			success: false,
			error: 'Invalid expense category.',
		}
	}

	// Save budget allocation
	const { error } = await supabase.from('category_budgets').upsert(
		{
			user_id: user.id,
			category: normalizeCategory(validCategory.name),
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

	if (monthlyLimit > MAX_MONTHLY_LIMIT) {
		return {
			success: false,
			error: 'Monthly limit is too large.',
		}
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		return {
			success: false,
			error: 'Enter a valid monthly limit.',
		}
	}

	const { data, error } = await supabase
		.from('category_budgets')
		.update({
			monthly_limit: monthlyLimit,
			updated_at: new Date().toISOString(),
		})
		.eq('id', budgetId)
		.eq('user_id', user.id)
		.select('id')
		.maybeSingle()

	if (error) {
		console.error('Unable to update monthly limit:', error)
		return {
			success: false,
			error: 'Unable to update monthly limit.',
		}
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
