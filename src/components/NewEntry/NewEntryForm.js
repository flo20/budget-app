'use client'

import { useState } from 'react'

import { localDate } from '@/lib/utils/date'
import { createTransactions } from '@/app/actions/transactions'
import { useFormAction } from '../hooks/useFormActions'

import CategorySelect from './CategorySelect'
import CreateCategoryForm from './CreateCategoryForm'

import {
	Form,
	FormHeader,
	FormField,
	FormInput,
	FormTextarea,
	FormActions,
	FormButton,
	FormError,
} from '@/components/Form'

import styles from './NewEntryForm.module.scss'

export default function NewEntryForm({ closeModal, categories = [] }) {
	const [entryType, setEntryType] = useState('expense')
	const [transactionDate, setTransactionDate] = useState(() => localDate())
	const [expenseType, setExpenseType] = useState('variable')
	const [notes, setNotes] = useState('')

	const [category, setCategory] = useState('')
	const [createdCategories, setCreatedCategories] = useState([])
	const [showCategoryForm, setShowCategoryForm] = useState(false)

	const isExpense = entryType === 'expense'

	const availableCategories = Array.from(
		new Map(
			[...categories, ...createdCategories].map((item) => [item.id, item]),
		).values(),
	)

	const handleCreateCategory = () => {
		setShowCategoryForm(true)
	}

	const handleCategoryCreated = (newCategory) => {
		setCreatedCategories((previous) => [...previous, newCategory])

		setCategory(newCategory.name)
		setShowCategoryForm(false)
	}

	const handleEntryTypeChange = (type) => {
		setEntryType(type)
		setCategory('')
		setShowCategoryForm(false)
	}

	const { formAction, isPending, error } = useFormAction(
		createTransactions,
		closeModal,
	)

	return (
        <> 
		<Form action={formAction}>
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
					onClick={() => handleEntryTypeChange('expense')}>
					EXPENSE
				</button>

				<button
					type="button"
					className={`${styles.typeButton} ${
						!isExpense ? styles.activeType : ''
					}`}
					aria-pressed={!isExpense}
					onClick={() => handleEntryTypeChange('income')}>
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
				<CategorySelect
					categories={availableCategories}
					type={entryType}
					value={category}
					onChange={setCategory}
					onCreateCategory={handleCreateCategory}
				/>
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

			<FormError error={error} />
			<FormActions>
				<FormButton
					type="button"
					variant="secondary"
					onClick={closeModal}
					disabled={isPending}>
					Cancel
				</FormButton>

				<FormButton
					type="submit"
					disabled={isPending}>
					{isPending
						? 'Saving...'
						: isExpense
							? 'Record Expense'
							: 'Record Income'}
				</FormButton>
			</FormActions>
		</Form>
        {showCategoryForm && (
			<CreateCategoryForm
				type={entryType}
				onCreated={handleCategoryCreated}
				onCancel={() => setShowCategoryForm(false)}
			/>
		)}
        </>
	)
}
