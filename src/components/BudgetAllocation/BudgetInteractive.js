'use client'

import { useRef, useState } from 'react'
import { formatCurrency } from '@/lib/utils/currency'
import AllocationForm from './AllocationForm'

export default function BudgetInteractive({
	summary,
	budgetMonth,
	unallocatedCategories,
	totalUnallocatedSpend,
}) {
	const [selectedCategory, setSelectedCategory] = useState('')
	const limitInputRef = useRef(null)

	function handleAllocate(category) {
		setSelectedCategory(category)
		// requestAnimationFrame(() => {
		// 	limitInputRef.current?.focus()
		// 	limitInputRef.current?.scrollIntoView({
		// 		behavior: 'smooth',
		// 		block: 'center',
		// 	})
		// })
	}

	return (
		<>
			<section aria-labelledby="unallocated-title">
				<header>
					<h3 id="unallocated-title">Unallocated spend</h3>
					<span>{formatCurrency(totalUnallocatedSpend)} total</span>
				</header>

				{unallocatedCategories.length === 0 ? (
					<p>All spending categories have an allocation.</p>
				) : (
					<ul>
						{unallocatedCategories.map((category) => (
							<li key={category.category}>
								<span>{category.category}</span>
								<span>{formatCurrency(category.spent)}</span>
								<button
									type="button"
									onClick={() => handleAllocate(category.category)}>
									Allocate
								</button>
							</li>
						))}
					</ul>
				)}
			</section>

			<AllocationForm
				budgetMonth={budgetMonth}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				limitInputRef={limitInputRef}
				summary={summary}
			/>
		</>
	)
}
