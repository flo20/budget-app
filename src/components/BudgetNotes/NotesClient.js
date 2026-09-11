'use client'

import { createBudgetNotes } from '@/app/actions/budget-notes'
import { changeMonth } from '@/lib/utils/month'
import { formatMonth } from '@/lib/utils/format'

import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'

import Link from 'next/link'

import styles from './Notes.module.scss'

export default function NotesClient({ notes, budgetMonth }) {
	const previousMonth = changeMonth(budgetMonth, -1)
	const nextMonth = changeMonth(budgetMonth, 1)

	return (
		<>
			<header className={styles.header}>
				<div>
					<h2>Budget Notes</h2>
					<p>
						{notes.length} {notes.length === 1 ? 'note' : 'notes'} for this
						period
					</p>
				</div>

				<nav
					className={styles.monthNav}
					aria-label="Budget note month">
					<Link
						href={`dashboard/?month=${previousMonth}`}
						aria-label="Previous month">
						<ChevronLeft />
					</Link>

					<strong>{formatMonth(budgetMonth)}</strong>

					<Link
						href={`dashboard/?month=${nextMonth}`}
						aria-label="Next month">
						<ChevronRight />
					</Link>
				</nav>
			</header>
			<form
				action={createBudgetNotes}
				className={styles.addForm}>
				<input
					type="hidden"
					name="notebudgetMonth"
					value={budgetMonth}
				/>

				<label
					htmlFor="budget-note"
					className={styles.srOnly}>
					Add a budget note
				</label>

				<input
					id="budget-note"
					name="content"
					type="text"
					maxLength={280}
					placeholder={`Add a note for ${formatMonth(budgetMonth)}...`}
					required
				/>

				<button
					type="submit"
					aria-label="Add budget note">
					<Plus />
				</button>
			</form>
		</>
	)
}
