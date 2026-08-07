import { toValidNumber } from '../utils/number-parsing'

export function buildMonthlyPulseSummary({ transactions, assets }) {
	const transactionTotals = transactions.reduce(
		(totals, transaction) => {
			const amount = toValidNumber(transaction.amount)

			if (transaction.transaction_type === 'income') {
				totals.income += amount
			}

			if (transaction.transaction_type === 'expense') {
				totals.outflow += amount
			}

			return totals
		},
		{
			income: 0,
			outflow: 0,
		},
	)

	const totalAssets = assets.reduce((total, asset) => {
		return total + toValidNumber(asset.current_value)
	}, 0)

	// const totalLiabilities = liabilities.reduce((total, liability) => {
	// 	return total + toValidNumber(liability.current_balance)
	// }, 0)

	const remaining = transactionTotals.income - transactionTotals.outflow
	// const netWorth = totalAssets - totalLiabilities

	return {
		income: transactionTotals.income,
		outflow: transactionTotals.outflow,
		totalAssets,
		//totalLiabilities,
		//netWorth,
		remaining,
	}
}
