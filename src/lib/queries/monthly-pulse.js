import 'server-only'

import { requireUser } from '../auth/require-user'

function getNextMonthStart(budgetMonth) {
	const [year, month] = budgetMonth
		.split('-')
		.map(Number)

	/*
	 * JavaScript months are zero-based.
	 * Passing the current one-based month produces
	 * the first day of the next month.
	 */
	return new Date(Date.UTC(year, month, 1))
		.toISOString()
		.slice(0, 10)
}

export async function getMonthlyPulse(budgetMonth){
const {supabase, user} = await requireUser()

if (!/^\d{4}-(0[1-9]|1[0-2])-01$/.test(budgetMonth)) {
	throw new Error('A valid month is required.')
}

const nextMonth = getNextMonthStart(budgetMonth)

const [transactionsResult] = await Promise.all([
	supabase
		.from('transactions')
		.select(
			`
				id,
				amount,
				transaction_type,
				transaction_date
			`,
		)
		.eq('user_id', user.id)
		.gte('transaction_date', budgetMonth)
		.lt('transaction_date', nextMonth),
])

if (transactionsResult.error) {
	console.error(
		'Unable to retrieve pulse transactions:',
		transactionsResult.error,
	)

	throw new Error('Unable to retrieve monthly transactions.')
}

return {
    transactions: transactionsResult.data ?? []
}

}