'use client'

import { useState, useActionState, useEffect, startTransition } from 'react'

import { Tag, Check, X } from 'lucide-react'
import { createCategory } from '@/app/actions/categories'

import { FormInput, FormButton, FormError } from '@/components/Form'

import styles from './CreateCategoryInline.module.scss'

const initialState = {
	success: false,
	error: null,
	category: null,
}

export default function CreateCategoryInline({ type, onCreated, onCancel }) {
	const [name, setName] = useState('')

	const [state, dispatch, isPending] = useActionState(
		createCategory,
		initialState,
	)

	useEffect(() => {
		if (state.success && state.category) {
			onCreated(state.category)
		}
	}, [state, onCreated])

	function handleCreate() {
		const categoryName = name.trim()

		if (!categoryName || isPending) return

		const formData = new FormData()

		formData.set('name', categoryName)
		formData.set('type', type)

		startTransition(() => {
			dispatch(formData)
		})
	}

	function handleKeyDown(event) {
		if (event.nativeEvent.isComposing) return

		if (event.key === 'Enter') {
			event.preventDefault()
			handleCreate()
		}

		if (event.key === 'Escape' && !isPending) {
			event.preventDefault()
			event.stopPropagation()
			onCancel()
		}
	}

	return (
		<div
			className={styles.container}
			aria-busy={isPending}>
			<div className={styles.heading}>
				<Tag aria-hidden="true" />
				<span>New category</span>
			</div>

			<FormInput
				type="text"
				value={name}
				aria-label="New category name"
				placeholder={
					type === 'expense' ? 'e.g. Childcare or Pets' : 'e.g. Rental income'
				}
				onChange={(event) => setName(event.target.value)}
				onKeyDown={handleKeyDown}
				maxLength={50}
				disabled={isPending}
				autoFocus
			/>

			<FormError error={state.error} />

			<div className={styles.actions}>
				<FormButton
					type="button"
					className={styles.createButton}
					onClick={handleCreate}
					disabled={isPending || !name.trim()}>
					<Check aria-hidden="true" />

					<span>{isPending ? 'Creating...' : 'Create & select'}</span>
				</FormButton>

				<FormButton
					type="button"
					variant="secondary"
					className={styles.cancelButton}
					onClick={onCancel}
					disabled={isPending}>
					<X aria-hidden="true" />
					<span>Cancel</span>
				</FormButton>
			</div>
		</div>
	)
}
