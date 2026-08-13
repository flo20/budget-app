import { getTransactionsByDateRange } from '@/lib/queries/date-range-transactions'
import { getCashFlowData } from '@/lib/chart/getCashFlowData'

import CashFlowClient from './CashFlowClient'

function getCashFlowDateRange(budgetMonth, monthsToShow = 6) {
	const [year, month] = budgetMonth.split('-').map(Number)

	const start = new Date(year, month - monthsToShow, 1)

	const end = new Date(year, month, 1)

	function formatDate(date) {
		const year = date.getFullYear()

		const month = String(date.getMonth() + 1).padStart(2, '0')

		return `${year}-${month}-01`
	}

	return {
		startDate: formatDate(start),
		endDate: formatDate(end),
	}
}

export default async function CashFlow({ budgetMonth }) {
	const { startDate, endDate } = getCashFlowDateRange(budgetMonth)
	const cashFlowTransactions = await getTransactionsByDateRange(
		startDate,
		endDate,
	)
	const cashFlowData = getCashFlowData({
		cashFlowTransactions,
		endMonth: budgetMonth,
	})
	return (
		<>
			<CashFlowClient cashFlowData={cashFlowData} />
		</>
	)
}
