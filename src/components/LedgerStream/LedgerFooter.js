import { formatMonth } from '@/lib/utils/format'

import styles from './LedgerStream.module.scss'

export default function LedgerFooter({
	showingCount,
	totalCount,
	budgetMonth,
}) {
	return (
		<footer className={styles.footer}>
			<p>
				SHOWING {showingCount} OF {totalCount} ENTRIES IN{' '}
				{formatMonth(budgetMonth).toUpperCase()}
			</p>
		</footer>
	)
}
