'use client'

import { deleteLiability } from '@/app/actions/liabilities'

import { Trash2 } from 'lucide-react'

import styles from './Liabilities.module.scss'

export default function DeleteButton({ liability }) {
	async function handleDelete(liability) {
		const result = await deleteLiability(liability)

		if (!result?.success) {
			console.error(result.error)
			return
		}
	}

	return (
		<button
			className={styles.deleteButton}
			key={liability.id}
			onClick={() => handleDelete(liability.id)}
			aria-label={`Delete ${liability.label}`}>
			<Trash2 />
		</button>
	)
}
