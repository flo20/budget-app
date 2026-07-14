'use client'

import { useState } from 'react'
import { Area, AreaChart } from 'recharts'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'

export const description = 'An interactive area chart'
const chartData = [
	{ date: '2024-06-17', desktop: 475, mobile: 520 },
	{ date: '2024-06-18', desktop: 107, mobile: 170 },
	{ date: '2024-06-28', desktop: 149, mobile: 200 },
]
const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)',
	},
}
export function Chart() {
	const [timeRange, setTimeRange] = useState('90d')
	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-06-30')
		let daysToSubtract = 90
		if (timeRange === '30d') {
			daysToSubtract = 30
		} else if (timeRange === '7d') {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})
	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0  py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>30-Day Velocity</CardTitle>
					<CardDescription>INCOME . EXPENSE</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full">
					<AreaChart data={filteredData}>
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fillMobile)"
							stroke="var(--color-mobile)"
							stackId="a"
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fillDesktop)"
							stroke="var(--color-desktop)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
