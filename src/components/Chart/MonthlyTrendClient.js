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

const monthlyTrendData = [
	{ month: 'MAR', income: 0, expense: 0 },
	{ month: 'APR', income: 0, expense: 0 },
	{ month: 'MAY', income: 0, expense: 0 },
	{ month: 'JUN', income: 0, expense: 0 },
	{ month: 'JUL', income: 4200, expense: 2526.2 },
	{ month: 'AUG', income: 4200, expense: 195.19 },
]


export default function MonthlyTrendClient() {
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
					className="h-[440px] w-full">
					<LineChart
						data={monthlyTrendData}
						margin={{
							left: 5,
							right: 20,
							top: 20,
							bottom: 10,
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
							domain={[0, 5000]}
							ticks={[0, 1250, 2500, 3750, 5000]}
							axisLine={false}
							tickLine={false}
							width={60}
							tick={{ fill: '#8b8b93', fontSize: 12 }}
							tickFormatter={(value) => {
								if (value === 0) return '$0'
								return `$${(value / 1000).toFixed(1)}K`
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
				<p className="font-mono text-sm tracking-[0.16em] text-zinc-400">
					MONTHLY TREND
				</p>

				<p className="mt-5 font-mono text-4xl font-semibold text-emerald-400">
					92% Lower
				</p>

				<p className="mt-2 font-mono text-sm tracking-[0.15em] text-zinc-400">
					SPENDING VS JUL
				</p>

				<p className="mt-7 text-lg leading-7 text-zinc-400">
					You spent $2,331.01 less than last month.
				</p>

				<div className="my-8 h-px bg-[#29292e]" />

				<p className="font-mono text-3xl font-semibold text-[#fb5262]">
					RISING
				</p>

				<p className="mt-2 font-mono text-sm tracking-[0.16em] text-zinc-400">
					3-MONTH DIRECTION
				</p>

				<p className="mt-7 text-lg leading-7 text-zinc-400">
					Expenses are creeping up over the last three months.
				</p>
			</aside>
		</div>
	)
}

