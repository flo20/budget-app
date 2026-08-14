import { formatMonth, formatCompactCurrency } from '@/lib/utils/format'

export default function ForecastPanel({ budgetMonth, paceMetrics }) {
	const { projectedRemaining, upcomingBills } = paceMetrics
	return (
		<aside className="border-t border-[#29292e] p-8 lg:border-l lg:border-t-0">
			<p className="font-mono text-sm tracking-[0.16em] text-zinc-400">
				PERIOD-END FORECAST
			</p>

			<p className="mt-5 font-mono text-4xl font-semibold text-emerald-400 lg:text-4xl">
				{formatCompactCurrency(Math.abs(projectedRemaining))}
			</p>

			<p className="mt-2 font-mono text-sm tracking-[0.15em] text-emerald-400">
				{projectedRemaining <= 0 ? 'OVER BUDGET' : 'UNDER BUDGET'}
			</p>

			<p className="mt-7 max-w-sm text-lg leading-7 text-zinc-400">
				{projectedRemaining <= 0
					? `At your current pace, ${formatMonth(budgetMonth)} should finish over budget`
					: `At your current pace, ${formatMonth(budgetMonth)} should finish within budget.`}
			</p>

			<div className="my-8 h-px bg-[#29292e]" />

			<p className="font-mono text-3xl font-semibold text-zinc-100">
				{upcomingBills}
			</p>

			<p className="mt-2 font-mono text-sm tracking-[0.16em] text-zinc-400">
				UPCOMING BILLS
			</p>
		</aside>
	)
}
