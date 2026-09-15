'use client'

import { setBudgetAllocation } from '@/app/actions/budget-allocations'
import { getAvailableCategories } from '@/lib/constants/transaction-categories'

import FormInput from '../form/FormInput'
import FormSelect from '../form/FormSelect'
import FormButton from '../form/FormButtons'

import { Plus } from 'lucide-react'

import styles from './BudgetAllocation.module.scss'



export default function AllocationForm({
	summary,
	budgetMonth,
	selectedCategory,
	setSelectedCategory,
	setbudgetMonthlyLimit,
	budgetMonthlyLimit,
	limitInputRef,
}) {
	// const [customCategory, setCustomCategory] = useState('')
	// const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION

	const availableCategories = getAvailableCategories(
		summary.categories,
		summary.unallocatedCategories,
	)

	return (
		<form
			action={setBudgetAllocation}
			className={styles.allocationForm}>
			<input
				type="hidden"
				name="allocationBudgetMonth"
				value={budgetMonth}
			/>

			<div className={styles.allocationField}>
				<label
					htmlFor="allocation-category"
					className={styles.srOnly}>
					Category
				</label>

				<select
					id="allocation-category"
					name="category"
					value={selectedCategory ?? ''}
					onChange={(event) => {
						setSelectedCategory(event.target.value)
						// setCustomCategory('')
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
					{/* <option value={CUSTOM_CATEGORY_OPTION}>Add a custom category</option> */}
				</select>
			</div>

			{/* 
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
			)} */}

			<div className={styles.allocationField}>
				<label
					htmlFor="monthly-limit"
					className={styles.srOnly}>
					Monthly limit
				</label>
				<input
					id="monthly-limit"
					ref={limitInputRef}
					value={budgetMonthlyLimit ?? ''}
					onChange={(event) => setbudgetMonthlyLimit(event.target.value)}
					name="monthlyLimit"
					type="number"
					min="0.01"
					step="0.01"
					placeholder="Monthly limit"
					required
				/>
			</div>

			<button
				type="submit"
				className={styles.setButton}>
				<Plus />
				<span>Set</span>
			</button>
		</form>
	)
}
