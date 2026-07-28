
import { toBudgetMonth } from "@/lib/utils/month"
import AllocationForm from "./AllocationForm"


export default function AllocatedBudgets({selectedMonth}) {    
    const budgetMonth = toBudgetMonth(selectedMonth)

	return (
		<div>
			<h2>ALLOCATED BUDGETS</h2>
			<AllocationForm budgetMonth={budgetMonth} />
		</div>
	)
}
