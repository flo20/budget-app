'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'

export async function createPinPayment(formData) {
	const { supabase, user } = await requireUser()

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

	revalidatePath('/dashboard')
}

export async function markPinnedPaymentPaid(formData) {
	const { supabase, user } = await requireUser()

	const paymentId = formData.get('paymentId')

	if (!paymentId) {
		throw new Error('Payment ID is required.')
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
		throw new Error('Unable to update the pinned payment.')
	}

	revalidatePath('/dashboard')
}

export async function undoPinnedPaymentPaid(formData) {
	const { supabase, user } = await requireUser()

	const paymentId = formData.get('paymentId')

	if (!paymentId) {
		throw new Error('Payment ID is required.')
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
		throw new Error('Unable to update the pinned payment.')
	}

	revalidatePath('/dashboard')
}

export async function deletePinnedPayment(formData) {
	const { supabase, user } = await requireUser()

	const paymentId = formData.get('paymentId')

	if (!paymentId) {
		throw new Error('Payment ID is required.')
	}

	const { error } = await supabase
		.from('pinned_payments')
		.delete()
		.eq('id', paymentId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to delete pinned payment:', error)
		throw new Error('Unable to delete the pinned payment.')
	}

	revalidatePath('/dashboard')
}