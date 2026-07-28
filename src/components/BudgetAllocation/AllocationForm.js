'use client'

import { useRef } from 'react'

import { setBudgetAllocation } from '@/app/actions/category_budgets'
import {
	EXPENSE_CATEGORIES,
	CUSTOM_CATEGORY_OPTION,
} from '@/lib/constants/categories'

import styles from './BudgetAllocation.module.scss'

export default function AllocationForm({ budgetMonth, budgets }) {
	const formRef = useRef()

	// const allocatedCategories = new Set(budgets.map((budget) => budget.category))

	return (
		<form
			action={setBudgetAllocation}
			ref={formRef}
			className={styles.wrapper}>
			<h3>Add allocation</h3>

			<input
				type="hidden"
				name="budgetMonth"
				value={budgetMonth}
			/>

			<label>
				<span>Category</span>

				<select
					name="category"
					required>
					<option
						value=""
						disabled>
						Category
					</option>

					{EXPENSE_CATEGORIES.map((category) => (
						<option
							key={category}
							value={category}>
							{category}
							{/* {allocatedCategories.has(category) ? ' — edit' : ''} */}
						</option>
					))}
					<option value={CUSTOM_CATEGORY_OPTION}>Add a custom category</option>
				</select>
			</label>
			<label>
				<span>Monthly limit</span>

				<input
					name="monthlyLimit"
					type="number"
					min="0.01"
					step="0.01"
					placeholder="Monthly limit"
					required
				/>
			</label>

			<button type="submit">Set</button>
		</form>
	)
}
