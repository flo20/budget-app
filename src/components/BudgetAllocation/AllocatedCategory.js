import { formatCurrency } from '@/lib/utils/format'

import {
	House,
	ShoppingCart,
	Zap,
	Car,
	Clapperboard,
	WalletCards,
} from 'lucide-react'

import styles from './BudgetAllocation.module.scss'

function getCategoryIcon(categoryName) {
	const name = categoryName.toLowerCase()

	if (name.includes('housing')) return House
	if (name.includes('grocer')) return ShoppingCart
	if (name.includes('utilit')) return Zap
	if (name.includes('transport')) return Car
	if (name.includes('recreation')) return Clapperboard

	return WalletCards
}

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

	// const Icon = getCategoryIcon(category.category)

	const progress =
		category.limit > 0
			? Math.min(100, (category.spent / category.limit) * 100)
			: 0
	return (
		<article
			data-status={category.status}
			className={styles.category}>
			<div className={styles.categoryTop}>
				<div className={styles.categoryName}>
					{/* <Icon aria-hidden="true" /> */}
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
					style={{ width: `${progress}%` }}
				/>
			</div>
			{/* <header>
				<h3>{category.category}</h3>
				<p>
					<strong>{formatCurrency(category.spent)}</strong>/
					<span>{formatCurrency(category.limit)}</span>
				</p>
			</header> */}
			<p className={styles.categoryStatus}>{getStatusMessage(category)}</p>
		</article>
	)
}
