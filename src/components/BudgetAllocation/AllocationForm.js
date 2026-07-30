'use client'

import { useState } from 'react'
import { setBudgetAllocation } from '@/app/actions/category_budgets'
import { EXPENSE_CATEGORIES, CUSTOM_CATEGORY_OPTION } from '@/lib/constants/categories'

import styles from './BudgetAllocation.module.scss'

function getAvailableCategories(allocatedCategories, unallocatedCategories) {
	const allocatedNames = new Set(
		allocatedCategories.map((item) => item.category),
	)

	const transactionCategoryNames = unallocatedCategories.map(
		(item) => item.category,
	)

	return [
		...new Set([...EXPENSE_CATEGORIES, ...transactionCategoryNames]),
	].filter((category) => !allocatedNames.has(category))
}

export default function AllocationForm({
	summary,
	budgetMonth,
	selectedCategory,
	setSelectedCategory,
	limitInputRef,
}) {
	const [customCategory, setCustomCategory] = useState('')
	const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION

	const availableCategories = getAvailableCategories(
		summary.categories,
		summary.unallocatedCategories,
	)

	return (
		<form
			action={setBudgetAllocation}
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
					value={selectedCategory}
					onChange={(event) => {
						setSelectedCategory(event.target.value)
						setCustomCategory('')
					}}
					required>
					<option
						value=""
						disabled>
						Category
					</option>

					{availableCategories.map((category) => (
						<option
							key={category}
							value={category}>
							{category}
						</option>
					))}
					<option value={CUSTOM_CATEGORY_OPTION}>Add a custom category</option>
				</select>
			</label>

			{isCustomCategory && (
				<label>
					<span>Custom category name</span>

					<input
						name="customCategory"
						type="text"
						value={customCategory}
						onChange={(event) => setCustomCategory(event.target.value)}
						placeholder="e.g. Pet Care"
						maxLength="50"
						required
					/>
				</label>
			)}

			<label>
				<span>Monthly limit</span>

				<input
					ref={limitInputRef}
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
