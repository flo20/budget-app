"use client"

import {useState} from "react"
import { useModal } from "@/app/providers/GlobalProvider"
import { createPinPayment } from "@/app/actions/pins"


function getLocalDate() {
	const now = new Date()

	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}

export default function PinnedPaymentForm () {
    const [dueDate, setDueDate] = useState(() => getLocalDate())
    
    const {closePinnedModal} = useModal()

return (
	<>
		<header>
			<h4>Pinned Payment</h4>
			<button onClick={closePinnedModal}>Close</button>
		</header>
		<form action={createPinPayment}>
			<p>Record an income or expense. </p>

			<div>
				<label htmlFor="label">Label</label>
			</div>

			<input
				id="label"
				type="text"
				name="label"
				required
			/>

			<label htmlFor="amount">Amount</label>

			<input
				id="amount"
				name="amount"
				type="number"
				min="0.01"
				step="0.01"
				required
			/>

			<label htmlFor="dueDate">Due date</label>

			<input
				id="dueDate"
				name="dueDate"
				type="date"
				value={dueDate}
				onChange={(event) => setDueDate(event.target.value)}
			/>

			<div>
				<input
					id="isRecurringMonthly"
					name="isRecurringMonthly"
					type="checkbox"
				/>
				Recurring every month
			</div>

			<button
				type="button"
				onClick={closePinnedModal}>
				Cancel
			</button>
			<button type="submit">Pin payment</button>
		</form>
	</>
)
}
