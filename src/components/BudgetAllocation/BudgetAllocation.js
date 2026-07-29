import { AllocatedBudgets } from "./AllocatedBudgets";

export default function BudgetAllocation({ selectedMonth }) {
	return (
		<section>
			<AllocatedBudgets selectedMonth={selectedMonth} />
		</section>
	)
}

