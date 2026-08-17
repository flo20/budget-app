import { getMonthlyPulse } from '@/lib/queries/monthly-pulse'
import { buildMonthlyPulseSummary } from '@/lib/dashboard/monthly-pulse-summary'
import { formatCurrency, formatMonth } from '@/lib/utils/format'

import styles from './MonthlyPulse.module.scss'

export default async function MonthlyPulse({ budgetMonth }) {
	const data = await getMonthlyPulse(budgetMonth)
	const summary = buildMonthlyPulseSummary(data)

	console.log('summary', summary)

	return (
		<section
			className={styles.container}
			aria-labelledby="monthly-pulse-title">
			<article>
				<p>{formatMonth(budgetMonth)} income</p>

				<strong>{formatCurrency(summary.income)}</strong>
			</article>
			<article>
				<p>Total outflow</p>

				<strong>{formatCurrency(summary.outflow)}</strong>
			</article>
			<article className={styles.metric}>
				<p className={styles.label}>Remaining</p>

				<strong>{formatCurrency(summary.remaining)}</strong>
			</article>
			<article>
				<p>Net worth</p>

				<strong>{formatCurrency(summary.netWorth)}</strong>

				<p>
					{formatCurrency(summary.totalAssets)} assets
					<span aria-hidden="true"> − </span>
					{formatCurrency(summary.totalLiabilities)} liabilities
				</p>
			</article>
		</section>
	)
}
