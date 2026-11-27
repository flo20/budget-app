import { getBudgetAllocations } from '@/lib/queries/budget-allocations'
import { getCategories } from '@/lib/queries/categories'
import { getAvailableCategories } from '@/lib/utils/categories'
import { buildBudgetSummary } from '@/lib/budget/budget-summary'
import { formatCurrency, formatMonth } from '@/lib/utils/format'
import { normalizeCategory } from '@/lib/utils/category'

import AllocatedCategory from './AllocatedCategory'
import AllocationManager from './AllocationManager'
import EditCategoryBudgetLimit from './EditCategoryBudgetLimit'
import RemoveAllocatedBudget from './RemoveAllocatedBudget'

import styles from './BudgetAllocation.module.scss'

export default async function BudgetAllocation({ budgetMonth }) {
	const [{ budgets, transactions }, categories] = await Promise.all([
		getBudgetAllocations(budgetMonth),
		getCategories('expense'),
	])
	const summary = buildBudgetSummary(budgets, transactions)

	const availableCategories = getAvailableCategories(
		categories,
		summary.categories,
	)

	const categoryIconMap = new Map(
		categories.map((category) => [
			normalizeCategory(category.name),
			category.icon,
		]),
	)

	const allocatedCategories = summary.categories.map((category) => ({
		...category,
		icon: categoryIconMap.get(normalizeCategory(category.category)) ?? 'tag',
	}))

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
				{allocatedCategories.map((category) => (
					<div
						key={category.id}
						className={styles.categoryRow}>
						<AllocatedCategory
							category={category}
							formatCurrency={formatCurrency}
						/>
						<div className={styles.categoryActions}>
							<EditCategoryBudgetLimit category={category} />
							<RemoveAllocatedBudget category={category} />
						</div>
					</div>
				))}
			</div>

			<AllocationManager
				summary={summary}
				budgetMonth={budgetMonth}
				availableCategories={availableCategories}
				unallocatedCategories={summary.unallocatedCategories}
				totalUnallocatedSpend={summary.totalUnallocatedSpend}
			/>
		</section>
	)
}
