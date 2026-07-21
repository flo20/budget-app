'use client'

import { useState } from 'react'
import { createTransactions } from '@/app/actions/transactions'

import styles from './NewEntryForm.module.scss'

const EXPENSE_CATEGORIES = [
	'Housing',
	'Groceries',
	'Utilities',
	'Transport',
	'Recreation',
	'Healthcare',
	'Service',
	'Other',
]
const INCOME_CATEGORIES = ['Salary', 'Bonus', 'Freelance']

function getLocalDate() {
	const now = new Date()

	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}

export default function NewEntryForm({ closeModal }) {
	const [entryType, setEntryType] = useState('expense')
	const [transactionDate, setTransactionDate] = useState(() => getLocalDate())

	const isExpense = entryType === 'expense'

	const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

	return (
		<>
			<header className={styles.dialogHeading}>
				<h3>New Ledger Entry</h3>
				<button
					type="button"
					onClick={closeModal}>
					X
				</button>
			</header>
				<p>Record an income or expense</p>

			{/* Expense Form */}
			<form
				action={createTransactions}
				className={styles.form}>
				<div className={styles.typeSelector}>
					<input
						type="hidden"
						name="transactionType"
						value={entryType}
					/>
					<button
						type="button"
						className={isExpense ? styles.activeType : styles.typeButton}
						aria-pressed={isExpense}
						onClick={() => setEntryType('expense')}>
						EXPENSE
					</button>
					<button
						className={!isExpense ? styles.activeType : styles.typeButton}
						type="button"
						aria-pressed={!isExpense}
						onClick={() => setEntryType('income')}>
						INCOME
					</button>
				</div>

				<p>Record an income or expense. </p>

				<div className={styles.field}>
					<label htmlFor="source">
						{isExpense ? 'Merchant' : 'Income Source'}
					</label>
				</div>

				<input
					id="source"
					type="text"
					name="source"
					required
				/>

				<label htmlFor="amount">Amount</label>

				<input
					id="amount"
					name="amount"
					type="number"
					min="0.01"
					step="0.01"
					required
				/>

				<label htmlFor="category">Category</label>

				<select
					id="category"
					name="category"
					required
					defaultValue="">
					<option
						value=""
						disabled>
						Select...
					</option>
					{categories.map((category) => (
						<option
							value={category}
							key={category}>
							{category}
						</option>
					))}
				</select>

				{isExpense && (
					<div>
						<p>Expense kind</p>
						<label>
							<input
								type="radio"
								name="expenseType"
								value="fixed"
								required
							/>
							Fixed
						</label>

						<label>
							<input
								type="radio"
								name="expenseType"
								value="variable"
								required
							/>
							Variable
						</label>
					</div>
				)}

				<label htmlFor="transactionDate">Transaction date</label>

				<input
					id="transactionDate"
					name="transactionDate"
					type="date"
					value={transactionDate}
					onChange={(event) => setTransactionDate(event.target.value)}
				/>

				<label htmlFor="notes">
					<h5>Note</h5>
					<textarea
						id="notes"
						name="notes"
						placeholder="Write it out"></textarea>
				</label>
				<button
					type="button"
					onClick={closeModal}>
					Cancel
				</button>
				<button type="submit">
					{isExpense ? 'Record Expense' : 'Record Income'}
				</button>
			</form>
		</>
	)
}
