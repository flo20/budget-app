'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils/currency'
import { deleteSavedGoal } from '@/app/actions/savings-goals'
import ContributeForm from './ContributeForm'

export default function GoalsSummary({ goals }) {
	const [contributionGoalId, setContributionGoalId] = useState(null)

        async function handleDelete(goal) {
					const result = await deleteSavedGoal(goal.id)

					if (!result.success) {
						console.error(result.error)
						return
					}
				}
	return (
		<>
			{goals.map((goal) => {
				const isContributing = contributionGoalId === goal.id

				return (
					<div key={goal.id}>
						<h5> {goal.name}</h5>
						<h5> {goal.status}</h5>
						<h5> {goal.due_date}</h5>
						<p>
							{formatCurrency(goal.saved_amount)}
							{' / '}
							{formatCurrency(goal.target_amount)}
						</p>
						<h5> {goal.completed_at}</h5>

						{isContributing ? (
							<ContributeForm
								goal={goal}
								closeForm={() => setContributionGoalId(null)}
							/>
						) : (
							<button
								type="button"
								onClick={() => {
									setContributionGoalId(goal.id)
								}}>
								+ Contribute
							</button>
						)}
						<button
							type="button"
							onClick={() => handleDelete(goal)}>
							Delete
						</button>
					</div>
				)
			})}
		</>
	)
}
