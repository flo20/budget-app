import styles from './AllocatedBudget.module.scss'

export default function AllocatedBudget() {
	return (
		<div className={styles.container}>
			<h2>ALLOCATED BUDGETS</h2>
			<div>
				<p>HOUSING</p>
				<span>
					<p>$0.00/ $2,100.00</p>
				</span>
			</div>
            <div>Progress bar goes here</div>
		</div>
	)
}
