import { formatMonth, formatCompactCurrency } from '@/lib/utils/format'

import styles from './Chart.module.scss'

export default function ForecastPanel({ budgetMonth, paceMetrics }) {
	const { projectedRemaining, upcomingBills } = paceMetrics

    const isUnderBudget = projectedRemaining > 0

	return (
		<aside className={styles.sidePanel}>
			<p className={styles.panelLabel}>PERIOD-END FORECAST</p>

			<p
				className={`${styles.forecastValue} ${
					isUnderBudget ? styles.positive : styles.negative
				}`}>
				{formatCompactCurrency(Math.abs(projectedRemaining))}
			</p>

			<p
				className={`${styles.forecastStatus} ${
					isUnderBudget ? styles.positive : styles.negative
				}`}>
				{isUnderBudget ? 'Under budget' : 'Over budget'}
			</p>

			<p className={styles.panelDescription}>
				{isUnderBudget
					? `At your current pace, ${formatMonth(budgetMonth)} should finish over budget`
					: `At your current pace, ${formatMonth(budgetMonth)} should finish within budget.`}
			</p>

			<div className={styles.panelDivider} />

			<p className={styles.secondaryValue}>
				{formatCompactCurrency(upcomingBills)}
			</p>

			<p className={styles.panelLabel}>UPCOMING BILLS</p>
		</aside>
	)
}
