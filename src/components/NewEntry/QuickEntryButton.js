'use client'

import { useModal } from '@/app/providers/GlobalProvider'
import { Plus } from 'lucide-react'

import styles from './NewEntryForm.module.scss'

export default function QuickEntryButton() {
	const { openEntryModal } = useModal()
	return (
		<button
			onClick={openEntryModal}
			className={styles.quickEntryButton}>
			<Plus />
			<span>Quick Entry</span>
		</button>
	)
}
