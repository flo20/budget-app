'use client'

import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceLine,
	XAxis,
	YAxis,
} from 'recharts'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

import { trendConfig } from '@/lib/constants/chart-configs'

import ChartLegendItem from './ChartLegendItem'
import { formatCompactCurrency } from '../../lib/utils/format'

export default function MonthlyTrendClient({ trendData = {}, trendMetrics }) {
	const { spendingDifference, spendingChange, trendDirection } = trendMetrics
	return (
		<div className="grid lg:grid-cols-[2fr_1fr]">
			<div className="min-w-0 p-6 md:p-8">
				<div className="mb-8 flex flex-wrap gap-8">
					<ChartLegendItem
						color="#3b82f6"
						label="INCOME"
					/>

					<ChartLegendItem
						color="#fb5262"
						label="EXPENSE"
					/>

					<ChartLegendItem
						color="#a1a1aa"
						label="3-MONTH AVERAGE"
						dashed
					/>
				</div>

				<ChartContainer
					config={trendConfig}
					className="h-[500px] w-full">
					<LineChart
						data={trendData}
						margin={{
							left: 16,
							right: 28,
							top: 28,
							bottom: 20,
						}}>
						<CartesianGrid
							vertical={false}
							stroke="#29292e"
							strokeDasharray="3 6"
						/>

						<XAxis
							dataKey="month"
							axisLine={false}
							tickLine={false}
							tickMargin={12}
							tick={{ fill: '#8b8b93', fontSize: 12 }}
						/>

						<YAxis
							domain={[0, 'auto']}
							axisLine={false}
							tickLine={false}
							width={65}
							tick={{
								fill: 'var(--text-muted)',
								fontSize: 12,
							}}
							tickFormatter={(value) => {
								if (value === 0) return '$0'

								if (value >= 1_000_000) {
									return `$${(value / 1_000_000).toFixed(1)}M`
								}

								if (value >= 1000) {
									return `$${(value / 1000).toFixed(1)}K`
								}

								return `$${value}`
							}}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>

						<ReferenceLine
							y={907.13}
							stroke="#a1a1aa"
							strokeDasharray="7 7"
							label={{
								value: '$907',
								position: 'right',
								fill: '#a1a1aa',
								fontSize: 12,
							}}
						/>

						<Line
							dataKey="income"
							type="linear"
							stroke="#3b82f6"
							strokeWidth={3}
							dot={{
								fill: '#3b82f6',
								r: 4,
							}}
							activeDot={{
								r: 6,
							}}
						/>

						<Line
							dataKey="expense"
							type="linear"
							stroke="#fb5262"
							strokeWidth={3}
							dot={{
								fill: '#fb5262',
								r: 4,
							}}
							activeDot={{
								r: 6,
							}}
						/>
					</LineChart>
				</ChartContainer>
			</div>

			<aside className="border-t border-[#29292e] p-8 lg:border-l lg:border-t-0">
				<p className="font-mono text-xs font-medium tracking-[0.2em] text-zinc-500">
					MONTHLY TREND
				</p>

				<p
					className={`${styles.trendValue} ${
						spendingChange <= 0 ? styles.positive : styles.negative
					}`}>
					{Math.abs(Math.round(spendingChange))}%{' '}
					{spendingChange <= 0 ? 'Lower' : 'Higher'}
				</p>

				<p className="mt-2 font-mono text-xs font-medium tracking-[0.16em] text-zinc-500">
					SPENDING VS PREVIOUS MONTH
				</p>

				<p className={styles.panelDescription}>
					{spendingDifference < 0
						? `You spent ${formatCompactCurrency(
								Math.abs(spendingDifference),
							)} less than last month`
						: spendingDifference > 0
							? `You spent ${formatCompactCurrency(
									spendingDifference,
								)} more than last month`
							: 'Your spending was unchanged from last month'}
				</p>

				<div className="my-8 h-px bg-[#29292e]" />

				<p
					className={`font-mono text-2xl font-semibold tracking-wide ${
						trendDirection === 'rising'
							? 'text-red-400'
							: trendDirection === 'falling'
								? 'text-emerald-400'
								: 'text-zinc-300'
					}`}>
					{trendDirection.toUpperCase()}
				</p>

				<p className="mt-2 font-mono text-xs font-medium tracking-[0.16em] text-zinc-500">
					3-MONTH DIRECTION
				</p>

				<p className="mt-5 max-w-sm text-base leading-7 text-zinc-400">
					{trendDirection === 'rising'
						? 'Expenses have been trending upward over the last three months'
						: trendDirection === 'falling'
							? 'Expenses have been trending downward over the last three months'
							: 'Expenses have remained relatively stable over the last three months'}
				</p>
			</aside>
		</div>
	)
}
