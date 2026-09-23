import { getMonthlyPulse } from '@/lib/queries/monthly-pulse'
import { buildMonthlyPulseSummary } from '@/lib/dashboard/monthly-pulse-summary'
import { formatCompactCurrency, formatMonth } from '@/lib/utils/format'

import styles from './MonthlyPulse.module.scss'

export default async function MonthlyPulse({ budgetMonth }) {
	const data = await getMonthlyPulse(budgetMonth)
	const summary = buildMonthlyPulseSummary(data)

    const getValueClass = (value) => {
			if (value > 0) return styles.positive
			if (value < 0) return styles.negative

			return ''
		}

	return (
		<section
			className={styles.container}
			aria-label="Monthly financial summary">
			<article className={styles.metric}>
				<p>{formatMonth(budgetMonth)} income</p>
				<strong>{formatCompactCurrency(summary.income)}</strong>
			</article>

			<article className={styles.metric}>
				<p>Total outflow</p>
				<strong className={styles.negative}>
					{formatCompactCurrency(summary.outflow)}
				</strong>
			</article>
			<article className={styles.metric}>
				<p className={styles.label}>Remaining</p>
				<strong className={getValueClass(summary.remaining)}>
					{formatCompactCurrency(summary.remaining)}
				</strong>
			</article>
			<article className={styles.metric}>
				<p>Net worth</p>
				<strong className={getValueClass(summary.netWorth)}>
					{formatCompactCurrency(summary.netWorth)}
				</strong>
			</article>
		</section>
	)
}
