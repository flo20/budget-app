'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTransactions(formData) {
	const supabase = await createClient()

	//User who submitted form
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (userError || !user) {
		redirect('/signup')
	}

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
		throw new Error('A merchant or income source is required.')
	}

	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error('Enter a valid amount.')
	}

	if (!['income', 'expense'].includes(transactionType)) {
		throw new Error('Select income or expense.')
	}

	if (!category) {
		throw new Error('Category is required.')
	}

	if (
		transactionType === 'expense' &&
		!['fixed', 'variable'].includes(expenseType)
	) {
		throw new Error('Select a fixed or variable expense.')
	}


    if (transactionDate && !/^\d{4}-\d{2}-\d{2}$/.test(transactionDate)) {
			throw new Error('Enter a valid transaction date.')
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



	const { error } = await supabase.from('transactions').insert(transaction)

	if (error) {
		console.error('Unable to create transaction:', error)
		throw new Error('Unable to save the entry.')
	}

	revalidatePath('/')
}
