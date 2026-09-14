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

import styles from "./Chart.module.scss"

export default function CashFlowClient({ cashFlowData = {}, cashFlowMetrics }) {
	const { previousMonthNet, netCashFlow } = cashFlowMetrics
	return (
		<div className={styles.chartLayout}>
			<div className={styles.chartArea}>
				<div className="mb-8 flex gap-8">
					<ChartLegendItem
						color="#3b82f6"
						label="INCOME"
					/>
					<ChartLegendItem
						color="#fb5262"
						label="EXPENSE"
					/>
				</div>

				<ChartContainer
					config={cashFlowConfig}
					className="h-[440px] w-full">
					<BarChart
						data={cashFlowData}
						margin={{
							left: 20,
							right: 20,
							top: 20,
							bottom: 20,
						}}>
						<XAxis
							dataKey="month"
							axisLine={false}
							tickLine={false}
							tickMargin={20}
							tick={{ fill: '#a1a1aa', fontSize: 12 }}
						/>

						<YAxis hide />

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>

						<Bar
							dataKey="income"
							fill="#3b82f6"
							radius={[7, 7, 0, 0]}
							barSize={42}
						/>

						<Bar
							dataKey="expense"
							fill="#fb5262"
							radius={[7, 7, 0, 0]}
							barSize={42}
						/>
					</BarChart>
				</ChartContainer>

				<div className="grid grid-cols-6 text-center">
					{cashFlowData.map((cashData) => (
						<div key={cashData.month}>
							<p className="font-mono text-sm tracking-[0.12em] text-zinc-400">
								{cashData.month}
							</p>

							<p className="mt-1 font-mono text-sm text-emerald-400">
								+
								{cashData.net >= 1000
									? `$${(cashData.net / 1000).toFixed(1)}K`
									: formatChartCurrency(cashData.net)}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* SIDE PANEL */}
			<aside className={styles.sidePanel}>
				<p className="font-mono text-xs font-medium tracking-[0.2em] text-zinc-500">
					NET CASH FLOW
				</p>

				<p
					className={`mt-4 font-mono text-4xl font-semibold tracking-tight lg:text-4xl ${
						netCashFlow > 0
							? 'text-emerald-400'
							: netCashFlow < 0
								? 'text-red-400'
								: 'text-zinc-100'
					}`}>
					{formatCompactCurrency(Math.abs(netCashFlow))}
				</p>

				<div className="mt-3 flex items-center gap-2">
					<p
						className={`font-mono text-xs font-medium tracking-[0.16em] ${
							netCashFlow > 0
								? 'text-emerald-400'
								: netCashFlow < 0
									? 'text-red-400'
									: 'text-zinc-400'
						}`}>
						{netCashFlow > 0
							? 'POSITIVE CASH FLOW'
							: netCashFlow < 0
								? 'NEGATIVE CASH FLOW'
								: 'BALANCED'}
					</p>
				</div>

				<p className="mt-6 max-w-sm text-base leading-7 text-zinc-400">
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

				<div className="my-8 h-px bg-[#29292e]" />

				<div>
					<p className="font-mono text-xs font-medium tracking-[0.2em] text-zinc-500">
						PREVIOUS MONTH NET
					</p>

					<p
						className={`mt-3 font-mono text-2xl font-semibold tracking-tight ${
							previousMonthNet > 0
								? 'text-zinc-100'
								: previousMonthNet < 0
									? 'text-red-400'
									: 'text-zinc-400'
						}`}>
						{previousMonthNet > 0 ? '+' : previousMonthNet < 0 ? '-' : ''}
						{formatCompactCurrency(Math.abs(previousMonthNet))}
					</p>

					<p className="mt-3 text-sm leading-6 text-zinc-500">
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
