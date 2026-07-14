

const transactions = [
	{
		id: 1,
		date: '2026-01-03',
		description: 'Monthly Salary',
		category: 'Income',
		type: 'income',
		amount: 8500,
	},
	{
		id: 2,
		date: '2026-01-05',
		description: 'Apartment Rent',
		category: 'Housing',
		type: 'expense',
		amount: 2400,
	},
	{
		id: 3,
		date: '2026-01-08',
		description: 'Carrefour Groceries',
		category: 'Groceries',
		type: 'expense',
		amount: 385.75,
	},
	{
		id: 4,
		date: '2026-01-12',
		description: 'DEWA Bill',
		category: 'Utilities',
		type: 'expense',
		amount: 420.5,
	},
	{
		id: 5,
		date: '2026-01-15',
		description: 'Freelance Project',
		category: 'Income',
		type: 'income',
		amount: 1800,
	},
	{
		id: 6,
		date: '2026-01-18',
		description: 'Fuel',
		category: 'Transport',
		type: 'expense',
		amount: 210,
	},
	{
		id: 7,
		date: '2026-01-22',
		description: 'Restaurant',
		category: 'Dining',
		type: 'expense',
		amount: 275.25,
	},
	{
		id: 8,
		date: '2026-01-25',
		description: 'Internet Bill',
		category: 'Utilities',
		type: 'expense',
		amount: 349,
	},
]

export default function LedgerStream() {
	const formatAmount = (transaction) => {
		const formattedAmount = transaction.amount.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		})

		return transaction.type === 'income'
			? `+${formattedAmount}`
			: `-${formattedAmount}`
	}
	return (
		<section id="ledger">
			

			<section aria-labelledby="asset-inventory-title">
				<table>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.date}</td>
								<td>{transaction.description}</td>
								<td>{transaction.category}</td>
								<td>{formatAmount(transaction)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</section>
	)
}
