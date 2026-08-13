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
import { spendingChartConfig } from '@/lib/constants/chart-configs'

import ChartLegendItem from './ChartLegendItem'
import ForecastPanel from './ForecastPanel'


export default function SpendingPaceClient({ spendingPace = {} }) {
	const { spendingPaceData, metrics } = spendingPace

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
			<ForecastPanel
				projectedRemaining={metrics?.projectedRemaining}
				upcomingBills={metrics?.upcomingBills}
			/>
		</div>
	)
}
