'use client'

import { createBudgetNotes } from '@/app/actions/budget-notes'
import { changeMonth } from '@/lib/utils/month'
import {formatMonth} from '@/lib/utils/format'

import Link from 'next/link'

export default function NotesClient({ notes, selectedMonth, budgetMonth }) {
	const previousMonth = changeMonth(selectedMonth, -1)
	const nextMonth = changeMonth(selectedMonth, 1)

	return (
		<section aria-labelledby="budget-notes-title">
			<header>
				<div>
					<h2>Budget Notes</h2>
					<p>
						{notes.length} {notes.length === 1 ? 'note' : 'notes'} for this
						period
					</p>
				</div>

				<nav aria-label="Budget note month">
					<Link
						href={`dashboard/?month=${previousMonth}`}
						aria-label="Previous month">
						Left arrow
					</Link>

					<strong>{formatMonth(selectedMonth)}</strong>

					<Link
						href={`dashboard/?month=${nextMonth}`}
						aria-label="Next month">
						Right arrow
					</Link>
				</nav>
			</header>
			<form action={createBudgetNotes}>
				<input
					type="hidden"
					name="budgetMonth"
					value={budgetMonth}
				/>

				<label htmlFor="budget-note">Add a budget note</label>

				<input
					id="budget-note"
					name="content"
					type="text"
					maxLength={280}
					placeholder={`Add a note for ${formatMonth(selectedMonth)}...`}
					required
				/>

				<button
					type="submit"
					aria-label="Add budget note">
					Add Icon
				</button>
			</form>
		</section>
	)
}
