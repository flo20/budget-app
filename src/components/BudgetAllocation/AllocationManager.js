'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils/format'
import { getCategoryIcon } from '@/lib/constants/transaction-categories'

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

	const resetAllocationForm = useCallback(() => {
		setSelectedCategory('')
		setbudgetMonthlyLimit('')
	}, [])

	return (
		<div className={styles.allocationManager}>
			<section className={styles.unallocated}>
				<header className={styles.unallocatedHeader}>
					<h3>Unallocated spend</h3>
					<span>{formatCurrency(totalUnallocatedSpend)} total</span>
				</header>
				{unallocatedCategories.length > 0 ? (
					<ul className={styles.unallocatedList}>
						{unallocatedCategories.map((category) => (
							<li
								key={category.category}
								className={styles.unallocatedRow}>
								<div className={styles.unallocatedInfo}>
									<span
										className={styles.unallocatedIcon}
										aria-hidden="true">
										{getCategoryIcon(category.category)}
									</span>

									<span className={styles.unallocatedName}>
										{category.category}
									</span>

									<span className={styles.unallocatedAmount}>
										{formatCurrency(category.spent)}
									</span>
								</div>

								<button
									type="button"
									className={styles.allocateButton}
									onClick={() => handleAllocate(category)}>
									Allocate
								</button>
							</li>
						))}
					</ul>
				) : (
					<p className={styles.noUnallocated}>No unallocated spending</p>
				)}
			</section>

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
					onSuccess={resetAllocationForm}
				/>
			</div>
		</div>
	)
}
