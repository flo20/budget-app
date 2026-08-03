import { toBudgetMonth } from '@/lib/utils/month'
import { getBudgetAllocations } from '@/lib/queries/category_budgets'
import { BudgetCategory } from './BudgetCategory'
import { buildBudgetSummary } from '@/lib/budget/budget-summary'
import { formatCurrency } from '@/lib/utils/currency'
import { formatMonth } from '@/lib/utils/month'

import BudgetInteractive from './BudgetInteractive'
import styles from './BudgetAllocation.module.scss'
import EditCategoryBudgetLimit from './EditCategoryBudgetLimit'
import RemoveAllocatedBudget from './RemoveAllocatedBudget'

export async function AllocatedBudgetsPanel({ selectedMonth }) {
	const budgetMonth = toBudgetMonth(selectedMonth)
	const { budgets, transactions } = await getBudgetAllocations(budgetMonth)
	const summary = buildBudgetSummary(budgets, transactions)
    
	return (
		<div>
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
						<BudgetCategory
							category={category}
							formatCurrency={formatCurrency}
						/>
						<EditCategoryBudgetLimit category={category} />
                        <RemoveAllocatedBudget category={category}/>
					</div>
				))}
			</div>

			<BudgetInteractive
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
		</div>
	)
}
