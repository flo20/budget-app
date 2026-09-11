'use client'

import { useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import { updateCategoryBudget } from '@/app/actions/budget-allocations'

import styles from './BudgetAllocation.module.scss'

export default function EditCategoryBudgetLimit({ category }) {
	const [isEditing, setIsEditing] = useState(false)
	const [draft, setDraft] = useState(category.limit)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState(null)

	function cancelEditing() {
		setDraft(category.limit)
		setError(null)
		setIsEditing(false)
	}

	async function handleEdit(event) {
		event.preventDefault()

		if (!draft) {
			setError('Monthly limit cannot be empty.')
			return
		}

		setIsSaving(true)
		setError(null)

		const formData = new FormData()

		formData.set('budgetId', category.id)
		formData.set('monthlyLimit', draft)

		const result = await updateCategoryBudget(formData)

		setIsSaving(false)

		if (!result.success) {
			setError(result.error)
			return
		}

		setIsEditing(false)
	}

	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			cancelEditing()
		}
	}

	if (isEditing) {
		return (
			<form
				onSubmit={handleEdit}
				className={styles.editForm}>
				<input
					id={category.id}
					name="monthlyLimit"
					type="number"
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={handleKeyDown}
					min="0.01"
					step="0.01"
					disabled={isSaving}
					required
					autoFocus
				/>

				<button
					type="submit"
					disabled={isSaving}
					aria-label="Save monthly limit">
					<Check />
				</button>

				<button
					type="button"
					onClick={cancelEditing}
					disabled={isSaving}
					aria-label="Cancel editing">
					<X />
				</button>

				{error && <p role="alert">{error}</p>}
			</form>
		)
	}

	return (
		<button
			type="button"
			className={styles.editButton}
			onClick={() => setIsEditing(true)}
			aria-label={`Edit ${category.category} monthly limit`}>
			<Pencil />
		</button>
	)
}
