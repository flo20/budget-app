'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import { EXPENSE_CATEGORIES } from '@/lib/constants/categories'

export async function setBudgetAllocation(formData) {
	const { supabase, user } = await requireUser()

	const category = formData.get('category')?.trim()
	const budgetMonth = formData.get('budgetMonth')
	const monthlyLimit = formData.get('monthlyLimit')

	const selectedCategory = formData.get('category')?.trim()
	const customCategory = formData.get('customCategory')?.trim()

	if (!EXPENSE_CATEGORIES.includes(category)) {
		throw new Error('Select a valid expense category.')
	}

	if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
		throw new Error('Enter a valid monthly limit.')
	}

	if (!/^\d{4}-\d{2}-01$/.test(budgetMonth)) {
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
