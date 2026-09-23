'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatMonth, formatCompactCurrency } from '@/lib/utils/format'
import { changeMonth } from '@/lib/utils/month'

import Metrics from './Metrics'
import CashFlowClient from './CashFlowClient'
import MonthlyTrendClient from './MonthlyTrendClient'
import SpendingPaceClient from './SpendingPaceClient'

import styles from './Chart.module.scss'

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
			variant:
				cashFlowMetrics.netCashFlow > 0
					? 'positive'
					: cashFlowMetrics.netCashFlow < 0
						? 'negative'
						: undefined,
		},
		{
			label: 'PREV MONTH NET',
			value: formatCompactCurrency(cashFlowMetrics.previousMonthNet),
			variant:
				cashFlowMetrics.previousMonthNet > 0
					? 'positive'
					: cashFlowMetrics.previousMonthNet < 0
						? 'negative'
						: undefined,
		},
	]

	const monthlyTrendMetrics = [
		{
			label: 'THIS MONTH',
			value: formatCompactCurrency(trendMetrics.currentMonthSpending),
		},
		{
			label: formatMonth(previousMonth),
			value: formatCompactCurrency(paceMetrics.previousMonthSpending),
			variant: 'positive',
		},
		{
			label: '3-MONTH AVG',
			value: formatCompactCurrency(trendMetrics.threeMonthAverage),
		},
		{
			label: 'NET CASH FLOW',
			value: formatCompactCurrency(trendMetrics.netCashFlow),
			variant:
				trendMetrics.netCashFlow > 0
					? 'positive'
					: trendMetrics.netCashFlow < 0
						? 'negative'
						: undefined,
		},
	]

	return (
		<section
			className={styles.container}
			id="overview">
			<Tabs defaultValue="spending">
				<header className={styles.header}>
					<div className={styles.title}>
						<span>Outlook</span>
						<span>·</span>
						<strong>{formatMonth(budgetMonth)}</strong>
					</div>

					<TabsList
						className={styles.tabsList}
						variant="line">
						<TabsTrigger
							value="spending"
							className={styles.tabTrigger}>
							Spending Pace
						</TabsTrigger>

						<TabsTrigger
							value="cashflow"
							className={styles.tabTrigger}>
							Cash Flow
						</TabsTrigger>

						<TabsTrigger
							value="trend"
							className={styles.tabTrigger}>
							Monthly Trend
						</TabsTrigger>
					</TabsList>
				</header>

				<TabsContent
					value="spending"
					className={styles.tabContent}>
					<Metrics items={spendingMetrics} />

					<SpendingPaceClient
						budgetMonth={budgetMonth}
						spendingPaceData={spendingPaceData}
						paceMetrics={paceMetrics}
					/>
				</TabsContent>

				<TabsContent
					value="cashflow"
					className={styles.tabContent}>
					<Metrics items={cashMetrics} />

					<CashFlowClient
						cashFlowData={cashFlowData}
						cashFlowMetrics={cashFlowMetrics}
					/>
				</TabsContent>

				<TabsContent
					value="trend"
					className={styles.tabContent}>
					<Metrics items={monthlyTrendMetrics} />

					<MonthlyTrendClient
						trendMetrics={trendMetrics}
						budgetMonth={budgetMonth}
						trendData={trendData}
					/>
				</TabsContent>
			</Tabs>
		</section>
	)
}
