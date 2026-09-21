'use client'

import { useState } from 'react'
import { contributeToSavingsGoal } from '@/app/actions/savings-goals'

import {
	Form,
	FormField,
	FormInput,
	FormActions,
	FormButton,
} from '@/components/Form'

import styles from './SavingsGoals.module.scss'

export default function ContributeForm({ goal, closeForm }) {
	const [amount, setAmount] = useState('')

	return (
		<Form
			action={contributeToSavingsGoal}
			className={styles.contributionForm}>
			<input
				type="hidden"
				name="goalId"
				value={goal.id}
			/>

			<FormField
				label="Contribution amount"
				htmlFor={`contribution-${goal.id}`}>
				<FormInput
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
			</FormField>

			<FormActions>
				<FormButton
					type="button"
					variant="secondary"
					onClick={closeForm}>
					Cancel
				</FormButton>

				<FormButton type="submit">Add contribution</FormButton>
			</FormActions>
		</Form>
	)
}
