import styles from './LedgerStream.module.scss'

const formatCurrency = (transaction) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(transaction?.amount))

    return transaction?.transaction_type === 'income'
        ? `+${formattedAmount}`
        : `-${formattedAmount}`
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(`${date}T00:00:00`))
}

export default async function LedgerStreamClient({transactions}) {

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
                                <td>{formatCurrency(transaction)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    )
}
