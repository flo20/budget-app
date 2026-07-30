import { AllocatedBudgetsPanel } from './AllocatedBudgetsPanel'

import styles from "./BudgetAllocation.module.scss"

export default function BudgetAllocation({ selectedMonth }) {
	return (
		<section className={styles.container}>
			<AllocatedBudgetsPanel selectedMonth={selectedMonth} />
		</section>
	)
}
