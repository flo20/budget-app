'use client'

import { useState } from 'react'

import { localDate } from '@/lib/utils/date'
import { createTransactions } from '@/app/actions/transactions'
import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
} from '@/lib/constants/transaction-categories'

import {
	Form,
	FormHeader,
	FormField,
	FormInput,
	FormSelect,
	FormTextarea,
	FormActions,
	FormButton,
} from '@/components/Form'

import styles from './NewEntryForm.module.scss'

export default function NewEntryForm({ closeModal }) {
	const [entryType, setEntryType] = useState('expense')
	const [transactionDate, setTransactionDate] = useState(() => localDate())
	const [expenseType, setExpenseType] = useState('variable')
    const [notes, setNotes] = useState('')

	const isExpense = entryType === 'expense'

	const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

	return (
		<Form action={createTransactions}>
			<FormHeader
				title="New Ledger Entry"
				description="Record an income or expense"
				onClose={closeModal}
			/>

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

			<FormField
				label={isExpense ? 'Merchant' : 'Income Source'}
				htmlFor="source">
				<FormInput
					id="source"
					name="source"
					type="text"
					placeholder={isExpense ? 'e.g. Whole Foods' : 'e.g. Salary'}
					required
				/>
			</FormField>

			<FormField
				label="Amount"
				htmlFor="amount">
				<FormInput
					id="amount"
					name="amount"
					type="number"
					min="0.01"
					step="0.01"
					placeholder="0.00"
					required
				/>
			</FormField>

			<FormField
				label="Category"
				htmlFor="category">
				<FormSelect
					id="category"
					name="category"
					defaultValue=""
					required>
					<option
						value=""
						disabled>
						Select...
					</option>

					{categories.map((category) => (
						<option
							key={category}
							value={category}>
							{category}
						</option>
					))}
				</FormSelect>
			</FormField>

			{isExpense && (
				<FormField label="Expense kind">
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
							aria-pressed={expenseType === 'fixed'}
							onClick={() => setExpenseType('fixed')}>
							Fixed
						</button>

						<button
							type="button"
							className={`${styles.expenseTypeButton} ${
								expenseType === 'variable' ? styles.activeExpenseType : ''
							}`}
							aria-pressed={expenseType === 'variable'}
							onClick={() => setExpenseType('variable')}>
							Variable
						</button>
					</div>
				</FormField>
			)}

			<FormField
				label="Transaction date"
				htmlFor="transactionDate">
				<FormInput
					id="transactionDate"
					name="transactionDate"
					type="date"
					value={transactionDate}
					onChange={(event) => setTransactionDate(event.target.value)}
					required
				/>
			</FormField>

			<FormField
				label="Note"
				htmlFor="notes"
				optional>
				<FormTextarea
					id="notes"
					name="notes"
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
					maxLength={280}
					placeholder="Add a comment or reminder..."
				/>

				<span className={styles.characterCount}>{notes.length}/280</span>
			</FormField>

			<FormActions>
				<FormButton
					type="button"
					variant="secondary"
					onClick={closeModal}>
					Cancel
				</FormButton>

				<FormButton type="submit">
					{isExpense ? 'Record Expense' : 'Record Income'}
				</FormButton>
			</FormActions>
		</Form>
	)
}
