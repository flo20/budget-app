'use client'

import {
    ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { formatChartCurrency } from '@/lib/utils/format'
import { cashFlowConfig } from '@/lib/constants/chart-configs'

import ChartLegendItem from './ChartLegendItem'

export default function CashFlowClient({ cashFlowData = {} }) {
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
		</div>
	)
}
