import { getTransactionsByDateRange } from '@/lib/queries/date-range-transactions'
import {
	getCashFlowData,
	getCashFlowDateRange,
} from '@/lib/chart/getCashFlowData'

import CashFlowClient from './CashFlowClient'

export default async function CashFlow({ budgetMonth }) {
	const { startDate, endDate } = getCashFlowDateRange(budgetMonth)
	const cashFlowTransactions = await getTransactionsByDateRange(
		startDate,
		endDate,
	)
	const cashFlow = getCashFlowData({
		transactions:cashFlowTransactions,
		endMonth: budgetMonth,
	})
	return (
		<>
			<CashFlowClient cashFlow={cashFlow} />
		</>
	)
}
