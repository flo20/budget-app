'use client'

import { useState } from 'react'

import { archiveSavingsGoal } from '@/app/actions/savings-goals'

import styles from './SavingsGoals.module.scss'

export default function ArchiveButton({ goal }) {
	const [isPending, setIsPending] = useState(false)

	async function handleArchive() {
		setIsPending(true)

		const result = await archiveSavingsGoal(goal.id)

		if (!result?.success) {
			console.error(result?.error)
			setIsPending(false)
		}
	}

	return (
		<button
			type="button"
			className={styles.archiveButton}
			onClick={handleArchive}
			disabled={isPending}>
			{isPending ? 'Archiving...' : 'Archive'}
		</button>
	)
}
