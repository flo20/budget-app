'use client'

import { Check, Trash2 } from 'lucide-react'

import { formatTimestamp, formatMonth } from '@/lib/utils/format'
import { deleteBudgetNote, toggleBudgetNote } from '@/app/actions/budget-notes'

import FormButton from '../form/FormButtons'

import EditNotes from './EditNotes'

import styles from './Notes.module.scss'

export default function NotesContent({ notes, budgetMonth }) {
	if (notes.length === 0) {
		return (
			<div className={styles.emptyState}>
				<p>No notes for {formatMonth(budgetMonth)}.</p>

				<span>Add reminders or decisions about this month&apos;s budget.</span>
			</div>
		)
	}

	return (
		<ul className={styles.noteList}>
			{notes.map((note) => (
				<li
					key={note.id}
					className={note.is_resolved ? styles.resolved : ''}>
					<form
						action={toggleBudgetNote}
						className={styles.toggleForm}>
						<input
							type="hidden"
							name="noteId"
							value={note.id}
						/>

						<input
							type="hidden"
							name="notebudgetMonth"
							value={budgetMonth}
						/>

						<input
							type="hidden"
							name="resolved"
							value={String(!note.is_resolved)}
						/>

						<button
							type="submit"
							className={styles.checkbox}
							aria-pressed={note.is_resolved}
							aria-label={
								note.is_resolved
									? `Mark ${note.content} unresolved`
									: `Mark ${note.content} resolved`
							}>
							{note.is_resolved && <Check aria-hidden="true" />}
						</button>
					</form>

					<div className={styles.noteContent}>
						<EditNotes note={note} />

						<time dateTime={note.created_at}>
							{formatTimestamp(note.created_at)}

							{note.is_resolved && note.resolved_at && (
								<>
									{' · resolved '}
									{formatTimestamp(note.resolved_at)}
								</>
							)}
						</time>
					</div>

					<form action={deleteBudgetNote}>
						<input
							type="hidden"
							name="noteId"
							value={note.id}
						/>

						<input
							type="hidden"
							name="notebudgetMonth"
							value={budgetMonth}
						/>

						<FormButton
							type="submit"
							variant="icon"
							className={styles.deleteButton}
							aria-label={`Delete ${note.content}`}>
							<Trash2 aria-hidden="true" />
						</FormButton>
					</form>
				</li>
			))}
		</ul>
	)
}
