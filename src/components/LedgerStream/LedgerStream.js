import { getTransactions } from '@/lib/queries/transactions'

import LedgerStreamClient from './LedgerStreamClient'


export default async function LedgerStream() {
	const transactions = await getTransactions()

	return <LedgerStreamClient transactions={transactions} />
}
