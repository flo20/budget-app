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
	const { transactions, categoryBudgets, pinnedPayments } =
		await getChartData(budgetMonth)
	const spendingPace = getSpendingPaceData({
		transactions,
		categoryBudgets,
		pinnedPayments,
		budgetMonth,
	})

	const { startDate, endDate } = getCashFlowDateRange(budgetMonth)
	const cashFlowTransactions = await getTransactionsByDateRange(
		startDate,
		endDate,
	)
	const cashFlow = getCashFlowData({
		transactions: cashFlowTransactions,
		endMonth: budgetMonth,
	})

	const monthlyTrend = getMonthlyTrendData(cashFlow.cashFlowData)

	return (
		<Chart
			spendingPace={spendingPace}
			cashFlow={cashFlow}
			monthlyTrend={monthlyTrend}
		/>
	)
}
