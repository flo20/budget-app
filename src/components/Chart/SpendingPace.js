'use client'

import {
	Area,
	CartesianGrid,
	ComposedChart,
	Line,
	ReferenceLine,
	XAxis,
	YAxis,
} from 'recharts'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { formatChartCurrency } from '@/lib/utils/format'
import { getSpendingPaceData } from '@/lib/outlook/getSpendingPaceData'

const spendingPaceData = [
	{
		day: 1,
		actual: 55,
		budgetPace: 106,
		forecast: null,
	},
	{
		day: 5,
		actual: 190,
		budgetPace: 532,
		forecast: null,
	},
	{
		day: 12,
		actual: 195.19,
		budgetPace: 1277,
		forecast: 195.19,
	},
	{
		day: 16,
		actual: null,
		budgetPace: 1703,
		forecast: 285,
	},
	{
		day: 23,
		actual: null,
		budgetPace: 2448,
		forecast: 420,
	},
	{
		day: 31,
		actual: null,
		budgetPace: 3300,
		forecast: 550.08,
	},
]

// const spendingPaceData = getSpendingPaceData({
//   transactions,
//   monthlyBudget,
//   year: 2026,
//   month: 8,
// });


const spendingChartConfig = {
	actual: {
		label: 'Actual',
		color: '#00c896',
	},
	budgetPace: {
		label: 'Budget Pace',
		color: '#a1a1aa',
	},
	forecast: {
		label: 'Forecast',
		color: '#fbbf24',
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






export default function SpendingPace() {
	return (
		<div className="grid lg:grid-cols-[2fr_1fr]">
			<div className="min-w-0 p-6 md:p-8">
				<div className="mb-10 flex flex-wrap gap-8">
					<ChartLegendItem
						color="#00c896"
						label="ACTUAL"
					/>
					<ChartLegendItem
						color="#a1a1aa"
						label="BUDGET PACE"
						dashed
					/>
					<ChartLegendItem
						color="#fbbf24"
						label="FORECAST"
						dashed
					/>
				</div>

				<ChartContainer
					config={spendingChartConfig}
					className="h-[440px] w-full">
					<ComposedChart
						data={spendingPaceData}
						margin={{
							left: 10,
							right: 20,
							top: 20,
							bottom: 10,
						}}>
						<defs>
							<linearGradient
								id="actualFill"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="0%"
									stopColor="#00c896"
									stopOpacity={0.25}
								/>
								<stop
									offset="100%"
									stopColor="#00c896"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>

						<CartesianGrid
							vertical={false}
							stroke="#29292e"
							strokeDasharray="3 6"
						/>

						<XAxis
							dataKey="day"
							axisLine={false}
							tickLine={false}
							tickMargin={12}
							tick={{ fill: '#8b8b93', fontSize: 12 }}
						/>

						<YAxis
							domain={[0, 4000]}
							ticks={[0, 1000, 2000, 3000, 4000]}
							axisLine={false}
							tickLine={false}
							width={55}
							tick={{ fill: '#8b8b93', fontSize: 12 }}
							tickFormatter={(value) =>
								value === 0 ? '$0' : `$${value / 1000}K`
							}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>

						<ReferenceLine
							x={12}
							stroke="#515159"
							strokeDasharray="4 5"
							label={{
								value: 'TODAY',
								fill: '#a1a1aa',
								fontSize: 10,
								position: 'top',
							}}
						/>

						<Area
							dataKey="actual"
							type="monotone"
							stroke="#00c896"
							fill="url(#actualFill)"
							strokeWidth={3}
							connectNulls={false}
						/>

						<Line
							dataKey="budgetPace"
							type="linear"
							stroke="#a1a1aa"
							strokeWidth={2}
							strokeDasharray="7 7"
							dot={false}
						/>

						<Line
							dataKey="forecast"
							type="linear"
							stroke="#fbbf24"
							strokeWidth={3}
							strokeDasharray="8 7"
							dot={false}
							connectNulls
						/>
					</ComposedChart>
				</ChartContainer>
			</div>

			<ForecastPanel />
		</div>
	)
}




