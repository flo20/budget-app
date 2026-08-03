'use client'

import { removeCategoryAllocation } from '@/app/actions/category_budgets'

export default function RemoveAllocatedBudget({ category }) {
	async function handleRemove() {
		const result = await removeCategoryAllocation(category.id)        

		if (!result.success) {
			console.error(result.error)
			return
		}
	}

	return <button onClick={handleRemove}>Remove</button>
}
