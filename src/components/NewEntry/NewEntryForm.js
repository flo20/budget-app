'use client'

import { useState } from 'react'
import { localDate } from '@/lib/utils/date'
import { createTransactions } from '@/app/actions/transactions'
import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
} from '@/lib/constants/transaction-categories'

import { X } from 'lucide-react'

import styles from './NewEntryForm.module.scss'

export default function NewEntryForm({ closeModal }) {
	const [entryType, setEntryType] = useState('expense')
	const [transactionDate, setTransactionDate] = useState(() => localDate())
	const [expenseType, setExpenseType] = useState('variable')
	const isExpense = entryType === 'expense'

	const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

	return (
		<div className={styles.formWrapper}>
			<header className={styles.dialogHeading}>
				<div>
					<h3>New Ledger Entry</h3>
					<p>Record an income or expense</p>
				</div>

				<button
					type="button"
					className={styles.closeButton}
					onClick={closeModal}
					aria-label="Close">
					<X />
				</button>
			</header>

			{/* Expense Form */}
			<form
				action={createTransactions}
				className={styles.form}>
				<input
					type="hidden"
					name="transactionType"
					value={entryType}
				/>
				<div className={styles.typeSelector}>
					<button
						type="button"
						className={`${styles.typeButton} ${
							isExpense ? styles.activeType : ''
						}`}
						aria-pressed={isExpense}
						onClick={() => setEntryType('expense')}>
						EXPENSE
					</button>
					<button
						type="button"
						className={`${styles.typeButton} ${
							!isExpense ? styles.activeType : ''
						}`}
						aria-pressed={!isExpense}
						onClick={() => setEntryType('income')}>
						INCOME
					</button>
				</div>
				<div className={styles.field}>
					<label htmlFor="source">
						{isExpense ? 'Merchant' : 'Income Source'}
					</label>
					<input
						id="source"
						type="text"
						name="source"
						placeholder={isExpense ? 'e.g. Whole Foods' : 'e.g. Salary'}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="amount">Amount</label>

					<input
						id="amount"
						name="amount"
						type="number"
						min="0.01"
						step="0.01"
						required
					/>
				</div>

				<div className={styles.field}>
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
				</div>

				{isExpense && (
					<div className={styles.field}>
						<p className={styles.fieldLabel}>Expense kind</p>
						<input
							type="hidden"
							name="expenseType"
							value={expenseType}
						/>
						<div className={styles.expenseTypeSelector}>
							<button
								type="button"
								className={`${styles.expenseTypeButton} ${
									expenseType === 'fixed' ? styles.activeExpenseType : ''
								}`}
								onClick={() => setExpenseType('fixed')}>
								Fixed
							</button>

							<button
								type="button"
								className={`${styles.expenseTypeButton} ${
									expenseType === 'variable' ? styles.activeExpenseType : ''
								}`}
								onClick={() => setExpenseType('variable')}>
								Variable
							</button>
						</div>
					</div>
				)}

				<div className={styles.field}>
					<label htmlFor="transactionDate">Transaction date</label>
				</div>

				<input
					id="transactionDate"
					name="transactionDate"
					type="date"
					value={transactionDate}
					onChange={(event) => setTransactionDate(event.target.value)}
				/>

				<div className={styles.field}></div>
				<div className={styles.noteHeading}>
					<label htmlFor="notes">Note(optional)</label>
				</div>

				<textarea
					id="notes"
					name="notes"
					maxLength={280}
					placeholder="Add a comment or reminder..."
				/>
				<span className={styles.characterCount}>0/280</span>

				<div className={styles.actions}>
					<button
						type="button"
						onClick={closeModal}>
						Cancel
					</button>
					<button type="submit">
						{isExpense ? 'Record Expense' : 'Record Income'}
					</button>
				</div>
			</form>
		</div>
	)
}
