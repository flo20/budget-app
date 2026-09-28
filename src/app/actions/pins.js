'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'

export async function createPinPayment(_previousState, formData) {
	const { supabase, user } = await requireUser()

	// Names received from the form fields
	const label = formData.get('label')?.trim()
	const amount = Number(formData.get('amount'))
	const dueDate = formData.get('dueDate')
	const isRecurringMonthly = formData.has('isRecurringMonthly')

	if (!label) {
		return {
			success: false,
			error: 'A label is required.',
		}
	}

	if (!Number.isFinite(amount) || amount <= 0) {
		return {
			success: false,
			error: 'Enter a valid amount.',
		}
	}

	if (!dueDate) {
		return {
			success: false,
			error: 'Due date is required.',
		}
	}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
		return {
			success: false,
			error: 'Enter a valid due date.',
		}
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
		return {
			success: false,
			error: 'Unable to save the pinned payment.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function markPinnedPaymentPaid(_previousState, formData) {
	const { supabase, user } = await requireUser()

	const paymentId = formData.get('paymentId')

	if (!paymentId) {
		return {
			success: false,
			error: 'Payment ID is required.',
		}
	}

	const { error } = await supabase
		.from('pinned_payments')
		.update({
			is_paid: true,
			paid_at: new Date().toISOString(),
		})
		.eq('id', paymentId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to mark pinned payment as paid:', error)
		return {
			success: false,
			error: 'Unable to update the pinned payment.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function undoPinnedPaymentPaid(_previousState, formData) {
	const { supabase, user } = await requireUser()

	const paymentId = formData.get('paymentId')

	if (!paymentId) {
		return {
			success: false,
			error: 'Payment ID is required.',
		}
	}

	const { error } = await supabase
		.from('pinned_payments')
		.update({
			is_paid: false,
			paid_at: null,
		})
		.eq('id', paymentId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to undo pinned payment:', error)
		return {
			success: false,
			error: 'Unable to update the pinned payment.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function deletePinnedPayment(_previousState, formData) {
	const { supabase, user } = await requireUser()

	const paymentId = formData.get('paymentId')

	if (!paymentId) {
		return {
			success: false,
			error: 'Payment ID is required.',
		}
	}

	const { error } = await supabase
		.from('pinned_payments')
		.delete()
		.eq('id', paymentId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to delete pinned payment:', error)
		return {
			success: false,
			error: 'Unable to delete the pinned payment.',
		}
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}
