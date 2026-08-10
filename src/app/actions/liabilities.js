'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import { LIABILITY_TYPE_VALUES } from '../../lib/constants/liability-types'
import { getOptionalNumber } from '@/lib/utils/number'

export async function createLiability(formData) {
	const { supabase, user } = await requireUser()

	// Names received from the form fields
	const liabilityName = formData.get('liabilityName')?.trim()
	const liabilityType = formData.get('liabilityType')?.trim()
	const currentBalance = Number(formData.get('currentBalance'))
	const originalAmount = getOptionalNumber(formData, 'originalAmount')
	const monthlyPayment = getOptionalNumber(formData, 'monthlyPayment')
	const apr = getOptionalNumber(formData,'apr')

	// Validate the required name.
	if (!liabilityName) {
		throw new Error('Enter a name for the liability.')
	}

	if (liabilityName.length > 100) {
		throw new Error('Liability name must be 100 characters or fewer.')
	}

	// Validate the selected liability type.
	if (!LIABILITY_TYPE_VALUES.includes(liabilityType)) {
		throw new Error('Select a valid liability type.')
	}

	// The current outstanding balance is required.
	if (!Number.isFinite(currentBalance) || currentBalance < 0) {
		throw new Error('Enter a valid balance owed.')
	}

	// The remaining fields are optional, but must be valid when provided.
	if (
		originalAmount !== null &&
		(!Number.isFinite(originalAmount) || originalAmount <= 0)
	) {
		throw new Error('Enter a valid original amount.')
	}

	if (
		monthlyPayment !== null &&
		(!Number.isFinite(monthlyPayment) || monthlyPayment <= 0)
	) {
		throw new Error('Enter a valid monthly payment.')
	}

	if (apr !== null && (!Number.isFinite(apr) || apr < 0 || apr > 100)) {
		throw new Error('APR must be between 0 and 100.')
	}

	// This check is appropriate only if balances cannot grow beyond their original amount in your product.
	if (originalAmount !== null && currentBalance > originalAmount) {
		throw new Error('The balance owed cannot exceed the original amount.')
	}

	const liability = {
		user_id: user.id,
		name: liabilityName,
		liability_type: liabilityType,
		current_balance: currentBalance,
        original_amount: originalAmount,
		monthly_payment: monthlyPayment,
		apr,	
	}

	//Instructs the Supabase client to send an HTTP request to Supabase’s REST API.
	const { error } = await supabase.from('liabilities').insert(liability)

	if (error) {
		console.error('Unable to create liability:', error)
		throw new Error('Unable to save the entry.')
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}
