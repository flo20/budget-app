import { getBudgetNotes } from '@/lib/queries/budget-notes'

import NotesClient from './NotesClient'
import NotesContent from './NotesContent'

export default async function Notes({ budgetMonth }) {
	const notes = await getBudgetNotes(budgetMonth)

	return (
		<>
			<NotesClient
				notes={notes}
				budgetMonth={budgetMonth}
			/>
			<NotesContent
				notes={notes}
				budgetMonth={budgetMonth}
			/>
		</>
	)
}
