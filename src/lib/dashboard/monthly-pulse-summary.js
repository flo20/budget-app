function toValidNumber(value) {
	const number = Number(value)

	return Number.isFinite(number) ? number : 0
}

export function buildMonthlyPulseSummary({ transactions }) {
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

	const remaining = transactionTotals.income - transactionTotals.outflow

	return {
		income: transactionTotals.income,
		outflow: transactionTotals.outflow,
		remaining,
	}
}
