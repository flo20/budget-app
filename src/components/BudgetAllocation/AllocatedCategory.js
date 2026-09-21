import { formatCurrency } from '@/lib/utils/format'
import { getCategoryIcon } from '@/lib/constants/transaction-categories'

import styles from './BudgetAllocation.module.scss'

export default function AllocatedCategory({ category }) {

	function getStatusMessage(category) {
		if (category.status === 'over') {
			return `${formatCurrency(Math.abs(category.remaining))} over budget`
		}

		if (category.status === 'full') {
			return 'Fully used, nothing left'
		}

		if (category.status === 'warning') {
			return `${formatCurrency(category.remaining)} left, close to limit`
		}

		return `${formatCurrency(category.remaining)} left`
	}    

	return (
		<article
			data-status={category.status}
			className={styles.category}>
			<div className={styles.categoryTop}>
				<div className={styles.categoryName}>
					{getCategoryIcon(category.category)}
					<h3>{category.category}</h3>
				</div>

				<p className={styles.categoryAmount}>
					<strong>{formatCurrency(category.spent)}</strong>
					<span>/</span>
					<span>{formatCurrency(category.limit)}</span>
				</p>
			</div>
			<div className={styles.categoryTrack}>
				<span
					className={styles.categoryProgress}
					style={{ width: `${category.progressWidth}%` }}
				/>
			</div>
			<p className={styles.categoryStatus}>{getStatusMessage(category)}</p>
		</article>
	)
}
