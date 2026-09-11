import { getTransactions } from '@/lib/queries/transactions'
import { formatDate, formatTransactionCurrency } from '@/lib/utils/format'

import LedgerFooter from './LedgerFooter'

import { FileText } from 'lucide-react'

import styles from './LedgerStream.module.scss'

function getInitials(source) {
	return source
		.split(' ')
		.map((word) => word[0])
		.join('')
		.slice(0, 3)
		.toUpperCase()
}

export default async function LedgerStream({ budgetMonth }) {
	const transactions = await getTransactions()

	return (
		<section
			aria-labelledby="asset-inventory-title"
			id="activity"
			className={styles.container}>
			<header className={styles.header}>
				<h2 id="asset-inventory-title">Ledger Stream</h2>
				<span>Recency sort</span>
			</header>
			{transactions.length === 0 ? (
				<div className={styles.emptyState}>
					<h2>Ledger Stream</h2>
					<p>No transactions recorded yet.</p>
				</div>
			) : (
				<>
					<div className={styles.transactionList}>
						{transactions.map((transaction) => (
							<article
								key={transaction.id}
								className={styles.transaction}>
								<div className={styles.initialBox}>
									{getInitials(transaction.source)}
								</div>

								<div className={styles.transactionMain}>
									<div className={styles.transactionTop}>
										<div className={styles.transactionInfo}>
											<h3>{transaction.source}</h3>

											<div className={styles.meta}>
												<span>{formatDate(transaction.transaction_date)}</span>

												<span>·</span>

												<span>{transaction.category}</span>

												{transaction.expense_type && (
													<span className={styles.typeBadge}>
														{transaction.expense_type}
													</span>
												)}
											</div>
										</div>

										<strong
											className={`${styles.amount} ${
												transaction.transaction_type === 'income'
													? styles.income
													: styles.expense
											}`}>
											{formatTransactionCurrency(transaction)}
										</strong>
									</div>

									{transaction.notes && (
										<div className={styles.notes}>
											<FileText aria-hidden="true" />
											<span>{transaction.notes}</span>
										</div>
									)}
								</div>
							</article>
						))}
					</div>

					<LedgerFooter
						budgetMonth={budgetMonth}
						showingCount={transactions.length}
						totalCount={transactions.length}
					/>
				</>
			)}
		</section>
	)
}
