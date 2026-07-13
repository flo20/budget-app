'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

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

		export default function NewEntryForm({ closeModal }) {
			const [entryType, setEntryType] = useState('expense')
			const isExpense = entryType === 'expense'

			const category = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

			const {
				handleSubmit,
				register,
				//formState: { errors },
			} = useForm()

			const onSubmit = (data) => {
				console.log(data)
			}

			// console.log(watch("example"))
			return (
				<>
					<h3>New Ledger Entry</h3>
					<button
						type="button"
						onClick={closeModal}>
						X
					</button>
					<p>Record an income or expense</p>
					{/* Expense Form */}
					<button onClick={() => setEntryType('expense')}>EXPENSE</button>
					<button onClick={() => setEntryType('income')}>INCOME</button>(
					<form onSubmit={handleSubmit(onSubmit)}>
						<p>Record an income or expense. </p>
						<label>
							{isExpense ? 'Merchant' : 'Income Source'}
							<input {...register('source')} />
						</label>

						<label>
							Amount
							<input
								type="number"
								step="0.01"
								{...register('amount', {
									valueAsNumber: true,
								})}
							/>
						</label>
						<label>
							Category
							<select {...register('category')}>
								<option value="">Select...</option>
								{category.map((cat) => (
									<option
										value={cat}
										key={cat}>
										{cat}
									</option>
								))}
							</select>
						</label>

						{isExpense && (
							<div>
								<p>Expense kind</p>
								<label>
									<input
										type="radio"
										value="fixed"
										{...register('expenseKind')}
									/>
									Fixed
								</label>
								<label>
									<input
										type="radio"
										value="variable"
										{...register('expenseKind')}
									/>
									Variable
								</label>
							</div>
						)}

						<div>
							<h5>Note</h5>
							<textarea
								placeholder="Write it out"
								{...register('note')}></textarea>
						</div>
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
