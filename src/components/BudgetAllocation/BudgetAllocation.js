import { toBudgetMonth } from '@/lib/utils/month'
import { getBudgetAllocations } from '@/lib/queries/budget-allocations'
import { buildBudgetSummary } from '@/lib/budget/budget-summary'
import { formatCurrency, formatMonth } from '@/lib/utils/format'

import AllocatedCategory  from './AllocatedCategory'
import AllocationManager from './AllocationManager'
import EditCategoryBudgetLimit from './EditCategoryBudgetLimit'
import RemoveAllocatedBudget from './RemoveAllocatedBudget'

import styles from './BudgetAllocation.module.scss'

export default async function BudgetAllocation({ selectedMonth }) {
	const budgetMonth = toBudgetMonth(selectedMonth)
	const { budgets, transactions } = await getBudgetAllocations(budgetMonth)
	const summary = buildBudgetSummary(budgets, transactions)

	return (
		<section
			className={styles.container}
			id="budget">
			<h2>ALLOCATED BUDGETS</h2>
			<header>
				<p id="allocated-budgets-title">
					Allocated budgets · {formatMonth(budgetMonth)}
				</p>

				<div>
					<strong>{formatCurrency(summary.remainingAllocatedBudget)}</strong>

					<span>
						left of {formatCurrency(summary.totalAllocated)} allocated
					</span>
				</div>

				<p>
					Only reflects budgeted categories · unallocated spending is tracked
					separately below
				</p>
			</header>
			<div className={styles.container}>
				{summary.categories.map((category) => (
					<div key={category.id}>
						<AllocatedCategory
							category={category}
							formatCurrency={formatCurrency}
						/>
						<EditCategoryBudgetLimit category={category} />
						<RemoveAllocatedBudget category={category} />
					</div>
				))}
			</div>

			<AllocationManager
				summary={summary}
				budgetMonth={budgetMonth}
				unallocatedCategories={summary.unallocatedCategories}
				totalUnallocatedSpend={summary.totalUnallocatedSpend}
			/>

			<p>
				{formatCurrency(summary.coveredSpend)} spent within category limits,{' '}
				{formatCurrency(summary.totalOverBudget)} over budget, and{' '}
				{formatCurrency(Math.max(summary.remainingAllocatedBudget, 0))}
				remaining.
			</p>
		</section>
	)
}
