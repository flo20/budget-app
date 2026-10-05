import { getChartData } from '@/lib/queries/chart'
import { getSpendingPaceData } from '@/lib/chart/getSpendingPaceData'
import { getTransactionsByDateRange } from '@/lib/queries/date-range-transactions'
import { getMonthlyTrendData } from '@/lib/chart/getMonthlyTrendData'
import {
	getCashFlowData,
	getCashFlowDateRange,
} from '@/lib/chart/getCashFlowData'

import Chart from './Chart'

export default async function OutLook({ budgetMonth }) {
    const { startDate, endDate } = getCashFlowDateRange(budgetMonth)
	const [
		{ transactions, categoryBudgets, pinnedPayments },
		cashFlowTransactions,
	] = await Promise.all([
		getChartData(budgetMonth),
		getTransactionsByDateRange(startDate, endDate),
	])

	const spendingPace = getSpendingPaceData({
		transactions,
		categoryBudgets,
		pinnedPayments,
		budgetMonth,
	})

	const cashFlow = getCashFlowData({
		transactions: cashFlowTransactions,
		endMonth: budgetMonth,
	})

	const monthlyTrend = getMonthlyTrendData(cashFlow.cashFlowData)

	return (
		<Chart
			budgetMonth={budgetMonth}
			spendingPace={spendingPace}
			cashFlow={cashFlow}
			monthlyTrend={monthlyTrend}
		/>
	)
}
