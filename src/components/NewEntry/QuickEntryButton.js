'use client'

import { useModal } from '@/app/providers/GlobalProvider'

import styles from './NewEntryForm.module.scss'

export default function QuickEntryButton() {
	const { openEntryModal } = useModal()
	return (
		<button
			onClick={openEntryModal}
			className={styles.quickEntryButton}>
			<span>＋</span>
			Quick Entry
		</button>
	)
}
