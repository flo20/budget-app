
import { getMonthlyPulse } from '@/lib/queries/monthly-pulse'
import { buildMonthlyPulseSummary } from '@/lib/dashboard/monthly-pulse-summary'
import { formatCurrency } from '@/lib/utils/currency'
import { formatMonth, toBudgetMonth } from '@/lib/utils/month'

import styles from './MonthlyPulse.module.scss'

export default async function MonthlyPulse({ selectedMonth }) {
	const budgetMonth = toBudgetMonth(selectedMonth)
	const data = await getMonthlyPulse(budgetMonth)
	const summary = buildMonthlyPulseSummary(data)

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

				<strong>
					{formatCurrency(summary.remaining)}
				</strong>
			</article>
			<article>
				<p>Net worth</p>

				{/* <strong>{formatCurrency(summary.netWorth)}</strong> */}

				<p>
					{formatCurrency(summary.totalAssets)} assets
					{/* <span aria-hidden="true"> − </span>
					<span>minus</span>
					{formatCurrency(summary.totalLiabilities)} liabilities */}
				</p>
			</article>
		</section>
	)
}
