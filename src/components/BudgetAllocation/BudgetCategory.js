
export function BudgetCategory({ category, formatCurrency, getStatusMessage }) {
    console.log("category", category);
    
	return (
		<article data-status={category.status}>
			<header>
				<h3>{category.category}</h3>

				<p>
					<strong>{formatCurrency(category.spent)}</strong>
					<span>{formatCurrency(category.limit)}</span>
				</p>
			</header>

			<div
				// className={styles.progressTrack}
				role="progressbar"
				aria-label={`${category.category} budget used`}
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={Math.round(category.percentageUsed)}>
				<div
				// style={{
				// 	width: `${category.progressWidth}%`,
				// }}
				/>
			</div>

			{/* <p>{getStatusMessage(category)}</p> */}
		</article>
	)
}
