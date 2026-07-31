import { formatCurrency } from '@/lib/utils/currency'

export function BudgetCategory({ category, getStatusMessage }) {
    
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
		<article data-status={category.status}>
			<header>
				<h3>{category.category}</h3>
				<p>
					<strong>{formatCurrency(category.spent)}</strong>/
					<span>{formatCurrency(category.limit)}</span>
				</p>
			</header>

			<p>{getStatusMessage(category)}</p>
		
		</article>
	)
}
