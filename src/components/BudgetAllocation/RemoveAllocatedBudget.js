'use client'

import { removeCategoryAllocation } from '@/app/actions/budget-allocations'

import styles from './BudgetAllocation.module.scss'

export default function RemoveAllocatedBudget({ category }) {
	async function handleRemove() {
		const result = await removeCategoryAllocation(category.id)

		if (!result.success) {
			console.error(result.error)
		}
	}

	return (
		<button
			type="button"
			className={styles.removeButton}
			onClick={handleRemove}>
			Remove
		</button>
	)
}
