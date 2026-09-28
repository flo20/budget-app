'use client'

import { useState } from 'react'
import { useFormAction } from '../hooks/useFormActions';
import { contributeToSavingsGoal } from '@/app/actions/savings-goals'
import { X } from 'lucide-react'

import { Form, FormField, FormInput, FormButton, FormError } from '@/components/Form'

import styles from './SavingsGoals.module.scss'

export default function ContributeForm({ goal, closeForm }) {
	const [amount, setAmount] = useState('')

    const { formAction, isPending, error } = useFormAction(
			contributeToSavingsGoal,
			closeForm,
		)

	return (
		<Form
			action={formAction}
			className={styles.contributionForm}>
			<input
				type="hidden"
				name="goalId"
				value={goal.id}
			/>

			<FormField
				className={styles.contributionField}
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
					aria-label="Contribution amount"
					required
				/>
			</FormField>

			<FormButton
				type="submit"
				className={styles.addContributionButton}
				disabled={isPending}>
				{isPending ? 'Adding...' : 'Add'}
			</FormButton>

			<FormButton
				type="button"
				variant="secondary"
				className={styles.cancelContributionButton}
				onClick={closeForm}
				disabled={isPending}>
				<X />
			</FormButton>
			<FormError
				error={error}
				className={styles.contributionError}
			/>
		</Form>
	)
}
