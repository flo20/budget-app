export function BudgetCategory({ category, formatCurrency, getStatusMessage }) {
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
