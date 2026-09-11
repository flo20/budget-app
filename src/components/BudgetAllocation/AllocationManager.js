'use client'

import { useRef, useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils/format'

import AllocationForm from './AllocationForm'

import styles from './BudgetAllocation.module.scss'

export default function AllocationManager({
	summary,
	budgetMonth,
	unallocatedCategories,
	totalUnallocatedSpend,
}) {
	const [selectedCategory, setSelectedCategory] = useState('')
	const [budgetMonthlyLimit, setbudgetMonthlyLimit] = useState('')
	const limitInputRef = useRef(null)

	useEffect(() => {
		if (!selectedCategory) {
			return
		}

		limitInputRef.current?.focus()

		limitInputRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}, [selectedCategory])

	function handleAllocate(category) {
		setSelectedCategory(category.category)
		setbudgetMonthlyLimit(category.spent)
	}

	return (
		<div className={styles.allocationManager}>
			{unallocatedCategories.length === 0 && (
				<section className={styles.unallocated}>
					<header>
						<h3>Unallocated spend</h3>

						<span>{formatCurrency(totalUnallocatedSpend)} total</span>
					</header>

					<ul>
						{unallocatedCategories.map((category) => (
							<li key={category.category}>
								<span>{category.category}</span>
								<span>{formatCurrency(category.spent)}</span>

								<button
									type="button"
									onClick={() => handleAllocate(category)}>
									Allocate
								</button>
							</li>
						))}
					</ul>
				</section>
			)}
			<div className={styles.addAllocation}>
				<p>Add allocation</p>
				<AllocationForm
					budgetMonth={budgetMonth}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					budgetMonthlyLimit={budgetMonthlyLimit}
					setbudgetMonthlyLimit={setbudgetMonthlyLimit}
					limitInputRef={limitInputRef}
					summary={summary}
				/>
			</div>
		</div>
	)
}
