'use client'

import { useState } from 'react'
import { contributeToSavingsGoal } from '@/app/actions/savings-goals'

export default function ContributeForm({ goal, closeForm }) {
	const [amount, setAmount] = useState('')

	return (
		<form action={contributeToSavingsGoal}>
			<input
				type="hidden"
				name="goalId"
				value={goal.id}
			/>

			<label htmlFor={`contribution-${goal.id}`}>Contribution amount</label>

			<input
				id={`contribution-${goal.id}`}
				name="amount"
				type="number"
				min="0.01"
				step="0.01"
				inputMode="decimal"
				value={amount}
				onChange={(event) => setAmount(event.target.value)}
				placeholder="0.00"
				required
			/>

			<button
				type="button"
				onClick={closeForm}>
				Cancel
			</button>

			<button type="submit">Add contribution</button>
		</form>
	)
}
