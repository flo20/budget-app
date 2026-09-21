'use client'

import Link from 'next/link'

import { createBudgetNotes } from '@/app/actions/budget-notes'
import { changeMonth } from '@/lib/utils/month'
import { formatMonth } from '@/lib/utils/format'

import { FormInput, FormButton } from '@/components/Form'

import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './Notes.module.scss'

export default function NotesClient({ notes, budgetMonth }) {
	const previousMonth = changeMonth(budgetMonth, -1)
	const nextMonth = changeMonth(budgetMonth, 1)

	return (
		<>
			<header className={styles.header}>
				<div className={styles.headerText}>
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
						href={`/dashboard/?month=${previousMonth}`}
						aria-label="Previous month">
						<ChevronLeft />
					</Link>

					<strong>{formatMonth(budgetMonth)}</strong>

					<Link
						href={`/dashboard/?month=${nextMonth}`}
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

				<FormInput
					id="budget-note"
					name="content"
					type="text"
					maxLength={280}
					placeholder={`Add a note for ${formatMonth(budgetMonth)}...`}
					required
					className={styles.addInput}
				/>

				<FormButton
					type="submit"
					variant="icon"
					className={styles.addButton}
					aria-label="Add budget note">
					<Plus />
				</FormButton>
			</form>
		</>
	)
}
