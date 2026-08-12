import { getChartData } from '@/lib/queries/chart'
import { getSpendingPaceData } from '@/lib/chart/getSpendingPaceData'

import SpendingPaceClient from './SpendingPaceClient'

export default async function OutLook({ budgetMonth }) {
	const { transactions, categoryBudgets, pinnedPayments } =
		await getChartData(budgetMonth)
	const spendingPace = getSpendingPaceData({
		transactions,
		categoryBudgets,
		pinnedPayments,
		budgetMonth,
	})

	return <SpendingPaceClient spendingPace={spendingPace} />
}
