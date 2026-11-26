'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils/format'
import { getCategoryIcon } from '@/lib/utils/category-icons'
import { normalizeCategory } from '@/lib/utils/category'

import AllocationForm from './AllocationForm'

import styles from './BudgetAllocation.module.scss'

export default function AllocationManager({
	budgetMonth,
	unallocatedCategories,
	totalUnallocatedSpend,
	availableCategories = [],
}) {
	const [selectedCategory, setSelectedCategory] = useState('')
	const [budgetMonthlyLimit, setBudgetMonthlyLimit] = useState('')
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

	function findCategory(categoryName) {
		return availableCategories.find(
			(category) =>
				normalizeCategory(category.name) === normalizeCategory(categoryName),
		)
	}

	function handleAllocate(category) {
		const matchedCategory = findCategory(category.category)

		if (!matchedCategory) {
			return
		}

		setSelectedCategory(matchedCategory.name)
		setBudgetMonthlyLimit(String(category.spent))
	}

	const resetAllocationForm = useCallback(() => {
		setSelectedCategory('')
		setBudgetMonthlyLimit('')
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
						{unallocatedCategories.map((category) => {
							const matchedCategory = findCategory(category.category)

							return (
								<li
									key={category.category}
									className={styles.unallocatedRow}>
									<div className={styles.unallocatedInfo}>
										<span
											className={styles.unallocatedIcon}
											aria-hidden="true">
											{getCategoryIcon(matchedCategory?.icon ?? 'tag')}
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
										onClick={() => handleAllocate(category)}
										disabled={!matchedCategory}>
										Allocate
									</button>
								</li>
							)
						})}
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
					setBudgetMonthlyLimit={setBudgetMonthlyLimit}
					limitInputRef={limitInputRef}
					availableCategories={availableCategories}
					onSuccess={resetAllocationForm}
				/>
			</div>
		</div>
	)
}
