'use client'

import { useState } from 'react'
import { editBudgetNote } from '@/app/actions/budget-notes'

import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButtons'

import { Check, X } from 'lucide-react'

import styles from './Notes.module.scss'

export default function EditNotes({ note }) {
	const [isEditing, setIsEditing] = useState(false)
	const [draft, setDraft] = useState(note.content)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState(null)

	function cancelEditing() {
		setDraft(note.content)
		setError(null)
		setIsEditing(false)
	}

	async function handleSubmit(event) {
		event.preventDefault()

		const content = draft.trim()

		if (!content) {
			setError('Note cannot be empty.')
			return
		}

		setIsSaving(true)
		setError(null)

		const formData = new FormData()

		formData.set('noteId', note.id)
		formData.set('content', content)

		const result = await editBudgetNote(formData)

		setIsSaving(false)

		if (!result.success) {
			setError(result.error)
			return
		}

		setDraft(content)
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
				onSubmit={handleSubmit}
				className={styles.editForm}>
				<label
					htmlFor={`note-${note.id}`}
					className={styles.srOnly}>
					Edit
				</label>

				<FormInput
					id={`note-${note.id}`}
					name="content"
					type="text"
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={handleKeyDown}
					maxLength={280}
					disabled={isSaving}
					autoFocus
					className={styles.editInput}
				/>

				<FormButton
					type="submit"
					disabled={isSaving}
					variant="icon"
					aria-label="Save note"
					className={styles.editActionButton}>
					<Check />
				</FormButton>

				<FormButton
					type="button"
					variant="icon"
					onClick={cancelEditing}
					disabled={isSaving}
					aria-label="Cancel editing"
					className={styles.editActionButton}>
					<X />
				</FormButton>

				{error && (
					<p
						className={styles.error}
						role="alert">
						{error}
					</p>
				)}
			</form>
		)
	}

	return (
		<button
			type="button"
			className={styles.noteButton}
			onClick={() => setIsEditing(true)}
			aria-label={`Edit note: ${draft}`}>
			{draft}
		</button>
	)
}
