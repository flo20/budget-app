import { AllocatedBudgets } from "./AllocatedBudgets";

export default function BudgetCategory({ selectedMonth }) {
	return (
		<section>
			<AllocatedBudgets selectedMonth={selectedMonth} />
		</section>
	)
}

