'use client'

import { useActionState, useEffect } from 'react'

import { setBudgetAllocation } from '@/app/actions/budget-allocations'
import { getAvailableCategories } from '@/lib/constants/transaction-categories'

import { FormInput, FormSelect, FormButton } from '@/components/Form'

import { Plus } from 'lucide-react'

import styles from './BudgetAllocation.module.scss'

const initialState = {
	success: false,
	error: null,
}

export default function AllocationForm({
	summary,
	budgetMonth,
	selectedCategory,
	setSelectedCategory,
	setbudgetMonthlyLimit,
	onSuccess,
	budgetMonthlyLimit,
	limitInputRef,
}) {
	const [state, formAction, isPending] = useActionState(
		setBudgetAllocation,
		initialState,
	)

	const availableCategories = getAvailableCategories(
		summary.categories,
		summary.unallocatedCategories,
	)

	useEffect(() => {
		if (state.success) {
			onSuccess()
		}
	}, [state.success, onSuccess])

	return (
		<form
			action={formAction}
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

				<FormSelect
					id="allocation-category"
					name="category"
					value={selectedCategory ?? ''}
					onChange={(event) => setSelectedCategory(event.target.value)}
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
				</FormSelect>
			</div>
			<div className={styles.allocationField}>
				<label
					htmlFor="monthly-limit"
					className={styles.srOnly}>
					Monthly limit
				</label>
				<FormInput
					id="monthly-limit"
					ref={limitInputRef}
					name="monthlyLimit"
					type="number"
					value={budgetMonthlyLimit ?? ''}
					onChange={(event) => setbudgetMonthlyLimit(event.target.value)}
					min="0.01"
					step="0.01"
					placeholder="Monthly limit"
					required
				/>
			</div>

			<FormButton
				type="submit"
				className={styles.setButton}>
				<Plus />
				<span>Set</span>
			</FormButton>
		</form>
	)
}
