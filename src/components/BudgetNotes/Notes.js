import { getBudgetNotes } from '@/lib/queries/budget-notes'
import {
	normalizeMonth
} from '@/lib/utils/month'

import NotesClient from './NotesClient'

export default async function Notes({searchParams}) {
	const notes = await getBudgetNotes()

	const params = await searchParams
	const selectedMonth = normalizeMonth(params?.month)

	return (
		<NotesClient
			notes={notes}
			selectedMonth={selectedMonth}
		/>
	)
}
