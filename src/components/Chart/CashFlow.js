'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

import { formatChartCurrency } from '@/lib/utils/format'

const monthlyCashFlowData = [
	{ month: 'MAR', income: 0, expense: 0, net: 0 },
	{ month: 'APR', income: 0, expense: 0, net: 0 },
	{ month: 'MAY', income: 0, expense: 0, net: 0 },
	{ month: 'JUN', income: 0, expense: 0, net: 0 },
	{ month: 'JUL', income: 4200, expense: 2526.2, net: 1673.8 },
	{ month: 'AUG', income: 4200, expense: 195.19, net: 4004.81 },
]

const cashFlowConfig = {
	income: {
		label: 'Income',
		color: '#3b82f6',
	},
	expense: {
		label: 'Expense',
		color: '#fb5262',
	},
}

function ChartLegendItem({ color, label, dashed = false }) {
	return (
		<div className="flex items-center gap-3">
			<span
				className={`block w-9 border-t-[3px] ${dashed ? 'border-dashed' : ''}`}
				style={{ borderColor: color }}
			/>

			<span className="font-mono text-sm tracking-[0.15em] text-zinc-400">
				{label}
			</span>
		</div>
	)
}

function ForecastPanel() {
	return (
		<aside className="border-t border-[#29292e] p-8 lg:border-l lg:border-t-0">
			<p className="font-mono text-sm tracking-[0.16em] text-zinc-400">
				PERIOD-END FORECAST
			</p>

			<p className="mt-5 font-mono text-4xl font-semibold text-emerald-400 lg:text-5xl">
				$2,749.92
			</p>

			<p className="mt-2 font-mono text-sm tracking-[0.15em] text-emerald-400">
				UNDER BUDGET
			</p>

			<p className="mt-7 max-w-sm text-lg leading-7 text-zinc-400">
				At your current pace, August 2026 should finish within budget.
			</p>

			<div className="my-8 h-px bg-[#29292e]" />

			<p className="font-mono text-3xl font-semibold text-zinc-100">$2,750</p>

			<p className="mt-2 font-mono text-sm tracking-[0.16em] text-zinc-400">
				UPCOMING BILLS
			</p>
		</aside>
	)
}

export default function CashFlow() {
	return (
		<div className="grid lg:grid-cols-[2fr_1fr]">
			<div className="min-w-0 p-6 md:p-8">
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
						data={monthlyCashFlowData}
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
					{monthlyCashFlowData.map((item) => (
						<div key={item.month}>
							<p className="font-mono text-sm tracking-[0.12em] text-zinc-400">
								{item.month}
							</p>

							<p className="mt-1 font-mono text-sm text-emerald-400">
								+
								{item.net >= 1000
									? `$${(item.net / 1000).toFixed(1)}K`
									: formatChartCurrency(item.net)}
							</p>
						</div>
					))}
				</div>
			</div>

			<ForecastPanel />
		</div>
	)
}
