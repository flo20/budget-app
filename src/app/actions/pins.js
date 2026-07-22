'use server'

import { revalidatePath } from 'next/cache'
import { requireUser } from '@/lib/auth/require-user'

export async function createPinPayment (formData) {
    const {supabase, user} = await requireUser()
    

	// Names received from the form fields
	const label = formData.get('label')?.trim()
	const amount = Number(formData.get('amount'))
	const dueDate = formData.get('dueDate')
    const isRecurringMonthly = formData.has('isRecurringMonthly')


	if (!label) {
		throw new Error('A label is required.')
	}

	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error('Enter a valid amount.')
	}

    if (!dueDate) {
			throw new Error('Due date is required.')
		}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
		throw new Error('Enter a valid due date.')
	}

    const payment = {
			user_id: user.id,
			label,
			amount,
			due_date: dueDate,
			is_recurring_monthly: isRecurringMonthly,
		}

	    //Instructs the Supabase client to send an HTTP request to Supabase’s REST API.
        const { error } = await supabase.from('pinned_payments').insert(payment)
    
        if (error) {
            console.error('Unable to create pinned payment:', error)
            throw new Error('Unable to save the pinned payment.')
        }
    
        revalidatePath('/')
}
