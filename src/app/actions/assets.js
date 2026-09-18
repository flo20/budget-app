'use server'

import { requireUser } from '@/lib/auth/require-user'
import { revalidatePath } from 'next/cache'
import { ASSET_TYPES } from '@/lib/constants/asset-allocation'

export async function createAsset(formData) {
	const { supabase, user } = await requireUser()

	// Names received from the form fields
	const assetName = formData.get('assetName')?.trim()
	const assetType = formData.get('assetType')?.trim()
	const currentValue = Number(formData.get('currentValue'))
	const notes = formData.get('notes')?.trim() || null

	//Server side validation
	if (!assetName) {
		throw new Error('Asset name is required.')
	}

	if (assetName.length > 100) {
		throw new Error('Asset name must be 100 characters or fewer.')
	}

	if (!assetType || !ASSET_TYPES.includes(assetType)) {
		throw new Error('Select a valid asset type.')
	}

	if (!Number.isFinite(currentValue) || currentValue < 0) {
		throw new Error('Enter a valid asset value.')
	}

	if (currentValue > 999999999999.99) {
		throw new Error('Asset value is too large.')
	}

	// Validate the optional notes.
	if (notes && notes.length > 500) {
		throw new Error('Notes must be 500 characters or fewer.')
	}

	const asset = {
		user_id: user.id,
		name: assetName,
		asset_type: assetType,
		current_value: currentValue,
		notes,
	}

	//Instructs the Supabase client to send an HTTP request to Supabase’s REST API.
	const { error } = await supabase.from('assets').insert(asset)

	if (error) {
		console.error('Unable to create asset:', error)
		throw new Error('Unable to save the entry.')
	}

	revalidatePath('/dashboard')

	return {
		success: true,
		error: null,
	}
}

export async function updateAsset(formData) {
	const { supabase, user } = await requireUser()

	const assetId = formData.get('assetId')
	const assetName = formData.get('assetName')?.trim()
	const assetType = formData.get('assetType')?.trim()
	const currentValue = Number(formData.get('currentValue'))

	if (!assetId) {
		throw new Error('Asset ID is required.')
	}

	if (!assetName) {
		throw new Error('Asset name is required.')
	}

	if (assetName.length > 100) {
		throw new Error('Asset name must be 100 characters or fewer.')
	}

	if (!assetType || !ASSET_TYPES.includes(assetType)) {
		throw new Error('Select a valid asset type.')
	}

	if (!Number.isFinite(currentValue) || currentValue < 0) {
		throw new Error('Enter a valid asset value.')
	}

	if (currentValue > 999999999999.99) {
		throw new Error('Asset value is too large.')
	}

	const { error } = await supabase
		.from('assets')
		.update({
			name: assetName,
			asset_type: assetType,
			current_value: currentValue,
			updated_at: new Date().toISOString(),
		})
		.eq('id', assetId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to update asset:', error)
		throw new Error('Unable to update asset.')
	}

	revalidatePath('/dashboard')
}

export async function deleteAsset(formData) {
	const { supabase, user } = await requireUser()

	const assetId = formData.get('assetId')

	if (!assetId) {
		throw new Error('Asset ID is required.')
	}

	const { error } = await supabase
		.from('assets')
		.delete()
		.eq('id', assetId)
		.eq('user_id', user.id)

	if (error) {
		console.error('Unable to delete asset:', error)
		throw new Error('Unable to delete asset.')
	}

	revalidatePath('/dashboard')
}