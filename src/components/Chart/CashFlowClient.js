'use client'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { formatCompactCurrency, formatChartCurrency } from '@/lib/utils/format'
import { cashFlowConfig } from '@/lib/constants/chart-configs'

import ChartLegendItem from './ChartLegendItem'

import styles from './Chart.module.scss'

export default function CashFlowClient({ cashFlowData = [], cashFlowMetrics }) {
	const { previousMonthNet, netCashFlow } = cashFlowMetrics

	function getValueClass(value) {
		if (value > 0) return styles.positive
		if (value < 0) return styles.negative

		return styles.neutral
	}

	return (
		<div className={styles.chartLayout}>
			<div className={styles.chartArea}>
				<div className={styles.legend}>
					<ChartLegendItem
						color="var(--accent-blue)"
						label="INCOME"
					/>
					<ChartLegendItem
						color="var(--negative)"
						label="EXPENSE"
					/>
				</div>

				<div className={styles.cashFlowChart}>
					<ChartContainer
						config={cashFlowConfig}
						className="h-full w-full">
						<BarChart
							data={cashFlowData}
							margin={{
								left: 20,
								right: 20,
								top: 10,
								bottom: 10,
							}}>
							<XAxis
								dataKey="month"
								axisLine={false}
								tickLine={false}
								tickMargin={20}
								tick={{
									fill: 'var(--text-muted)',
									fontSize: 12,
								}}
							/>

							<YAxis hide />

							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent />}
							/>

							<Bar
								dataKey="income"
								fill="var(--accent-blue)"
								radius={[7, 7, 0, 0]}
								barSize={42}
							/>

							<Bar
								dataKey="expense"
								fill="var(--negative)"
								radius={[7, 7, 0, 0]}
								barSize={42}
							/>
						</BarChart>
					</ChartContainer>
				</div>

				<div className={styles.cashFlowMonths}>
					{cashFlowData.map((cashData) => (
						<div
							key={cashData.month}
							className={styles.cashFlowMonth}>
							<p>{cashData.month}</p>
							<span className={getValueClass(cashData.net)}>
								{cashData.net > 0 ? '+' : ''}
								{Math.abs(cashData.net) >= 1000
									? `$${(Math.abs(cashData.net) / 1000).toFixed(1)}K`
									: formatChartCurrency(cashData.net)}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* SIDE PANEL */}
			<aside className={styles.sidePanel}>
				<p className={styles.panelLabel}>NET CASH FLOW</p>

				<p className={`${styles.forecastValue} ${getValueClass(netCashFlow)}`}>
					{netCashFlow > 0 ? '+' : netCashFlow < 0 ? '-' : ''}
					{formatCompactCurrency(Math.abs(netCashFlow))}
				</p>

				<p className={`${styles.forecastStatus} ${getValueClass(netCashFlow)}`}>
					{netCashFlow > 0
						? 'Positive cash flow'
						: netCashFlow < 0
							? 'Negative cash flow'
							: 'Balanced'}
				</p>

				<p className={styles.panelDescription}>
					{netCashFlow > 0
						? `Income exceeded expenses by ${formatCompactCurrency(
								netCashFlow,
							)} this month.`
						: netCashFlow < 0
							? `Expenses exceeded income by ${formatCompactCurrency(
									Math.abs(netCashFlow),
								)} this month.`
							: 'Income and expenses were equal this month.'}
				</p>

				<div className={styles.panelDivider} />
				<div className={styles.previousMonth}>
					<p
						className={`${styles.secondaryValue} ${getValueClass(
							previousMonthNet,
						)}`}>
						{previousMonthNet > 0 ? '+' : previousMonthNet < 0 ? '-' : ''}
						{formatCompactCurrency(Math.abs(previousMonthNet))}
					</p>

					<p className={styles.panelLabel}>Previous month net</p>

					<p className={styles.previousDescription}>
						{previousMonthNet > 0
							? 'Last month also closed with positive cash flow.'
							: previousMonthNet < 0
								? 'Last month closed with expenses above income.'
								: 'Last month ended with balanced cash flow.'}
					</p>
				</div>
			</aside>
		</div>
	)
}
