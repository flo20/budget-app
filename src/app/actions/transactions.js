'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'

export async function createTransactions(_previousState, formData) {
	const { supabase, user } = await requireUser()

	// Names received from the form fields
	const source = formData.get('source')?.trim()
	const amount = Number(formData.get('amount'))
	const transactionType = formData.get('transactionType')
	const category = formData.get('category')?.trim()
	const expenseType = formData.get('expenseType') || null
	const transactionDate = formData.get('transactionDate')
	const notes = formData.get('notes')?.trim() || null

	//Server side validation
	if (!source) {
		return {
			success: false,
			error: 'A merchant or income source is required.',
		}
	}

	if (!Number.isFinite(amount) || amount <= 0) {
		return {
			success: false,
			error: 'Enter a valid amount.',
		}
	}

	if (!['income', 'expense'].includes(transactionType)) {
		return {
			success: false,
			error: 'Select income or expense.',
		}
	}

	if (!category) {
		return {
			success: false,
			error: 'Category is required.',
		}
	}

	if (
		transactionType === 'expense' &&
		!['fixed', 'variable'].includes(expenseType)
	) {
		return {
			success: false,
			error: 'Select a fixed or variable expense.',
		}
	}

	if (transactionDate && !/^\d{4}-\d{2}-\d{2}$/.test(transactionDate)) {
		return {
			success: false,
			error: 'Enter a valid transaction date.',
		}
	}

	const transaction = {
		user_id: user.id,
		source: source,
		amount,
		transaction_type: transactionType,
		category,
		expense_type: transactionType === 'expense' ? expenseType : null,
		notes: notes || null,
		/*
		 * Only send transaction_date when the input has a value.
		 * If it is empty, PostgreSQL should use its default current_date.
		 */
		...(transactionDate ? { transaction_date: transactionDate } : {}),
	}

	//Instructs the Supabase client to send an HTTP request to Supabase’s REST API.
	const { error } = await supabase.from('transactions').insert(transaction)

	if (error) {
		console.error('Unable to create transaction:', error)
		return {
			success: false,
			error: 'Unable to save the entry.',
		}
	}

	revalidatePath('/dashboard')
}
