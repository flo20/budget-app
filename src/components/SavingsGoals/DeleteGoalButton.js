'use client'

import { Trash2 } from 'lucide-react'

import { deleteSavedGoal } from '@/app/actions/savings-goals'
import { useFormAction } from '../hooks/useFormActions'

import { Form, FormButton, FormError } from '@/components/Form'

import styles from './SavingsGoals.module.scss'

export default function DeleteGoalButton({ goal }) {
	const { formAction, isPending, error } = useFormAction(deleteSavedGoal)

	return (
		<>
			<Form action={formAction}>
				<input
					type="hidden"
					name="goalId"
					value={goal.id}
				/>

				<FormButton
					type="submit"
					className={styles.deleteButton}
					disabled={isPending}
					aria-label={`Delete ${goal.name}`}>
					<Trash2 />
				</FormButton>
			</Form>

			<FormError error={error} />
		</>
	)
}
