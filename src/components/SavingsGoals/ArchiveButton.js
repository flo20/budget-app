'use client'

import { useState } from 'react'

import { archiveSavingsGoal } from '@/app/actions/savings-goals'
import { useFormAction } from '../hooks/useFormActions'
import { Form, FormButton, FormError } from '@/components/Form'

import styles from './SavingsGoals.module.scss'

export default function ArchiveButton({ goal }) {
	const [isPending, setIsPending] = useState(false)

	const {
		formAction: archiveAction,
		isPending: isArchiving,
		error: archiveError,
	} = useFormAction(archiveSavingsGoal)

	return (
		<Form action={archiveAction}>
			<input
				type="hidden"
				name="goalId"
				value={goal.id}
			/>
			<FormButton
				type="submit"
				className={styles.archiveButton}
				disabled={isPending}>
				{isArchiving ? 'Archiving...' : 'Archive'}
			</FormButton>
            <FormError error={archiveError}/>
		</Form>
	)
}
