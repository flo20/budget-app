import { getMonthlyPulse } from '@/lib/queries/monthly-pulse'
import { buildMonthlyPulseSummary } from '@/lib/dashboard/monthly-pulse-summary'
import { formatCurrency, formatMonth } from '@/lib/utils/format'

import styles from './MonthlyPulse.module.scss'

export default async function MonthlyPulse({ budgetMonth }) {
	const data = await getMonthlyPulse(budgetMonth)
	const summary = buildMonthlyPulseSummary(data)

	return (
		<section
			className={styles.container}
			aria-label="Monthly financial summary">
			<article className={styles.metric}>
				<p>{formatMonth(budgetMonth)} income</p>
				<strong>{formatCurrency(summary.income)}</strong>
			</article>

			<article className={styles.metric}>
				<p>Total outflow</p>
				<strong className={styles.negative}>
					{formatCurrency(summary.outflow)}
				</strong>
			</article>
			<article className={styles.metric}>
				<p className={styles.label}>Remaining</p>
				<strong className={styles.positive}>
					{formatCurrency(summary.remaining)}
				</strong>
			</article>
			<article className={styles.metric}>
				<p>Net worth</p>
				<strong className={styles.positive}>
					{formatCurrency(summary.netWorth)}
				</strong>
			</article>
		</section>
	)
}
