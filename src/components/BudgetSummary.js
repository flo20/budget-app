import styles from "./BudgetSummary.module.scss"

export default function BudgetSummary() {
	return (
		<section className={styles.container}>
			<div>
				<h6>All Time Income</h6>
				<h1>$600</h1>
			</div>
			<div>
				<h6>Total Outflow</h6>
				<h1>$600</h1>
			</div>
			<div>
				<h6>Remaining</h6>
				<h1>$600</h1>
			</div>
			<div>
				<h6>Net Assets</h6>
				<h1>$600</h1>
			</div>
		</section>
	)
}
