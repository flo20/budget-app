'use client'

import { useActionState, useEffect } from 'react'

import { createCategory } from '@/app/actions/categories'

import {
	Form,
	FormHeader,
	FormField,
	FormInput,
	FormActions,
	FormButton,
	FormError,
} from '@/components/Form'

const initialState = {
	success: false,
	error: null,
	category: null,
}

export default function CreateCategoryForm({ type, onCreated, onCancel }) {
	const [state, formAction, isPending] = useActionState(
		createCategory,
		initialState,
	)

	useEffect(() => {
		if (state.success && state.category) {
			onCreated(state.category)
		}
	}, [state, onCreated])

	return (
		<Form action={formAction}>
			<FormHeader
				title="Create Category"
				description={`Create a custom ${type} category`}
				onClose={onCancel}
			/>

			<input
				type="hidden"
				name="type"
				value={type}
			/>

			<FormField
				label="Category name"
				htmlFor="categoryName">
				<FormInput
					id="categoryName"
					name="name"
					type="text"
					placeholder={
						type === 'expense' ? 'e.g. Childcare' : 'e.g. Rental Income'
					}
					maxLength={50}
					autoFocus
					required
				/>
			</FormField>

			<FormError error={state.error} />

			<FormActions>
				<FormButton
					type="button"
					variant="secondary"
					onClick={onCancel}
					disabled={isPending}>
					Cancel
				</FormButton>

				<FormButton
					type="submit"
					disabled={isPending}>
					{isPending ? 'Creating...' : 'Create Category'}
				</FormButton>
			</FormActions>
		</Form>
	)
}
