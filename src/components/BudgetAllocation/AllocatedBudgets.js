
import { toBudgetMonth } from "@/lib/utils/month"
import { getBudgetAllocations } from "@/lib/queries/category_budgets"
import AllocationForm from "./AllocationForm"


export async function AllocatedBudgets({selectedMonth}) {    
    const budgetMonth = toBudgetMonth(selectedMonth)
    const {budgets, transactions} = await getBudgetAllocations(budgetMonth)


	return (
		<div>
			<h2>ALLOCATED BUDGETS</h2>
			<AllocationForm
				budgetMonth={budgetMonth}
				budgets={budgets}
			/>
		</div>
	)
}
