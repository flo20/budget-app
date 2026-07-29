import { toBudgetMonth } from '@/lib/utils/month'
import { getBudgetAllocations } from '@/lib/queries/category_budgets'
import AllocationForm from './AllocationForm'
import { BudgetCategory } from './BudgetCategory'
import { buildBudgetSummary } from '@/lib/budget/budget-summary'
import { formatCurrency } from '@/lib/utils/currency'
import { formatMonth } from '@/lib/utils/month'

export async function AllocatedBudgets({ selectedMonth }) {
	const budgetMonth = toBudgetMonth(selectedMonth)
	const { budgets, transactions } = await getBudgetAllocations(budgetMonth)
	const summary = buildBudgetSummary(budgets, transactions)

	function getStatusMessage(category) {
		if (category.status === 'over') {
			return `${formatCurrency(Math.abs(category.remaining))} over budget`
		}

		if (category.status === 'full') {
			return 'Fully used, nothing left'
		}

		if (category.status === 'warning') {
			return `${formatCurrency(category.remaining)} left, close to limit`
		}

		return `${formatCurrency(category.remaining)} left`
	}

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
			<div>
				{summary.categories.map((category) => (
					<BudgetCategory
						key={category.id}
						category={category}
						formatCurrency={formatCurrency}
						getStatusMessage={getStatusMessage}
					/>
				))}
			</div>

			<section aria-labelledby="unallocated-title">
				<header>
					<h3 id="unallocated-title">Unallocated spend</h3>
					<span>{formatCurrency(summary.totalUnallocatedSpend)} total</span>
				</header>

				{summary.unallocatedCategories.length === 0 ? (
					<p>All spending categories have an allocation.</p>
				) : (
					<ul>
						{summary.unallocatedCategories.map((category) => (
							<li key={category.category}>
								<span>{category.category}</span>
								<span>{formatCurrency(category.spent)}</span>

								<a href={`#add-allocation-${category.category}`}>Allocate</a>
							</li>
						))}
					</ul>
				)}
			</section>
			<AllocationForm
				budgetMonth={budgetMonth}
				budgets={budgets}
			/>
		</div>
	)
}
