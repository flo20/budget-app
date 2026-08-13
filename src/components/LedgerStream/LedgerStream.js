import { getTransactions } from '@/lib/queries/transactions'
import { formatDate, formatTransactionCurrency } from '@/lib/utils/format'

import styles from './LedgerStream.module.scss'

export default async function LedgerStream() {
	const transactions = await getTransactions()    

	return (
		<section
			aria-labelledby="asset-inventory-title"
			id="ledger"
			className={styles.container}>
			<header>
				<h2 id="asset-inventory-title">Ledger Stream</h2>
				<h2>Recency sort</h2>
			</header>
			{transactions.length === 0 ? (
				<section>
					<h2>Ledger Stream</h2>
					<p>No transactions recorded yet.</p>
				</section>
			) : (
				<table>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.source}</td>
								<td>{formatDate(transaction.transaction_date)}</td>
								<td>{transaction.transaction_type}</td>
								<td>{transaction.category}</td>
								<td>{transaction.notes}</td>
								<td>{formatTransactionCurrency(transaction)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	)
}
