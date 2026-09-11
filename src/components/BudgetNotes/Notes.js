import { getBudgetNotes } from '@/lib/queries/budget-notes'

import NotesClient from './NotesClient'
import NotesContent from './NotesContent'

import styles from './Notes.module.scss'

export default async function Notes({ budgetMonth }) {
	const notes = await getBudgetNotes(budgetMonth)

	return (
		<section
			className={styles.container}
			aria-labelledby="budget-notes-title">
			<NotesClient
				notes={notes}
				budgetMonth={budgetMonth}
			/>
			<NotesContent
				notes={notes}
				budgetMonth={budgetMonth}
			/>
			<p className={styles.helperText}>
				Switching months shows that month&apos;s notes only
			</p>
		</section>
	)
}
