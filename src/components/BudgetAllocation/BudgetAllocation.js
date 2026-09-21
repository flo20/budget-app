import { getBudgetAllocations } from '@/lib/queries/budget-allocations'
import { buildBudgetSummary } from '@/lib/budget/budget-summary'
import { formatCurrency, formatMonth } from '@/lib/utils/format'

import AllocatedCategory from './AllocatedCategory'
import AllocationManager from './AllocationManager'
import EditCategoryBudgetLimit from './EditCategoryBudgetLimit'
import RemoveAllocatedBudget from './RemoveAllocatedBudget'

import styles from './BudgetAllocation.module.scss'

export default async function BudgetAllocation({ budgetMonth }) {
	const { budgets, transactions } = await getBudgetAllocations(budgetMonth)
	const summary = buildBudgetSummary(budgets, transactions)

	return (
		<section
			className={styles.container}
			id="plan">
			<header className={styles.summaryHeader}>
				<p
					id="allocated-budgets-title"
					className={styles.eyebrow}>
					ALLOCATED BUDGETS
					<span>·</span>
					{formatMonth(budgetMonth)}
				</p>

				<div className={styles.totalRow}>
					<strong className={styles.remainingTotal}>
						{formatCurrency(summary.remainingAllocatedBudget)}
					</strong>

					<span className={styles.totalContext}>
						left of {formatCurrency(summary.totalAllocated)} allocated
					</span>
				</div>

				<p className={styles.description}>
					Only reflects budgeted categories · unallocated spending is tracked
					separately below
				</p>
			</header>
			<div className={styles.categoryList}>
				{summary.categories.map((category) => (
					<div
						key={category.id}
						className={styles.categoryRow}>
						<AllocatedCategory
							category={category}
							formatCurrency={formatCurrency}
						/>
							<EditCategoryBudgetLimit category={category} />

						<div className={styles.removeAction}>
							<RemoveAllocatedBudget category={category} />
						</div>
					</div>
				))}
			</div>

			<AllocationManager
				summary={summary}
				budgetMonth={budgetMonth}
				unallocatedCategories={summary.unallocatedCategories}
				totalUnallocatedSpend={summary.totalUnallocatedSpend}
			/>
		</section>
	)
}
