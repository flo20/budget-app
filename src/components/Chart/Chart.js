'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatMonth, formatCompactCurrency } from '@/lib/utils/format'
import { changeMonth } from '@/lib/utils/month'
import Metrics from './Metrics'
import CashFlowClient from './CashFlowClient'
import MonthlyTrendClient from './MonthlyTrendClient'
import SpendingPaceClient from './SpendingPaceClient'

export default function Chart({
	budgetMonth,
	spendingPace,
	cashFlow,
	monthlyTrend,
}) {
	const { spendingPaceData, paceMetrics } = spendingPace
	const { cashFlowData, cashFlowMetrics } = cashFlow
	const { trendData, trendMetrics } = monthlyTrend

	const previousMonth = changeMonth(budgetMonth, -1)

	const spendingMetrics = [
		{
			label: 'SPENT',
			value: formatCompactCurrency(paceMetrics.totalSpent),
		},
		{
			label: 'BUDGET',
			value: formatCompactCurrency(paceMetrics.monthlyBudget),
		},
		{
			label: 'PROJECTED',
			value: formatCompactCurrency(paceMetrics.projectedSpending),
			variant: 'positive',
		},
		{
			label: 'SAFE / DAY',
			value: formatCompactCurrency(paceMetrics.safePerDay),
		},
	]

	const cashMetrics = [
		{
			label: 'INCOME',
			value: formatCompactCurrency(cashFlowMetrics.currentIncome),
		},
		{
			label: 'EXPENSE',
			value: formatCompactCurrency(cashFlowMetrics.currentExpense),
		},
		{
			label: 'NET CASH FLOW',
			value: formatCompactCurrency(cashFlowMetrics.netCashFlow),
			variant: 'positive',
		},
		{
			label: 'PREV MONTH NET',
			value: formatCompactCurrency(cashFlowMetrics.previousMonthNet),
		},
	]

	const monthlyTrendMetrics = [
		{
			label: 'THIS MONTH',
			value: formatCompactCurrency(trendMetrics.currentMonthSpending),
		},
		{
			label: formatMonth(previousMonth),
			value: formatCompactCurrency(paceMetrics.monthlyBudget),
			variant: 'positive',
		},
		{
			label: '3-MONTH AVG',
			value: formatCompactCurrency(trendMetrics.threeMonthAverage),
		},
		{
			label: 'NET CASH FLOW',
			value: formatCompactCurrency(trendMetrics.netCashFlow),
		},
	]

	return (
		<section className="overflow-hidden rounded-2xl border border-[#29292e] bg-[#09090b]">
			<Tabs defaultValue="spending">
				<div className="flex flex-col border-b border-[#29292e] px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
					<div className="font-mono text-sm tracking-[0.18em] text-zinc-400 md:text-base">
						OUTLOOK
						<span className="mx-3">·</span>
						<span className="text-zinc-100">{formatMonth(budgetMonth)}</span>
					</div>

					<TabsList className="mt-5 h-auto justify-start gap-2 bg-transparent p-0 lg:mt-0">
						<TabsTrigger
							value="spending"
							className="
                rounded-none
                border-b-2
                border-transparent
                bg-transparent
                px-5
                py-3
                font-mono
                text-sm
                tracking-[0.15em]
                text-zinc-400
                shadow-none
                data-[state=active]:border-blue-500
                data-[state=active]:bg-transparent
                data-[state=active]:text-blue-400
                data-[state=active]:shadow-none
            ">
							SPENDING PACE
						</TabsTrigger>

						<TabsTrigger
							value="cashflow"
							className="
                rounded-none
                border-b-2
                border-transparent
                bg-transparent
                px-5
                py-3
                font-mono
                text-sm
                tracking-[0.15em]
                text-zinc-400
                shadow-none
                data-[state=active]:border-blue-500
                data-[state=active]:bg-transparent
                data-[state=active]:text-blue-400
                data-[state=active]:shadow-none
            ">
							CASH FLOW
						</TabsTrigger>

						<TabsTrigger
							value="trend"
							className="
                rounded-none
                border-b-2
                border-transparent
                bg-transparent
                px-5
                py-3
                font-mono
                text-sm
                tracking-[0.15em]
                text-zinc-400
                shadow-none
                data-[state=active]:border-blue-500
                data-[state=active]:bg-transparent
                data-[state=active]:text-blue-400
                data-[state=active]:shadow-none
            ">
							MONTHLY TREND
						</TabsTrigger>
					</TabsList>
				</div>

				{/* TABS CONTENT */}
				<TabsContent
					value="spending"
					className="m-0">
					<Metrics items={spendingMetrics} />
					<SpendingPaceClient
						budgetMonth={budgetMonth}
						spendingPaceData={spendingPaceData}
						paceMetrics={paceMetrics}
					/>
				</TabsContent>

				<TabsContent
					value="cashflow"
					className="m-0">
					<Metrics items={cashMetrics} />
					<CashFlowClient cashFlowData={cashFlowData} />
				</TabsContent>

				<TabsContent
					value="trend"
					className="m-0">
					<Metrics items={monthlyTrendMetrics} />
					<MonthlyTrendClient trendData={trendData} />
				</TabsContent>
			</Tabs>
		</section>
	)
}
