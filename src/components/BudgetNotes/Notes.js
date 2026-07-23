import { getBudgetNotes } from '@/lib/queries/budget-notes'
import { toBudgetMonth } from '@/lib/utils/month'

import NotesClient from './NotesClient'
import NotesContent from './NotesContent'

export default async function Notes({ selectedMonth }) {
	const budgetMonth = toBudgetMonth(selectedMonth)
	const notes = await getBudgetNotes(budgetMonth)

	return (
		<>
			<NotesClient
				notes={notes}
				selectedMonth={selectedMonth}
				budgetMonth={budgetMonth}
			/>
			<NotesContent
				notes={notes}
				selectedMonth={selectedMonth}
				budgetMonth={budgetMonth}
			/>
		</>
	)
}
