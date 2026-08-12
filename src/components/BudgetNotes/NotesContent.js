'use client'

import { formatTimestamp, formatMonth } from '@/lib/utils/format'
import { deleteBudgetNote, toggleBudgetNote } from '@/app/actions/budget-notes'

import EditNotes from './EditNotes'

export default function NotesContent({ notes, budgetMonth }) {
	return (
		<div>
			{notes.length === 0 ? (
				<div>
					<p>No notes for {formatMonth(budgetMonth)}.</p>

					<span>Add reminders or decisions about this month budget.</span>
				</div>
			) : (
				<ul>
					{notes.map((note) => (
						<li
							key={note.id}
							// className={note.is_resolved ? styles.resolved : undefined}
						>
							<form action={toggleBudgetNote}>
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
									role="checkbox"
									aria-checked={note.is_resolved}
									aria-label={
										note.is_resolved
											? `Mark ${note.content} unresolved`
											: `Mark ${note.content} resolved`
									}>
									{note.is_resolved && <p>Check Icon</p>}
								</button>
							</form>

							<div>
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

								<button
									type="submit"
									aria-label={`Delete ${note.content}`}>
									Delete button
								</button>
							</form>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
