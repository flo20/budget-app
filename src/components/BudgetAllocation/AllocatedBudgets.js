"use client"


import AllocationForm from "./AllocationForm"

export default function AllocatedBudgets({selecetedMonth}) {
    const budgetMonth = `${selecetedMonth}-01`
	return (
		<div>
			<h2>ALLOCATED BUDGETS</h2>
			<AllocationForm budgetMonth={budgetMonth} />
		</div>
	)
}
